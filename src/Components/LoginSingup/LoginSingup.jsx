import React, { useState } from 'react'
import './LoginSingup.css'

import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'


const LoginSingup = () => {

const [action,setAction] = useState("Iniciar Sesión");

    return (
        <div className='container'>
            <div className="header">
                <div className="text">{action}</div>
                {/*<div className="image"><img src={fondo} alt="" /></div>*/}
            </div>

            <div className="inputs">
            {action === "Iniciar Sesión" ? (
                <div></div>
            ) : (
                <>
                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" placeholder="Nombre" />
                    </div>
                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" placeholder="Apellido" />
                    </div>
                </>
            )}
                
                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder='Correo electrónico'/>
                </div>
                
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder='Contrseña'/>
                </div>

                {action === "Iniciar Sesión" ? (
                <div></div>
                ) : (
                    <>
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input type="password" placeholder='Confirmar Contraseña'/>
                    </div>
                    </>
                )}
            </div>
            
            {action === "Registrarse" ? (
            <div className="terms-use">
            <input type="checkbox"/>
            Acepto <span>Términos de uso </span> & <span>Políticas de Privacidad</span>
            </div>
            ) : (
                <>
                <div className="forgot-password"><span>Olvidó su usuario y/o contraseña</span></div>
                </>
            )}
            
            <div className="submit-container">
                <div className={action==="Iniciar Sesión"?"submit gray":"submit"} onClick={()=>{setAction("Registrarse")}}>Crea Cuenta</div>
                <div className={action==="Registrarse"?"submit gray":"submit"} onClick={()=>{setAction("Iniciar Sesión")}}>Iniciar Sesión</div>
            </div>
            
        </div>
        
    )
}

export default LoginSingup