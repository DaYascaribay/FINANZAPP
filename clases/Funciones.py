
from flask import session, redirect, url_for
import pandas as pd
from sqlalchemy import create_engine
import openai

def conectarDB():
    # Variables de conexión
    server = 'David_0728\SQLEXPRESS'
    bd = 'FINANZAPP'
    user = 'sa2'
    password = '12345678'
    try:
        conexion_str = f"mssql+pyodbc://{user}:{password}@{server}/{bd}?driver=ODBC+Driver+17+for+SQL+Server"
        engine = create_engine(conexion_str)
    except Exception as e:
        engine = None

    return engine

def validar_sesion(Sesion_ID):
    if Sesion_ID == " ": # Si no hay una sesión redirige al login
        session['msj_enviado_login'] = "Por favor inicie sesión"
        print("No hay sesion")
        return redirect(url_for('login'))

def obtener_gasto_ingreso_total(Usuario_ID,Tipo):
    conexion_BD=conectarDB()
    query=f"SELECT SUM(Valor) FROM Registro WHERE Usuario_ID='{Usuario_ID}' AND Tipo_Registro='Ingreso'"
    suma_ingresos = pd.read_sql(query, conexion_BD)
    query=f"SELECT SUM(Valor) FROM Registro WHERE Usuario_ID='{Usuario_ID}' AND Tipo_Registro='Gasto'"
    suma_gastos = pd.read_sql(query, conexion_BD)
    try:
        suma_ingresos = round(suma_ingresos.iloc[0, 0],2)  # Accede al elemento en la posición (0, 0) y redondea
    except:
        suma_ingresos=0
    try:
        suma_gastos = round(suma_gastos.iloc[0, 0],2)
    except:
        suma_gastos = 0
    
    dinero_restante_total = (round(suma_ingresos-suma_gastos,2))
    if dinero_restante_total<0:
        dinero_restante_total = 0
    if Tipo=='Gasto':
        return str(suma_gastos)
    else:
        return str(dinero_restante_total)

def obtener_gasto_ingreso_mes(Usuario_ID,Tipo,Mes,Año):
    print("Este es el tipo",Tipo)
    conexion_BD=conectarDB()
    query=f"SELECT SUM(Valor) FROM Registro WHERE Usuario_ID='{Usuario_ID}' AND Tipo_Registro='Ingreso' AND MONTH(Fecha)={Mes} AND YEAR(Fecha)={Año}"
    suma_ingresos = pd.read_sql(query, conexion_BD)
    query=f"SELECT SUM(Valor) FROM Registro WHERE Usuario_ID='{Usuario_ID}' AND Tipo_Registro='Gasto' AND MONTH(Fecha)={Mes} AND YEAR(Fecha)={Año}"
    suma_gastos = pd.read_sql(query, conexion_BD)
    try:
        suma_ingresos = round(suma_ingresos.iloc[0, 0],2)  # Accede al elemento en la posición (0, 0) y redondea
    except:
        suma_ingresos=0
    try:
        suma_gastos = round(suma_gastos.iloc[0, 0],2)
    except:
        suma_gastos = 0

    dinero_restante_total = (round(suma_ingresos-suma_gastos,2))
    if dinero_restante_total<0:
        dinero_restante_total = 0

    if Tipo=='Gasto':
        return str(suma_gastos)
    elif Tipo=='Ingreso':
        return (dinero_restante_total)
    elif Tipo=='Dinero_Utilizado':
        return str(round(suma_ingresos+suma_gastos,2))

def obtener_cant_gasto_ingreso_total(Usuario_ID,Tipo):
    conexion_BD=conectarDB()
    query=f"SELECT COUNT(*) FROM Registro WHERE Usuario_ID='{Usuario_ID}' AND Tipo_Registro='{Tipo}'"
    df_contador = pd.read_sql(query, conexion_BD)
    try:
        contador = df_contador.iloc[0, 0] # Accede al elemento en la posición (0, 0) y redondea
    except:
        contador = 0
    return str(contador)

def obtener_cant_gasto_ingreso_mes(Usuario_ID,Tipo,Mes,Año):
    conexion_BD=conectarDB()
    query=f"SELECT COUNT(*) FROM Registro WHERE Usuario_ID='{Usuario_ID}' AND Tipo_Registro='{Tipo}' AND MONTH(Fecha)={Mes} AND YEAR(Fecha)={Año}"
    df_contador = pd.read_sql(query, conexion_BD)
    try:
        contador = df_contador.iloc[0, 0] # Accede al elemento en la posición (0, 0) y redondea
    except:
        contador = 0
    return str(contador)

def obtener_gasto_fuerte(Usuario_ID,Mes,Año):
    conexion_BD=conectarDB()
    query = f"SELECT R.Nombre, T.Nombre as Tipo_gasto, COUNT(R.Valor) Cantidad, SUM(R.Valor) Valor_total, AVG(R.Valor) Promedio, ROUND((SUM(R.Valor) / (SELECT SUM(R.Valor) FROM Registro R WHERE Usuario_ID='{Usuario_ID}' AND MONTH(Fecha)={Mes} AND YEAR(Fecha)={Año})) * 100, 2) as Porcentaje FROM Registro R JOIN Tipo_Gasto T ON T.ID_Tipo_Gasto=R.Tipo_Gasto WHERE R.Usuario_ID='{Usuario_ID}' AND MONTH(R.Fecha)={Mes} AND YEAR(R.Fecha)={Año} GROUP BY R.Nombre, T.Nombre ORDER BY Valor_total DESC"
    df_gastos_fuertes = pd.read_sql(query, conexion_BD)

    if not df_gastos_fuertes.empty: # Validacion si no tiene registros
        gasto_fuerte = df_gastos_fuertes.iloc[0].to_dict()
    else:
        gasto_fuerte = {
            'Nombre': 'N/A',
            'Tipo_gasto': 'N/A',
            'Cantidad': 0,
            'Valor_total': 0,
            'Promedio': 0.0,
            'Porcentaje': 0
        }
    return gasto_fuerte

def obtener_registros(Usuario_ID,Tipo,Mes,Año):
    conexion_BD=conectarDB()
    query=""
    if Tipo=='General':
        query = f"SELECT R.Registro_ID, R.Nombre, R.Valor, R.Fecha, R.Tipo_Registro, T.Nombre Tipo_Gasto FROM Registro R, Tipo_Gasto T WHERE R.Tipo_Gasto=T.ID_Tipo_Gasto AND Usuario_ID='{Usuario_ID}' order by Fecha"
    elif Tipo=='Mensual':
        query = f"SELECT R.Registro_ID, R.Nombre, R.Valor, R.Fecha, R.Tipo_Registro, T.Nombre Tipo_Gasto FROM Registro R, Tipo_Gasto T WHERE R.Tipo_Gasto=T.ID_Tipo_Gasto AND Usuario_ID='{Usuario_ID}' AND MONTH(Fecha)={Mes} AND YEAR(Fecha)={Año} order by Fecha"
    
    df_registros = pd.read_sql(query, conexion_BD)
    return df_registros

def obtener_clasificacion_registros(Usuario_ID,Tipo,Mes,Año):
    conexion_BD=conectarDB()
    # Obtener las clasificaciones de registros con valor
    if Tipo=='Mensual':
        query = f"SELECT T.Nombre, sum(R.Valor) Valor FROM Registro R, Tipo_Gasto T WHERE Usuario_ID='{Usuario_ID}' AND MONTH(Fecha)={Mes} AND YEAR(Fecha)={Año} AND T.ID_Tipo_Gasto=R.Tipo_Gasto GROUP BY T.Nombre ORDER BY Valor DESC"
    elif Tipo=='General':
        query = f"SELECT T.Nombre, sum(R.Valor) Valor  FROM Registro R, Tipo_Gasto T WHERE Usuario_ID='{Usuario_ID}' AND T.ID_Tipo_Gasto=R.Tipo_Gasto GROUP BY T.Nombre ORDER BY Valor DESC"
    df_dist_gastos = pd.read_sql(query, conexion_BD)
    return df_dist_gastos

def df_a_texto(df):
        textos = []
        for _, fila in df.iterrows():
            texto = (f"{fila['Nombre']} ({fila['Tipo_Gasto']}): valor de {fila['Valor']} "
                        f"registrado el {fila['Fecha']}.")
            textos.append(texto)
        return " ".join(textos)

def obtener_recomendacion_IA(Usuario_ID, Mes, Año):
    # Lectura de registros por mes del usuario
    conexion_BD=conectarDB()
    query = f"SELECT R.Nombre, R.Valor, T.Nombre Tipo_Gasto, R.Fecha FROM Registro R, Tipo_Gasto T WHERE R.Tipo_Gasto=T.ID_Tipo_Gasto AND R.Usuario_ID={Usuario_ID} AND MONTH(R.Fecha)={Mes} AND YEAR(R.Fecha)={Año}"
    df_registros=pd.read_sql(query, conexion_BD)

    role = (
        "Eres un experto en gestión económica para estudiantes universitarios y los microgastos. "
        "Se te va a proporcionar registros de microgastos e ingresos de un mes. "
        "Debes retornar una conclusión con una recomendación basada en los registros proporcionados. "
        "El texto que retornes debe ser una cadena de texto, donde los párrafos se separen con \\n."
    )

    texto_gastos = df_a_texto(df_registros) #Transformación a texto los registros
    full_prompt = f"Registros:\n{texto_gastos}"
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": role},
            {"role": "user", "content": full_prompt}
        ],
        temperature=0.55,
        max_tokens=500
    )
    result = response['choices'][0]['message']['content']
    
    print(full_prompt)
    return result
