from transformers import pipeline
from flask import Flask, request, render_template
from flask_cors import CORS

app = Flask(__name__, template_folder="templates")
CORS(app) # Para permitir solicitudes http

@app.route('/PaginaPrincipal')
@app.route('/')
def aplicacion():
    return render_template("PaginaPrincipal.html")

@app.route('/login')
def iniciar_sesion():
    return render_template("IniciarSesion.html")

@app.route('/registro')
def registrar_cuenta():
    return render_template("CrearCuenta.html")


if __name__=="__main__": 
    app.run(debug=True, port=7777)
