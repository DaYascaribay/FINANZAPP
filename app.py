from flask import Flask, request, render_template

# Lectura de BD
import pandas as pd
import pyodbc
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Boolean

#from classes import Usuario #Creación de usuarios

app = Flask(__name__, template_folder="templates")

id_usuario=""

Base = declarative_base()

class Usuario(Base):
    __tablename__ = 'Usuario'
    Usuario_ID = Column(String, primary_key=True)
    Nombre = Column(String)
    Apellido = Column(String)
    Contrasena = Column(String)
    Email = Column(String)
    Premiun = Column(Boolean)

@app.route('/PaginaPrincipal')
@app.route('/')
def aplicacion():
    return render_template("PaginaPrincipal.html")

@app.route('/login')
def iniciar_sesion():
    return render_template("IniciarSesion.html")

@app.route('/login_correcto', methods=['POST'])
def inicio_exitoso():
    # Datos del formulario
    usuario = request.form['email']
    contrasena = request.form['lock_key']

    conexion_BD = conectarDB() # Conexión a la BD

    if conexion_BD:
        query = "SELECT * FROM Usuario"
        df_usuarios = pd.read_sql(query, conexion_BD)
        for i,user in df_usuarios.iterrows():
            if usuario==f"{user['Email']}" and contrasena==f"{user['Contrasena']}":
                print("Bienvenido "+f"{user['Nombre']}")
                queryId="SELECT Usuario_ID FROM Usuario where Email='"+f"{user['Email']}"+"'"
                id_usuario = str(pd.read_sql(queryId, conexion_BD))
                return render_template("ObservarGastos.html")
        
        return render_template("IniciarSesion.html")

@app.route('/registro')
def registrar_cuenta():
    return render_template("CrearCuenta.html")

@app.route('/registro_correcto', methods=['POST'])
def registrar_cuenta_correcto():
    # Datos del formulario
    nombre = request.form['nombre']
    apellido = request.form['apellido']
    email = request.form['email_usuario']
    contrasena = request.form['password_one']
    contrasena_repeated = request.form['password_repeated']

    conexion_BD = conectarDB() # Conexión a la BD
    if conexion_BD:
        # Verificar correo duplicado
        query = "SELECT * FROM Usuario"
        informacion_usuarios = pd.read_sql(query, conexion_BD)

        for i,user in informacion_usuarios.iterrows():
            if email==f"{user['Email']}":
                return render_template("CrearCuenta.html", error="El correo ya está utilizado")

        # Calcular cantidad de usuarios
        query = "SELECT count(*) FROM Usuario"
        cant_Usuarios = pd.read_sql(query, conexion_BD)
        num_usuario = cant_Usuarios.iloc[0, 0]  # Accede al elemento en la posición (0, 0)
        num_usuario_increment = num_usuario + 1  # Suma 1 al valor obtenido

        Base = declarative_base() # Definir la estructura de la tabla
    
        Base.metadata.create_all(conexion_BD) # Crear las tablas en la base de datos

        # Crear una sesión
        Session = sessionmaker(bind=conexion_BD)
        session = Session()

        nuevo_usuario = Usuario(
            Usuario_ID = str(num_usuario_increment),
            Nombre = nombre,
            Apellido = apellido,
            Contrasena = contrasena,
            Email = email,
            Premiun = False
        )
        try:
            session.add(nuevo_usuario)
            session.commit()
            return render_template("IniciarSesion.html")
        except:
            return render_template("CrearCuenta.html", error="No se ha podido crear el usuario")
    
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

@app.route('/olvcontrasena')
def olvidado_contrena():
    return render_template("OlvidasteContrasena.html")

if __name__=="__main__": 
    app.run(debug=True, port=7777)

