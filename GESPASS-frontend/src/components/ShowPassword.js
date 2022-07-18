import React, {useState}from "react";
import { Col, Button, Card, ListGroup, ListGroupItem, Accordion, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Eye, PencilSquare, Trash } from 'react-bootstrap-icons';
import axios from "axios";
import CryptoJS from "crypto-js";

const ShowPassword = ({delData, passKey, passwords, setModifyData}) => {
    const [passView, setPassView] = useState(passwords.passwd);
    const [passViewBool, setPassViewBool] = useState(true);
    const [messageCopy, setMessageCopy] = useState("Copiar");

    const handleClickEliminar = (event) => {
        if(window.confirm("¿Desea eliminar la pregunta?")){
            axios.post(`./deletePassword?idPass=${passwords.idPass}`).catch(error => {
                console.info(error);
                alert("Hubo un error");
            })
            delData(passwords);
        }
    }
    const handleShowPass =()=>{
        if(passViewBool){
            var decrypted = CryptoJS.AES.decrypt(passwords.passwd, passKey);
            setPassView(decrypted.toString(CryptoJS.enc.Utf8));
            setPassViewBool(false);
        }else{
            setPassView(passwords.passwd);
            setPassViewBool(true);
        }
        
    }

    const handleOnCopy=()=>{
        navigator.clipboard.writeText(passView);
        setMessageCopy("Copiado!");
        setTimeout(() => {  setMessageCopy("Copiar"); }, 3000);
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          {messageCopy}
        </Tooltip>
    );

    return (
        
        <Col>
            <Accordion>
                <Card className="text-center">
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        <Card.Title>{passwords.nameSite}</Card.Title>
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>
                                    
                                    <Card.Subtitle>
                                        <a href={passwords.site} target="_blank">{passwords.site}</a>
                                    </Card.Subtitle>
                                </ListGroupItem>
                                <ListGroupItem>{passwords.user}</ListGroupItem>

                                <OverlayTrigger
                                        placement="right"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltip}
                                    >
                                    <ListGroupItem onClick={handleOnCopy}>{passView}</ListGroupItem>
                                </OverlayTrigger>
                                <ListGroupItem>
                                    <Button 
                                        variant="info" 
                                        className="M-6"
                                        onClick={handleShowPass}>
                                            <Eye color="black"/>
                                    </Button>
                                    <Button
                                        variant="warning"
                                        className="M-6"
                                        onClick={() =>setModifyData(passwords)}>
                                            <PencilSquare color="black"/>
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="M-6"
                                        onClick={handleClickEliminar}>
                                        <Link to={`./passwords`} className="CustomLink" >
                                        <Trash color="black"/>
                                        </Link>
                                        
                                    </Button>
                                </ListGroupItem>
                            </ListGroup>
                            
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            
        </Col>
    )
}
export default ShowPassword;