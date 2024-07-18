from flask import Flask, request, render_template, redirect, url_for, session

# Lectura de BD
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Float, Date, Boolean

# Openai
import openai

openai.api_key = ''

app = Flask(__name__, template_folder="templates")
app.secret_key = '12345678' # Necesario para redirigir templates con valores

Base = declarative_base()

class Usuario(Base):
    __tablename__ = 'Usuario'
    Usuario_ID = Column(String, primary_key=True)
    Nombre = Column(String)
    Apellido = Column(String)
    Contrasena = Column(String)
    Email = Column(String)
    Premiun = Column(Boolean)

class Registro(Base):
    __tablename__ = 'Registro'
    Usuario_ID = Column(String)
    Registro_ID = Column(String, primary_key=True)
    Nombre = Column(String)
    Valor = Column(Float)
    Fecha = Column(Date)
    Tipo_Registro = Column(String)
    Tipo_Gasto = Column(String)

# Funciones para obtencion de datos
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
        return str(dinero_restante_total)

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

@app.route('/PaginaPrincipal')
@app.route('/')
def aplicacion():
    return render_template("PaginaPrincipal.html")

# LOGEARSE
@app.route('/login')
def login():
    session['usuario_id'] = " " # Elimina la sesión
    msj_recibido_login = session.pop('msj_enviado_login', " ")  # Obtener el mensaje de error de la sesión
    return render_template("IniciarSesion.html", msj_login=msj_recibido_login)


# OBSERVAR REGISTROS

@app.route('/app/observar_gastos', methods=['GET','POST'])
def inicio_exitoso():
    if request.method=='POST':
        # Datos del formulario
        usuario = request.form['email']
        contrasena = request.form['lock_key']
        conexion_BD = conectarDB() # Conexión a la BD

        session['msj_enviado_login'] = "Por favor inicie sesión"
        if conexion_BD:
            query = "SELECT * FROM Usuario"
            df_usuarios = pd.read_sql(query, conexion_BD)
            for i,user in df_usuarios.iterrows():
                if usuario==f"{user['Email']}" and contrasena==f"{user['Contrasena']}":
                    #queryId="SELECT Usuario_ID FROM Usuario where Email='"+f"{user['Email']}"+"'"
                    session['usuario_id'] = f"{user['Usuario_ID']}"  # Guardar el ID del usuario en la sesión
                    
                    # Cálculo de variables 
                    suma_gastos_val = obtener_gasto_ingreso_total(session.get('usuario_id'),'Gasto')
                    dinero_restante = obtener_gasto_ingreso_total(session.get('usuario_id'),'Ingreso')
                    cant_gastos_val = obtener_cant_gasto_ingreso_total(session.get('usuario_id'),'Gasto')
                    cant_ingresos_val = obtener_cant_gasto_ingreso_total(session.get('usuario_id'),'Ingreso')
                    
                    query = "select Count(*) Cant, Tipo_Registro, MONTH(Registro.Fecha) Mes, YEAR(fecha) Año FROM Registro where Usuario_ID='" + session.get('usuario_id') + "' GROUP BY MONTH(Fecha), YEAR(fecha), Tipo_Registro ORDER BY YEAR(fecha) DESC, MONTH(fecha) DESC" 
                    df_Gastos_Mensuales = pd.read_sql(query, conexion_BD)
    
                    meses_espanol = {
                                    1: 'Enero', 2: 'Febrero', 3: 'Marzo', 4: 'Abril',
                                    5: 'Mayo', 6: 'Junio', 7: 'Julio', 8: 'Agosto',
                                    9: 'Septiembre', 10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre'
                                }
                    for i, reg in df_Gastos_Mensuales.iterrows():
                                    df_Gastos_Mensuales.at[i, 'Mes'] = meses_espanol[reg['Mes']]
                    meses_val = {}
                    for i, reg in df_Gastos_Mensuales.iterrows():
                        clave = (reg['Mes'], reg['Año'])
                        if clave not in meses_val:
                            meses_val[clave] = {'Cant_Gastos': 0, 'Cant_Ingresos': 0}
                        if reg['Tipo_Registro'] == 'Gasto':
                            meses_val[clave]['Cant_Gastos'] += reg['Cant']
                        elif reg['Tipo_Registro'] == 'Ingreso':
                            meses_val[clave]['Cant_Ingresos'] += reg['Cant']

                    lista_meses = [{'Mes': mes, 'Año': año, 'Cant_Gastos': valores['Cant_Gastos'], 'Cant_Ingresos': valores['Cant_Ingresos']}
                                for (mes, año), valores in meses_val.items()]

                    return render_template("ObservarGastos.html",get_dinero_restante=dinero_restante, 
                                        get_dinero_utilizado=suma_gastos_val,
                                        get_cant_gastos=cant_gastos_val,
                                        get_cant_ingresos=cant_ingresos_val,
                                        get_meses=lista_meses)
            session['msj_enviado_login'] = "Correo electrónico o contraseña incorrectos"
            return redirect(url_for('login'))
    else:
        if session['usuario_id'] == " ": #Verifica que haya una sesión activa
            session['msj_enviado_login'] = "Por favor inicie sesión"
            return redirect(url_for('login'))
        
        conexion_BD = conectarDB() # Conexión a la BD
        
        suma_gastos_val = obtener_gasto_ingreso_total(session.get('usuario_id'),'Gasto')
        dinero_restante = obtener_gasto_ingreso_total(session.get('usuario_id'),'Ingreso')
        cant_gastos_val = obtener_cant_gasto_ingreso_total(session.get('usuario_id'),'Gasto')
        cant_ingresos_val = obtener_cant_gasto_ingreso_total(session.get('usuario_id'),'Ingreso')
        # Cálculo de dinero utilizadoS
        
        query = "select Count(*) Cant, Tipo_Registro, MONTH(Registro.Fecha) Mes, YEAR(fecha) Año FROM Registro where Usuario_ID='" + session.get('usuario_id') + "' GROUP BY MONTH(Fecha), YEAR(fecha), Tipo_Registro ORDER BY YEAR(fecha) DESC, MONTH(fecha) DESC" 
        df_Gastos_Mensuales = pd.read_sql(query, conexion_BD)
        
        meses_espanol = {
            1: 'Enero', 2: 'Febrero', 3: 'Marzo', 4: 'Abril',
            5: 'Mayo', 6: 'Junio', 7: 'Julio', 8: 'Agosto',
            9: 'Septiembre', 10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre'
        }
        for i, reg in df_Gastos_Mensuales.iterrows():
                        df_Gastos_Mensuales.at[i, 'Mes'] = meses_espanol[reg['Mes']]
        meses_val = {}
        for i, reg in df_Gastos_Mensuales.iterrows():
            clave = (reg['Mes'], reg['Año'])
            if clave not in meses_val:
                meses_val[clave] = {'Cant_Gastos': 0, 'Cant_Ingresos': 0}
            if reg['Tipo_Registro'] == 'Gasto':
                meses_val[clave]['Cant_Gastos'] += reg['Cant']
            elif reg['Tipo_Registro'] == 'Ingreso':
                meses_val[clave]['Cant_Ingresos'] += reg['Cant']

        lista_meses = [{'Mes': mes, 'Año': año, 'Cant_Gastos': valores['Cant_Gastos'], 'Cant_Ingresos': valores['Cant_Ingresos']}
                        for (mes, año), valores in meses_val.items()]

        msj_recibido_observar_gastos = session.pop('msj_error', " ")  # Obtener el mensaje de error de la sesión

        return render_template("ObservarGastos.html",get_dinero_restante=dinero_restante, 
                            get_dinero_utilizado=suma_gastos_val,
                            get_cant_gastos=cant_gastos_val,
                            get_cant_ingresos=cant_ingresos_val,
                            get_meses=lista_meses,
                            get_error=msj_recibido_observar_gastos)

@app.route('/app/observar_gastos_mes')
def observar_gastos_mes():
    validar_sesion(session.get('usuario_id'))
    
    meses_espanol = {
        'Enero': 1, 'Febrero': 2, 'Marzo': 3, 'Abril': 4,
        'Mayo': 5, 'Junio': 6, 'Julio': 7, 'Agosto': 8,
        'Septiembre': 9, 'Octubre': 10, 'Noviembre': 11, 'Diciembre': 12
    }
    
    mes = request.args.get('mes')
    mes_numero = meses_espanol.get(mes)
    año = request.args.get('año')
    
    # Obtención de datos del usuario
    suma_gastos_val = obtener_gasto_ingreso_mes(session.get('usuario_id'),'Gasto',str(mes_numero),str(año))
    dinero_restante = obtener_gasto_ingreso_mes(session.get('usuario_id'),'Ingreso',str(mes_numero),str(año))
    cant_gastos_val = obtener_cant_gasto_ingreso_mes(session.get('usuario_id'),'Gasto',str(mes_numero),str(año))
    cant_ingresos_val = obtener_cant_gasto_ingreso_mes(session.get('usuario_id'),'Ingreso',str(mes_numero),str(año))
    df_registros_mes = obtener_registros(session.get('usuario_id'),'Mensual',str(mes_numero),str(año))
    df_dist_gastos = obtener_clasificacion_registros(session.get('usuario_id'),'Mensual',str(mes_numero),str(año))

    return render_template("ResumenMensual.html", registros=df_registros_mes.to_dict(orient='records'), mes=mes, año=año,
                           get_dinero_restante=dinero_restante,
                           get_dinero_utilizado=suma_gastos_val,
                           get_cant_gastos=cant_gastos_val,
                           get_cant_ingresos=cant_ingresos_val,
                           get_dist_gastos=df_dist_gastos.to_dict(orient='records'))

@app.route('/app/observar_gastos_general')
def observar_gastos_general():
    validar_sesion(session.get('usuario_id'))
    
    mes = request.args.get('mes')
    año = request.args.get('año')

    # Obtención de datos del usuario
    suma_gastos_val = obtener_gasto_ingreso_total(session.get('usuario_id'),'Gasto')
    dinero_restante = obtener_gasto_ingreso_total(session.get('usuario_id'),'Ingreso')
    cant_gastos_val = obtener_cant_gasto_ingreso_total(session.get('usuario_id'),'Gasto')
    cant_ingresos_val = obtener_cant_gasto_ingreso_total(session.get('usuario_id'),'Ingreso')
    df_registros_mes = obtener_registros(session.get('usuario_id'),'General',str(0),str(0))
    df_dist_gastos = obtener_clasificacion_registros(session.get('usuario_id'),'General',"","")

    if df_registros_mes.empty:
        session['msj_error'] = "Para acceder al debe ingresar registros"
        return redirect(url_for('inicio_exitoso'))
    
    return render_template("ResumenGeneral.html", registros=df_registros_mes.to_dict(orient='records'), mes=mes, año=año,
                           get_dinero_restante=dinero_restante,
                           get_dinero_utilizado=suma_gastos_val,
                           get_cant_gastos=cant_gastos_val,
                           get_cant_ingresos=cant_ingresos_val,
                           get_dist_gastos=df_dist_gastos.to_dict(orient='records'))



# CREAR CUENTA
@app.route('/registrar_cuenta')
def registro():
    msj_recibido_registro = session.pop('msj_enviado_registro', " ")  # Obtener el mensaje de error de la sesión
    return render_template("CrearCuenta.html", msj_registro=msj_recibido_registro)

@app.route('/registro_correcto', methods=['POST'])
def registro_correcto():
    # Datos del formulario
    nombre = request.form['nombre']
    apellido = request.form['apellido']
    email = request.form['email_usuario']
    contrasena = request.form['password_one']
    
    # Verificar correo duplicado
    conexion_BD = conectarDB() # Conexión a la BD
    query = "SELECT * FROM Usuario"
    df_usuarios = pd.read_sql(query, conexion_BD)

    for i,user in df_usuarios.iterrows():
        if email==f"{user['Email']}": # Se valida que no existan dos correos iguales
            session['msj_enviado_registro'] = "El correo electrónico ya utilizado"
            return redirect(url_for('registro'))

    # Calcular cantidad de usuarios
    query = "SELECT count(*) FROM Usuario"
    cant_Usuarios = pd.read_sql(query, conexion_BD)
    num_usuario = cant_Usuarios.iloc[0, 0]  # Accede al elemento en la posición (0, 0)
    num_usuario_increment = num_usuario + 1  # Suma 1 al valor obtenido

    Base = declarative_base() # Definir la estructura de la tabla
    Base.metadata.create_all(conexion_BD) # Crear las tablas en la base de datos

    Session = sessionmaker(bind=conexion_BD)# Crear una sesión
    session_DB = Session()

    nuevo_usuario = Usuario(
        Usuario_ID = str(num_usuario_increment),
        Nombre = nombre,
        Apellido = apellido,
        Contrasena = contrasena,
        Email = email,
        Premiun = False
    )
    try:
        session_DB.add(nuevo_usuario)
        session_DB.commit()
        session['msj_enviado_login'] = "Cuenta creada de manera exitosa"
        return redirect(url_for('login'))
    except:
        session['msj_enviado_registro'] = "No se pudo crear el usuario"
        return redirect(url_for('registro'))

@app.route('/olvcontrasena')
def olvidado_contrena():
    return render_template("OlvidasteContrasena.html")


# REGISTRAR GASTOS
registros_temporales = []  # Lista para almacenar temporalmente los registros

@app.route('/app/crear_registro')
def crear_registro():
    validar_sesion(session.get('usuario_id'))
    
    # Cargar los tipos de gastos 
    query = "SELECT * FROM Tipo_Gasto"
    conexion_BD = conectarDB()
    df_opciones = pd.read_sql(query, conexion_BD)

    opciones_val = [(row['ID_Tipo_Gasto'], row['Nombre']) for index, row in df_opciones.iterrows()][1:] # Se toma del segundo registro en adelante (el primero es ingreso)

    return render_template("RegistrarGastos.html", get_opciones=opciones_val, get_registros_temporales=registros_temporales)

@app.route('/app/agregar_registro', methods=['POST'])
def agregar_registro():
    validar_sesion(session.get('usuario_id'))

    # Cargar los tipos de gastos 
    query = "SELECT * FROM Tipo_Gasto"
    conexion_BD = conectarDB()
    df_opciones = pd.read_sql(query, conexion_BD)
    opciones_val = [(row['ID_Tipo_Gasto'], row['Nombre']) for index, row in df_opciones.iterrows()][1:] # Se toma del segundo registro en adelante (el primero es ingreso)

    # Obtener datos del formulario
    nombre = request.form['nombre']
    valor = request.form['valor']
    fecha = request.form['fecha']
    tipo_registro = request.form['group51']

    usuario_id = session.get('usuario_id') # Obtener usuario de la sesión

    try: # Validar si elije un tipo de gasto o un ingreso
        tipo_gasto = request.form['dropdown']
    except : # Ingreso
        tipo_gasto = "0"

    # Contar registros por usuario
    query = f"SELECT count(*) FROM Registro where Usuario_ID = {usuario_id}"
    cant_Registros = pd.read_sql(query, conexion_BD)
    num_registro = cant_Registros.iloc[0, 0]  # Accede al elemento en la posición (0, 0)
    num_registro_increment = num_registro + len(registros_temporales) + 1  # Suma 1 al valor obtenido
    registro_id = f"{usuario_id}.{num_registro_increment}" # Se concatenan el id de usuario y el id de registro

    # Añadir el registro a la lista temporal
    nuevo_registro = {
        'Usuario_ID': usuario_id,
        'Registro_ID': registro_id,
        'Nombre': nombre,
        'Valor': valor,
        'Fecha': fecha,
        'Tipo_Registro': tipo_registro,
        'Tipo_Gasto': tipo_gasto
    }
    registros_temporales.append(nuevo_registro)

    return render_template("RegistrarGastos.html", get_opciones=opciones_val, get_registros_temporales=registros_temporales)

@app.route('/app/guardar_registros', methods=['POST'])
def guardar_registros():
    validar_sesion(session.get('usuario_id'))

    # Conectar a la base de datos
    conexion_BD = conectarDB()
    Session = sessionmaker(bind=conexion_BD)
    session_DB = Session()

    try:
        # Guardar todos los registros en la base de datos
        for registro in registros_temporales:
            nuevo_registro = Registro(
                Usuario_ID=registro['Usuario_ID'],
                Registro_ID=registro['Registro_ID'],
                Nombre=registro['Nombre'],
                Valor=registro['Valor'],
                Fecha=registro['Fecha'],
                Tipo_Registro=registro['Tipo_Registro'],
                Tipo_Gasto=registro['Tipo_Gasto']
            )
            session_DB.add(nuevo_registro)

        session_DB.commit()
    except Exception as e:
        print(f"Error al guardar registros en la base de datos: {e}")
        session_DB.rollback()

    finally:
        registros_temporales.clear() # Limpiar la lista de registros temporales después de guardar en la base de datos

    return redirect(url_for('crear_registro'))

@app.route('/app/eliminar_registros')
def eliminar_registros():
    validar_sesion(session.get('usuario_id'))
    registros_temporales.clear()

    return redirect(url_for('crear_registro'))


# RECOMENDACIONES

@app.route('/app/recomendaciones', methods=['GET', 'POST'])
def recomendaciones():
    validar_sesion(session.get('usuario_id'))
    recomendacion_val = "Aquí se generará su recomendación..." # Mensaje que retorna en la recomendación

    #Obtener los meses por separado
    conexion_BD = conectarDB()
    query = "SELECT MONTH(Fecha) Mes, YEAR(Fecha) Año FROM Registro WHERE Usuario_ID='"+session.get('usuario_id')+"'  GROUP BY YEAR(Fecha), MONTH(Fecha) ORDER BY Año DESC, Mes DESC"
    df_meses = pd.read_sql(query, conexion_BD)
    
    if df_meses.empty:
        session['msj_error'] = "Para acceder a la recomendación debe ingresar registros"
        return redirect(url_for('inicio_exitoso'))

    meses_espanol = { # Datos para transformar el mes de número a palabra
        1: 'Enero', 2: 'Febrero', 3: 'Marzo', 4: 'Abril',
        5: 'Mayo', 6: 'Junio', 7: 'Julio', 8: 'Agosto',
        9: 'Septiembre', 10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre'
    }

    datos = [] # Crear un vector con columnas Mes(palabra), Mes(numero), Año para mostrar en select button
    for index, fila in df_meses.iterrows(): 
        mes_numero = fila['Mes']
        mes_nombre = meses_espanol.get(mes_numero, 'Desconocido')
        año = fila['Año']
        datos.append({
            'mes_num': mes_numero,
            'mes_palabra': mes_nombre,
            'año_num': año
        })
    meses_val = pd.DataFrame(datos)
    
    if request.method == 'POST': # Cambiar recomendación en base al mes ingresado
        fecha = request.form['dropdown']
        mes, año = fecha.split('-')  #Se separa el string de mes-año

        df_dist_gastos = obtener_clasificacion_registros(session.get('usuario_id'),'Mensual',mes,año)
        dinero_utilizado_val =  obtener_gasto_ingreso_mes(session.get('usuario_id'),'Ingreso',mes,año)
        gasto_val =  obtener_gasto_ingreso_mes(session.get('usuario_id'),'Gasto',mes,año)
        cant_ingresos_val = obtener_cant_gasto_ingreso_mes(session.get('usuario_id'),'Ingreso',mes,año)
        cant_gastos_val = obtener_cant_gasto_ingreso_mes(session.get('usuario_id'),'Gasto',mes,año)
        mes_palabra = meses_espanol[int(mes)] # Datos del gasto más representativo
        gasto_fuerte = obtener_gasto_fuerte(session.get('usuario_id'),mes,año)
        return render_template("Recomendaciones.html", get_meses=meses_val.to_dict('records'), 
                                                        get_mes=mes_palabra,get_año=año,
                                                        get_dist_gastos=df_dist_gastos.to_dict('records'),
                                                        get_dinero_utilizado=dinero_utilizado_val,
                                                        get_gasto_val=gasto_val,
                                                        get_cant_ingresos=cant_ingresos_val,
                                                        get_cant_gastos=cant_gastos_val,
                                                        get_gasto_fuerte=gasto_fuerte,
                                                        get_recomendacion=recomendacion_val)

    # Obtener las clasificaciones de registros con valor
    mes_default = df_meses.iloc[0].to_dict()
    mes=mes_default['Mes']
    año=mes_default['Año']
    
    df_dist_gastos = obtener_clasificacion_registros(session.get('usuario_id'),'Mensual',mes,año)
    dinero_utilizado_val =  obtener_gasto_ingreso_mes(session.get('usuario_id'),'Ingreso',mes,año)
    gasto_val =  obtener_gasto_ingreso_mes(session.get('usuario_id'),'Gasto',mes,año)
    cant_ingresos_val = obtener_cant_gasto_ingreso_mes(session.get('usuario_id'),'Ingreso',mes,año)
    cant_gastos_val = obtener_cant_gasto_ingreso_mes(session.get('usuario_id'),'Gasto',mes,año)
    gasto_fuerte = obtener_gasto_fuerte(session.get('usuario_id'),mes,año) # Datos del gasto más representativo
    mes_palabra = meses_espanol[int(mes)]

    print(df_dist_gastos)
    return render_template("Recomendaciones.html", get_meses=meses_val.to_dict('records'), 
                                                    get_dist_gastos=df_dist_gastos.to_dict('records'),
                                                    get_mes=mes_palabra,get_año=año,
                                                    get_dinero_utilizado=dinero_utilizado_val,
                                                    get_gasto_val=gasto_val,
                                                    get_cant_ingresos=cant_ingresos_val,
                                                    get_cant_gastos=cant_gastos_val,
                                                    get_gasto_fuerte=gasto_fuerte,
                                                    get_recomendacion=recomendacion_val)

@app.route('/app/obtener_recomendacion', methods=['POST'])
def obtener_recomendacion():
    validar_sesion(session.get('usuario_id'))
    
    meses_espanol = { # Datos para cambiar mes de palabras a números
        'Enero': 1, 'Febrero': 2, 'Marzo': 3, 'Abril': 4,
        'Mayo': 5, 'Junio': 6, 'Julio': 7, 'Agosto': 8,
        'Septiembre': 9, 'Octubre': 10, 'Noviembre': 11, 'Diciembre': 12
    }

    mes = request.args.get('mes') # Obtiene el mes del método post
    mes_numero = meses_espanol.get(mes)
    año = request.args.get('año')
    
    #Obtener los meses por separado
    conexion_BD = conectarDB()
    query = "SELECT MONTH(Fecha) Mes, YEAR(Fecha) Año FROM Registro WHERE Usuario_ID='"+session.get('usuario_id')+"'  GROUP BY YEAR(Fecha), MONTH(Fecha) ORDER BY Año DESC, Mes DESC"
    df_meses = pd.read_sql(query, conexion_BD)

    meses_espanol = { # Datos para cambiar mes de números a palabras
        1: 'Enero', 2: 'Febrero', 3: 'Marzo', 4: 'Abril',
        5: 'Mayo', 6: 'Junio', 7: 'Julio', 8: 'Agosto',
        9: 'Septiembre', 10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre'
    }

    datos = []  # Crear un vector con columnas Mes(palabra), Mes(numero), Año para mostrar en select button
    for index, fila in df_meses.iterrows():
        mes_num = fila['Mes']
        mes_nombre = meses_espanol.get(mes_num, 'Desconocido')
        año = fila['Año']
        datos.append({
            'mes_num': mes_num,
            'mes_palabra': mes_nombre,
            'año_num': año
        })
    meses_val = pd.DataFrame(datos)

    # Obtener las clasificaciones de registros con valor
    query = f"SELECT sum(R.Valor) Valor, T.Nombre FROM Registro R, Tipo_Gasto T WHERE Usuario_ID='{session.get('usuario_id')}' AND MONTH(Fecha)={mes_numero} AND YEAR(Fecha)={año} AND T.ID_Tipo_Gasto=R.Tipo_Gasto GROUP BY T.Nombre ORDER BY Valor DESC"
    df_dist_gastos = pd.read_sql(query, conexion_BD)

    dinero_utilizado_val =  obtener_gasto_ingreso_mes(session.get('usuario_id'),'Ingreso',mes_numero,año)
    gasto_val =  obtener_gasto_ingreso_mes(session.get('usuario_id'),'Gasto',mes_numero,año)
    cant_ingresos_val = obtener_cant_gasto_ingreso_mes(session.get('usuario_id'),'Ingreso',mes_numero,año)
    cant_gastos_val = obtener_cant_gasto_ingreso_mes(session.get('usuario_id'),'Gasto',mes_numero,año)
    gasto_fuerte = obtener_gasto_fuerte(session.get('usuario_id'),mes_numero,año)  # Datos del gasto más representativo

    recomendacion_val = obtener_recomendacion_IA(session.get('usuario_id'),mes_numero,año)

    return render_template("Recomendaciones.html", get_meses=meses_val.to_dict('records'), 
                                                    get_mes=mes,get_año=año,
                                                    get_dist_gastos=df_dist_gastos.to_dict('records'),
                                                    get_dinero_utilizado=dinero_utilizado_val,
                                                    get_gasto_val=gasto_val,
                                                    get_cant_ingresos=cant_ingresos_val,
                                                    get_cant_gastos=cant_gastos_val,
                                                    get_gasto_fuerte=gasto_fuerte,
                                                    get_recomendacion=recomendacion_val)

if __name__=="__main__": 
    app.run(debug=True, port=777)
    session['usuario_id'] = " " # Elimina la sesión


