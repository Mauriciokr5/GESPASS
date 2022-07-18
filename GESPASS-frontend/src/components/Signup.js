import React from "react";
import { Button, Container, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import $ from "jquery";
import CryptoJS from "crypto-js";

function Signup(){

    const createAccount = (usuario,password)=>{
        if(usuario!=""&&password!=""){

            var encrypted = CryptoJS.AES.encrypt("Sin música la vida sería un error.", password).toString();

            var datos={
                user: usuario,
                userPass:encrypted
            }

        
            $.post("signup",datos, (resultado)=>{

                if(resultado[0].status !="0"){
                    alert("USUARIO REGISTRADO")
                }else{
                    alert("USUARIO NO REGISTRADO")
                }
                
            })
        }else{
            alert("Campos vacios, no se pudo registrar")
        }
    }
  
    return(
        <Container className="MarginContainer Image">
          <p className="TextTitle" > <br/> GESPASS</p> <br/>
          <h1 className="AlignCenter" > Crear cuenta </h1>
          <Form className="formLogIn">
            <Form.Group controlId="User">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="text" placeholder="Ingrese su usuario" />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Ingrese su contraseña" />
            </Form.Group>
            <Form.Group className="aligndiv"><Link to="./" className="CustomLink" >
              <Button
                id="login"
                variant="success"
                className="M-6"
                onClick={() => createAccount(document.getElementById("User").value,document.getElementById("password").value)}>
                    Enviar
              </Button></Link>
            </Form.Group>
          </Form>
          
                  
        </Container>
      ) 
    

}

export default Signup;