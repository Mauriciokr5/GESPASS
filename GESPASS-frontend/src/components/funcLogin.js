import React from "react";
import { Button, Container, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

function FuncLogin({Login}){
  
      return(
        <Container className="MarginContainer Image">
          <p className="TextTitle" > <br/> GESPASS</p> <br/>
          <h1 className="AlignCenter" > Iniciar Sesión </h1>
          <Form className="formLogIn">
            <Form.Group controlId="User">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="text" placeholder="Ingrese su usuario" />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Ingrese su contraseña" />
              <p style={{textAlign: "center"}}>
                o <Link to="/registro">crea una cuenta</Link>
              </p>
              
            </Form.Group>
            <Form.Group className="aligndiv">
              <Button
                id="login"
                variant="success"
                className="M-6"
                onClick={() => Login(document.getElementById("User").value,document.getElementById("password").value)}>
                  Enviar
              </Button>
              
            </Form.Group>
          </Form>
          
                  
        </Container>
      ) 
    

}

export default FuncLogin;