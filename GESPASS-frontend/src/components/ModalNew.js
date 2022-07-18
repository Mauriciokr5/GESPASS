import React,{useState, useEffect} from "react";
import { Button, Modal, Form } from "react-bootstrap";
import CryptoJS from "crypto-js";
import $ from "jquery";

function ModalNew({addData, idUser, passKey, handleClose, show}) {
    const [pass, setPass] = useState({nameSite:"", site:"", user:"", passwd:""});

    const handleChange = (event) =>{

      switch(event.target.id){
        case "site":
          console.log("site");
          setPass({ site:event.target.value, nameSite:pass.nameSite, user:pass.user, passwd:pass.passwd});
        break;
        case "nameSite":
          console.log("nameSite");
          setPass({ site:pass.site, nameSite:event.target.value, user:pass.user, passwd:pass.passwd});
        break;
        case "user":
          console.log("user");
          setPass({ site:pass.site, nameSite:pass.nameSite,user:event.target.value,  passwd:pass.passwd});
        break;
        case "passwd":
          console.log("passwd");
          setPass({ site:pass.site, nameSite:pass.nameSite,user:pass.user,  passwd:event.target.value});
        break;
        default:
          console.log("default");
      }


    }

    const autoComplete = ()=>{
      let url = pass.site;
      let domain = (new URL(url));
      domain = domain.hostname;
      let ini = domain.toString().indexOf(".")+1;
      let end = domain.toString().indexOf(".", ini);
      let name = domain.substring(ini, end);
      const nameUpper = name.charAt(0).toUpperCase() + name.slice(1);
      setPass({ site:pass.site, nameSite:nameUpper, user:pass.user, passwd:pass.passwd});
    }

    const handleSubmit = ()=>{
      var passEncrypted = CryptoJS.AES.encrypt(pass.passwd, passKey).toString();
      var dataP = {
        nameSite:pass.nameSite, 
        site:pass.site, 
        user: pass.user,
        passwd:passEncrypted
      }

      $.post("newPassword",{
        idUser:idUser,
        nameSite:pass.nameSite, 
        site:pass.site, 
        user: pass.user,
        passwd:passEncrypted
      }, (resultado)=>{
        if(resultado[0].status !="0"){
          addData(dataP);
        }else{
          alert("No se pudo agregar la contraseña");
        }
      
      })
      handleClose();
    }

    useEffect(() => {
      setPass({nameSite:"", site:"", user:"", passwd:""})
    }, [show]);
    
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Nueva Contraseña</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="site">
                <Form.Label>URL</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="https://www.google.com/"
                  value={pass.site}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="nameSite">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Google"
                  value={pass.nameSite}
                  onChange={handleChange}
                  onClick={autoComplete}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="user">
                <Form.Label>Usuario/Correo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="usuario@usu.com"
                  value={pass.user}
                  onChange={handleChange}
                  
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="passwd">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="********"
                  value={pass.passwd}
                  onChange={handleChange}
                  
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  export default ModalNew;