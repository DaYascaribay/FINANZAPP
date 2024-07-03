import pyodbc
import pandas as pd
from sqlalchemy import create_engine
from reactpy import component, html


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

if __name__ == "__main__":
    engine = conectarDB()
    if engine:
        query = "SELECT * FROM Usuario"
        df_usuarios = pd.read_sql(query, engine)
        #print(df_usuarios.head())
        userEjemplo=input("Ingrese el email > ")
        contraseEjemplo=input("Ingrese su contraseña > ")
        print()
        for i,user in df_usuarios.iterrows():
            if userEjemplo==f"{user['Email']}" and contraseEjemplo==f"{user['Contrasena']}":
                print("Bienvenido "+f"{user['Nombre']}")
            else:
                #print(f"{user['Email']}"+" - "+f"{user['Contrasena']}")
                print()