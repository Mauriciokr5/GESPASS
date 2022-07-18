import React,{useState, useEffect} from "react";
import { Button, Modal, Form } from "react-bootstrap";
import CryptoJS from "crypto-js";
import $ from "jquery";

function ModalMod({modData, passKey, handleClose, show, modifyData}) {
    const [pass, setPass] = useState({idPass:"", nameSite:"", site:"",user:"", passwd:""});

    const handleChange = (event) =>{

      switch(event.target.id){
        case "site":
          console.log("site");
          setPass({idPass:pass.idPass, site:event.target.value, nameSite:pass.nameSite, user:pass.user, passwd:pass.passwd});
        break;
        case "nameSite":
          console.log("nameSite");
          setPass({idPass:pass.idPass, site:pass.site, nameSite:event.target.value, user:pass.user, passwd:pass.passwd});
        break;
        case "user":
          console.log("user");
          setPass({idPass:pass.idPass, site:pass.site, nameSite:pass.nameSite,user:event.target.value,  passwd:pass.passwd});
        break;
        case "passwd":
          console.log("passwd");
          setPass({idPass:pass.idPass, site:pass.site, nameSite:pass.nameSite,user:pass.user,  passwd:event.target.value});
        break;
        default:
          console.log("default");
      }


    }

    const handleSubmit = ()=>{
        var passEncrypted = CryptoJS.AES.encrypt(pass.passwd, passKey).toString();
        var dataP = {
          idPass:pass.idPass,
          nameSite:pass.nameSite, 
          site:pass.site, 
          user: pass.user,
          passwd:passEncrypted
        }

        $.post("updatePassword",{
          idPass:pass.idPass,
          nameSite:pass.nameSite, 
          site:pass.site, 
          user: pass.user,
          passwd:passEncrypted
        }, (resultado)=>{})
        
        modData(dataP);
        handleClose();

    }

    useEffect(() => {
        var decrypted = CryptoJS.AES.decrypt(modifyData.passwd, passKey);
        setPass({idPass:modifyData.idPass, nameSite:modifyData.nameSite, site:modifyData.site,user: modifyData.user, passwd:decrypted.toString(CryptoJS.enc.Utf8)});
    }, [modifyData]);

    useEffect(() => {
    }, [show]);
    
    
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Contraseña</Modal.Title>
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

  export default ModalMod;