from transformers import pipeline
from flask import Flask, request, render_template
from flask_cors import CORS

app = Flask(__name__, template_folder="templates")
CORS(app) # Para permitir solicitudes http

id_usuario=""

@app.route('/PaginaPrincipal')
@app.route('/')
def aplicacion():
    return render_template("PaginaPrincipal.html")

@app.route('/login')
def iniciar_sesion():
    return render_template("IniciarSesion.html")

@app.route('/login_correcto', methods=['POST'])
def inicio_exitoso():
    usuario = request.form['email']
    contrasena = request.form['lock_key']

    conexion_BD = conectarDB()

    if conexion_BD:
        import pandas as pd

        query = "SELECT * FROM Usuario"
        df_usuarios = pd.read_sql(query, conexion_BD)
        print()
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

def conectarDB():
    import pyodbc
    import pandas as pd
    from sqlalchemy import create_engine
    from reactpy import component, html

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

if __name__=="__main__": 
    app.run(debug=True, port=7777)

