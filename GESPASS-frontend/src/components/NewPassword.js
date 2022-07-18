import React from "react";
import { Button, Container,  Alert, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Home from "./home";
import $ from "jquery";
import { Redirect } from "react-router-dom";

class NewPassword extends React.Component {

    state={
        val: false,
    }

    cambiar = () =>{
        this.setState((state)=>({
          val:true,
          comp: <Home></Home>
        }))
    }

    validar=(entrada,operacion) =>{
        console.log(entrada+"|"+operacion);
        var datos={
            entrada: entrada,
            operacion: operacion
        }

        $.get("AgregarPregunta",datos, (resultado)=>{
            //console.log(resultado[0]);
          if(resultado[0].status !="0"){
            this.state.val = true;
            this.forceUpdate();
          }else{
            alert("No se pudo agregar la pregunta");
          }
          
        })
     
    }
 

    render() {
        const styles = {
            padding : '5px'
        }
        const qId = (new URLSearchParams(window.location.search).get("val") == "true")? true:false;
        const undiv= <Container className="MarginContainer Image" >
                        
                        <p className="TextTitle" > <br/> Crear nueva pregunta</p>
                        <p className="AlignCenterSub" > <br/>Ingresa los valores y selecciona la operacion </p>
                        <Form>
                            <Form.Group className="mb-3" controlId="entrada">
                                <Form.Label>Entrada</Form.Label>
                                <Form.Control type="text" placeholder="Entrada" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Operacion</Form.Label>
                                <label class="r-form-control" for="Mean"><input type="radio" value="1" name="operacion" id="Mean"/> Mean</label>
                                <label class="r-form-control" for="Mode"><input type="radio" value="2" name="operacion" id="Mode"/> Mode</label>
                                <label class="r-form-control" for="1stQRT"><input type="radio" value="3" name="operacion" id="1stQRT"/>1st QRT</label>
                                <label class="r-form-control" for="Min"><input type="radio" value="4" name="operacion" id="Min"/>Min</label>
                                <label class="r-form-control" for="Range"><input type="radio" value="5" name="operacion" id="Range"/>Range</label>
                                <label class="r-form-control" for="Median"><input type="radio" value="6" name="operacion" id="Median"/>Median</label>
                                <label class="r-form-control" for="3erQRT"><input type="radio" value="7" name="operacion" id="3erQRT"/>3erQRT</label>
                                <label class="r-form-control" for="Max"><input type="radio" value="8" name="operacion" id="Max"/>Max</label>
                                <label class="r-form-control" for="IQRT"><input type="radio" value="9" name="operacion" id="IQRT"/>IQRT</label>
                            </Form.Group>
                            <Form.Group className="aligndiv">
                                <Button
                                    variant="success"
                                    className="M-6"
                                    onClick={() => this.validar(document.getElementById("entrada").value,document.querySelector('input[name="operacion"]:checked').value)}>
                                    <Link to="./home" className="CustomLink" >
                                        Enviar
                                    </Link>
                                </Button>
                            </Form.Group>
                            <Form.Group className="aligndiv">
                                <Link to="./home">
                                    <Button variant="secondary">
                                        Regresar
                                    </Button>
                                </Link>
                            </Form.Group>
                            
                        </Form>
                            
                              
                        
                    </Container>
        //const esValido = (this.state.val) || qId?<Home />: undiv
        const esValido = (this.state.val) || qId?<Redirect to="./home" />: undiv
        return (
            <div>
                {esValido}
            </div>
        )
    }

}

export default NewPassword;