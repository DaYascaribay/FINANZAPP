from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sqlalchemy import create_engine
import json

app = Flask(__name__)
CORS(app)

def conectarDB():
    server = 'DESKTOP-VQQ74TJ'
    bd = 'FINANZAPP'
    user = 'sa2'
    password = '12345678'

    try:
        conexion_str = f"mssql+pyodbc://{user}:{password}@{server}/{bd}?driver=ODBC+Driver+17+for+SQL+Server"
        engine = create_engine(conexion_str)
        return engine
    except Exception as e:
        return None

@app.route('/IniciarSesion', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    engine = conectarDB()
    if engine:
        query = "SELECT * FROM Usuario"
        df_usuarios = pd.read_sql(query, engine)
        
        for i, user in df_usuarios.iterrows():
            if email == f"{user['Email']}" and password == f"{user['Contrasena']}":
                print(f"{user['Email']} {user['Nombre']} inició sesión.")
                return jsonify({"success": True, "message": f"Bienvenido {user['Nombre']}"})
                
        
        return jsonify({"success": False, "message": "Nombre de usuario o contraseña incorrectos"})
    else:
        return jsonify({"success": False, "message": "Error al conectar a la base de datos"})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
