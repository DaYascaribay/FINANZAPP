from flask import Flask, request, render_template, redirect, url_for, session

# Lectura de BD
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Float, Date, Boolean

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

def conectarDB():
    # Variables de conexión
    server = 'DESKTOP-VQQ74TJ'
    bd = 'FINANZAPP'
    user = 'sa2'
    password = '12345678'
    try:
        conexion_str = f"mssql+pyodbc://{user}:{password}@{server}/{bd}?driver=ODBC+Driver+17+for+SQL+Server"
        engine = create_engine(conexion_str)
        print('Conexión exitosa')
    except Exception as e:
        print(f'Error al intentar conectarse: {e}')
        engine = None

    return engine

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

@app.route('/app/observar_gastos', methods=['GET','POST'])
def inicio_exitoso():
    if request.method=='POST':
        # Datos del formulario
        usuario = request.form['email']
        contrasena = request.form['lock_key']
        conexion_BD = conectarDB() # Conexión a la BD

        if conexion_BD:
            query = "SELECT * FROM Usuario"
            df_usuarios = pd.read_sql(query, conexion_BD)
            for i,user in df_usuarios.iterrows():
                if usuario==f"{user['Email']}" and contrasena==f"{user['Contrasena']}":
                    #queryId="SELECT Usuario_ID FROM Usuario where Email='"+f"{user['Email']}"+"'"
                    session['usuario_id'] = f"{user['Usuario_ID']}"  # Guardar el ID del usuario en la sesión
                    
                    # Obtención de dinero restante y dinero utilizado
                    query="SELECT SUM(Valor) FROM Registro WHERE Usuario_ID='"+session.get('usuario_id')+"'AND Tipo_Registro='Gasto'"
                    suma_gastos = pd.read_sql(query, conexion_BD)
                    try:
                        suma_gastos = round(suma_gastos.iloc[0, 0],2)  # Accede al elemento en la posición (0, 0)
                        suma_gastos_val = "$"+str(suma_gastos) 
                    except:
                        suma_gastos_val="$0"

                    query="SELECT SUM(Valor) FROM Registro WHERE Usuario_ID='"+session.get('usuario_id')+"'AND Tipo_Registro='Ingreso'"
                    suma_ingresos = pd.read_sql(query, conexion_BD)
                    try:
                        suma_ingresos = round(suma_ingresos.iloc[0, 0],2)  # Accede al elemento en la posición (0, 0)
                        dinero_restante = "$"+str(round(suma_ingresos-suma_gastos,2))
                    except:
                        dinero_restante="$0"

                    # Obtención de cantidad de ingresos y gastos
                    query="SELECT COUNT(*) FROM Registro WHERE Usuario_ID='"+session.get('usuario_id')+"'AND Tipo_Registro='Gasto'"
                    cant_gastos = pd.read_sql(query, conexion_BD)
                    try:
                        cant_gastos_val = str(cant_gastos.iloc[0, 0]) # Accede al elemento en la posición (0, 0)
                    except:
                        cant_gastos_val="0"

                    query="SELECT COUNT(*) FROM Registro WHERE Usuario_ID='"+session.get('usuario_id')+"'AND Tipo_Registro='Ingreso'"
                    cant_ingresos = pd.read_sql(query, conexion_BD)
                    try:
                        cant_ingresos_val = str(cant_ingresos.iloc[0, 0]) # Accede al elemento en la posición (0, 0)
                    except:
                        cant_ingresos_val="0" 
                    
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
        query="SELECT SUM(Valor) FROM Registro WHERE Usuario_ID='"+session.get('usuario_id')+"'AND Tipo_Registro='Gasto'"
        suma_gastos = pd.read_sql(query, conexion_BD)
        try:
            suma_gastos = round(suma_gastos.iloc[0, 0],2)  # Accede al elemento en la posición (0, 0)
            suma_gastos_val = "$"+str(suma_gastos) 
        except:
            suma_gastos_val="$0"

        query="SELECT SUM(Valor) FROM Registro WHERE Usuario_ID='"+session.get('usuario_id')+"'AND Tipo_Registro='Ingreso'"
        suma_ingresos = pd.read_sql(query, conexion_BD)
        try:
            suma_ingresos = round(suma_ingresos.iloc[0, 0],2)  # Accede al elemento en la posición (0, 0)
            dinero_restante = "$"+str(suma_ingresos-suma_gastos)
        except:
            dinero_restante="$0"

        # Obtención de cantidad de ingresos y gastos
        query="SELECT COUNT(*) FROM Registro WHERE Usuario_ID='"+session.get('usuario_id')+"'AND Tipo_Registro='Gasto'"
        cant_gastos = pd.read_sql(query, conexion_BD)
        try:
            cant_gastos_val = str(cant_gastos.iloc[0, 0]) # Accede al elemento en la posición (0, 0)
        except:
            cant_gastos_val="0"

        query="SELECT COUNT(*) FROM Registro WHERE Usuario_ID='"+session.get('usuario_id')+"'AND Tipo_Registro='Ingreso'"
        cant_ingresos = pd.read_sql(query, conexion_BD)
        try:
            cant_ingresos_val = str(cant_ingresos.iloc[0, 0]) # Accede al elemento en la posición (0, 0)
        except:
            cant_ingresos_val="0" 
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

        return render_template("ObservarGastos.html",get_dinero_restante=dinero_restante, 
                            get_dinero_utilizado=suma_gastos_val,
                            get_cant_gastos=cant_gastos_val,
                            get_cant_ingresos=cant_ingresos_val,
                            get_meses=lista_meses)


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

    conexion_BD = conectarDB() # Conexión a la BD
    if conexion_BD:
        # Verificar correo duplicado
        query = "SELECT * FROM Usuario"
        informacion_usuarios = pd.read_sql(query, conexion_BD)

        for i,user in informacion_usuarios.iterrows():
            if email==f"{user['Email']}":
                session['msj_enviado_registro'] = "El correo electrónico ya utilizado"
                return redirect(url_for('registro'))

        # Calcular cantidad de usuarios
        query = "SELECT count(*) FROM Usuario"
        cant_Usuarios = pd.read_sql(query, conexion_BD)
        num_usuario = cant_Usuarios.iloc[0, 0]  # Accede al elemento en la posición (0, 0)
        num_usuario_increment = num_usuario + 1  # Suma 1 al valor obtenido

        Base = declarative_base() # Definir la estructura de la tabla
    
        Base.metadata.create_all(conexion_BD) # Crear las tablas en la base de datos

        # Crear una sesión
        Session = sessionmaker(bind=conexion_BD)
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
    if session['usuario_id'] == " ": #Verifica que haya una sesión activa
        session['msj_enviado_login'] = "Por favor inicie sesión"
        return redirect(url_for('login'))
    # Cargar los tipos de gastos 
    query = "SELECT * FROM Tipo_Gasto"
    conexion_BD = conectarDB()
    df_opciones = pd.read_sql(query, conexion_BD)
    opciones_val = [(row['ID_Tipo_Gasto'], row['Nombre']) for index, row in df_opciones.iterrows()][1:]

    return render_template("RegistrarGastos.html", get_opciones=opciones_val, get_registros_temporales=registros_temporales)


@app.route('/app/agregar_registro', methods=['POST'])
def agregar_registro():
    if session['usuario_id'] == " ": #Verifica que haya una sesión activa
        session['msj_enviado_login'] = "Por favor inicie sesión"
        return redirect(url_for('login'))
    # Cargar los tipos de gastos 
    query = "SELECT * FROM Tipo_Gasto"
    conexion_BD = conectarDB()
    df_opciones = pd.read_sql(query, conexion_BD)
    opciones_val = [(row['ID_Tipo_Gasto'], row['Nombre']) for index, row in df_opciones.iterrows()][1:]

    # Obtener usuario (debes implementar cómo obtienes el usuario ID)
    usuario_id = session.get('usuario_id')  # Ejemplo estático, debes cambiar esto según tu lógica

    # Obtener datos del formulario
    nombre = request.form['nombre']
    valor = request.form['valor']
    fecha = request.form['fecha']
    tipo_registro = request.form['group51']
    
    try:
        tipo_gasto = request.form['dropdown']
    except :
        tipo_gasto = "0"

    # Contar registros por usuario
    query = f"SELECT count(*) FROM Registro where Usuario_ID = {usuario_id}"
    cant_Registros = pd.read_sql(query, conexion_BD)
    num_registro = cant_Registros.iloc[0, 0]  # Accede al elemento en la posición (0, 0)
    num_registro_increment = num_registro + len(registros_temporales) + 1  # Suma 1 al valor obtenido
    registro_id = f"{usuario_id}.{num_registro_increment}"

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

    # Redirigir de vuelta al formulario con la lista de opciones y registros temporales
    return render_template("RegistrarGastos.html", get_opciones=opciones_val, get_registros_temporales=registros_temporales)


@app.route('/app/guardar_registros', methods=['POST'])
def guardar_registros():
    if session['usuario_id'] == " ": #Verifica que haya una sesión activa
        session['msj_enviado_login'] = "Por favor inicie sesión"
        return redirect(url_for('login'))
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
        # Limpiar la lista de registros temporales después de guardar en la base de datos
        registros_temporales.clear()

    # Redirigir a alguna página de éxito o volver al formulario
    return redirect(url_for('crear_registro'))

@app.route('/app/eliminar_registros')
def eliminar_registros():
    if session['usuario_id'] == " ": #Verifica que haya una sesión activa
        session['msj_enviado_login'] = "Por favor inicie sesión"
        return redirect(url_for('login'))
    registros_temporales.clear()
    # Redirigir a alguna página de éxito o volver al formulario
    return redirect(url_for('crear_registro'))

@app.route('/app/recomendaciones')
def recomendaciones():
    return render_template("Recomendaciones.html")

@app.route('/app/observar_gastos_mes')
def observar_gastos_mes():
    if session.get('usuario_id') == " ": # Verifica que haya una sesión activa
        session['msj_enviado_login'] = "Por favor inicie sesión"
        return redirect(url_for('login'))
    
    meses_espanol = {
        'Enero': 1, 'Febrero': 2, 'Marzo': 3, 'Abril': 4,
        'Mayo': 5, 'Junio': 6, 'Julio': 7, 'Agosto': 8,
        'Septiembre': 9, 'Octubre': 10, 'Noviembre': 11, 'Diciembre': 12
    }
    
    mes = request.args.get('mes')
    mes_numero = meses_espanol.get(mes)
    año = request.args.get('año')

    conexion_BD = conectarDB()
    
    # Obtención de dinero restante y dinero utilizado
    query="SELECT SUM(Valor) FROM Registro WHERE Usuario_ID='"+session.get('usuario_id')+"'AND Tipo_Registro='Gasto' AND MONTH(Fecha)="+str(mes_numero)+" AND YEAR(Fecha)="+str(año)
    suma_gastos = pd.read_sql(query, conexion_BD)
    try:
        suma_gastos = round(suma_gastos.iloc[0, 0],2)  # Accede al elemento en la posición (0, 0)
        suma_gastos_val = "$"+str(suma_gastos) 
    except:
        suma_gastos_val="$0"

    query="SELECT SUM(Valor) FROM Registro WHERE Usuario_ID='"+session.get('usuario_id')+"'AND Tipo_Registro='Ingreso' AND MONTH(Fecha)="+str(mes_numero)+" AND YEAR(Fecha)="+str(año)
    suma_ingresos = pd.read_sql(query, conexion_BD)
    try:
        suma_ingresos = round(suma_ingresos.iloc[0, 0],2)  # Accede al elemento en la posición (0, 0)
        dinero_restante = "$"+str(round(suma_ingresos-suma_gastos,2))
    except:
        dinero_restante="$0"
    
    query = "SELECT Registro_ID, Nombre, Valor, Fecha, Tipo_Registro, Tipo_Gasto FROM Registro WHERE Usuario_ID='"+session.get('usuario_id')+"' AND MONTH(Fecha)="+str(mes_numero)+" AND YEAR(Fecha)="+str(año)+" order by Fecha"
    df_registros_mes = pd.read_sql(query, conexion_BD)

    return render_template("ResumenMensual.html", registros=df_registros_mes.to_dict(orient='records'), mes=mes, año=año,
                           get_dinero_restante=dinero_restante,
                           get_dinero_utilizado=suma_gastos_val)

@app.route('/app/observar_gastos_general')
def observar_gastos_general():
    if session.get('usuario_id') == " ": # Verifica que haya una sesión activa
        session['msj_enviado_login'] = "Por favor inicie sesión"
        return redirect(url_for('login'))
    
    meses_espanol = {
        'Enero': 1, 'Febrero': 2, 'Marzo': 3, 'Abril': 4,
        'Mayo': 5, 'Junio': 6, 'Julio': 7, 'Agosto': 8,
        'Septiembre': 9, 'Octubre': 10, 'Noviembre': 11, 'Diciembre': 12
    }
    
    mes = request.args.get('mes')
    mes_numero = meses_espanol.get(mes)
    año = request.args.get('año')

    conexion_BD = conectarDB()
    
    # Obtención de dinero restante y dinero utilizado
    query="SELECT SUM(Valor) FROM Registro WHERE Usuario_ID='"+session.get('usuario_id')+"'AND Tipo_Registro='Gasto'"
    suma_gastos = pd.read_sql(query, conexion_BD)
    try:
        suma_gastos = round(suma_gastos.iloc[0, 0],2)  # Accede al elemento en la posición (0, 0)
        suma_gastos_val = "$"+str(suma_gastos) 
    except:
        suma_gastos_val="$0"

    query="SELECT SUM(Valor) FROM Registro WHERE Usuario_ID='"+session.get('usuario_id')+"'AND Tipo_Registro='Ingreso'"
    try:
        suma_ingresos = round(suma_ingresos.iloc[0, 0],2)  # Accede al elemento en la posición (0, 0)
        dinero_restante = "$"+str(round(suma_ingresos-suma_gastos,2))
    except:
        dinero_restante="$0"
    
    query = "SELECT Registro_ID, Nombre, Valor, Fecha, Tipo_Registro, Tipo_Gasto FROM Registro WHERE Usuario_ID='"+session.get('usuario_id')+"' order by Fecha"
    df_registros_mes = pd.read_sql(query, conexion_BD)

    return render_template("ResumenGeneral.html", registros=df_registros_mes.to_dict(orient='records'), mes=mes, año=año,
                           get_dinero_restante=dinero_restante,
                           get_dinero_utilizado=suma_gastos_val)


if __name__=="__main__": 
    app.run(debug=True, port=7777)

