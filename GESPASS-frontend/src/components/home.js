import React from "react";
import { Button, Container, InputGroup, Alert, Row, Form, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import ShowPassword from "./ShowPassword";
import ModalMod from "./ModalMod";
import ModalNew from "./ModalNew";
import NavigationBar from "./NavigationBar";
import $ from "jquery";
import { Search } from 'react-bootstrap-icons';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showAlert: false,
            alertText: "",
            User: props.user,
            modifyData: {idPass:"", nameSite:"", site:"", passwd:""},
            showModalMod: false,
            showModalNew: false,
            updatePage: false,
            search:""
        }

        this.setModifyData = this.setModifyData.bind(this);
        this.addData = this.addData.bind(this);
        this.modData = this.modData.bind(this);
        this.delData = this.delData.bind(this);
        this.getData = this.getData.bind(this);
        
    }

    addData = (dataP)=>{
        //this.setState({data: [...this.state.data, dataP]} )
        this.getData();
    }
    modData = (dataP)=>{
        
        const newData = this.state.data.map(obj => {
            if (obj.idPass === dataP.idPass) {
                return dataP;
            }
            return obj;
        })
        console.log("After mod");
        console.log(newData);
        this.setState({data: newData} )

    }
    delData = (dataP)=>{
        
        const newData = this.state.data.filter(obj => {
                return obj.idPass !== dataP.idPass;
              });
        console.log("After delete");
        console.log(newData);

        this.setState({data: newData})

    }

    
  
    handleCloseModalMod = () => this.setState({ showModalMod: false });
    handleShowModalMod = () => this.setState({ showModalMod: true });

    handleCloseModalNew = () => this.setState({ showModalNew: false });
    handleShowModalNew = () => this.setState({ showModalNew: true });

    handleChangeSearch = (event) =>{
        
        const { User, search } = this.state;
        /*this.setState({search: event.target.value},()=>{
            if(search == ""){
                this.getData();
            }else{
                $.get("searchPassword",{
                    idUser:User.idUser,
                    busqueda:search
                }, (response)=>{
                    this.setState({ data: response });
                })
            }
        });*/
        this.setState({search: event.target.value})
        /*$.get("searchPassword",{
            idUser:User.idUser,
            busqueda:search
        }, (response)=>{
            this.setState({ data: response });
        },async)*/
        $.get({
            url:"searchPassword",
            data:{idUser:User.idUser,
                busqueda:search},
            async:false
        }, (response)=>{

            this.setState({ data: response });
        });



        
          
  
  
    }
  
    componentDidMount() {
        this.getData();
    }

    getData(){
        const { User } = this.state;

        $.get("showPasswords",{
            idUser:User.idUser
        }, (response)=>{
            this.setState({ data: response });
        })
        
        this.render();
    }

    setModifyData(password){
        this.setState({modifyData: {...this.state.modifyData,
            idPass: password.idPass,
            nameSite: password.nameSite,
            site: password.site,
            user: password.user,
            passwd: password.passwd
        }});
        this.handleShowModalMod();
    }

 

    render() {
        const { data, showAlert, alertText, User, showModalMod, showModalNew, modifyData, search} = this.state;
        return (
            <>
            
            <NavigationBar Logout={this.props.Logout} userName={User.user}/>
            <Container className="MarginContainer Image" >

                <ModalMod modData={this.modData} passKey={User.pass} handleClose={this.handleCloseModalMod} show={showModalMod} modifyData={modifyData}/>
                <ModalNew addData={this.addData} idUser={User.idUser} passKey={User.pass} handleClose={this.handleCloseModalNew} show={showModalNew} />
                
                <p className="TextTitle" > <br/> Sistema de gestión de contraseñas</p> <br/>
                <h1 className="AlignCenter" > Contraseñas </h1>
                
                <hr style={{ width: "80%" }} />
                {
                    showAlert ?
                        <Alert variant="danger">
                            {alertText}
                        </Alert>
                        : null
                }
                
                
                <Row xs={1} md={3} className="g-4">
                    <Col>
                        <Button 
                        id="newPass"
                        variant="success" 
                        style={{ marginBottom: "12px" }}
                        onClick={this.handleShowModalNew}>
                            Nueva Contraseña
                        </Button>
                    </Col>
                    <Col md={{ span: 4, offset: 4 }}>
                        <InputGroup className="mb-3" style={{ float: "right"}}>
                            <Form.Control
                            placeholder="Buscar"
                            aria-label="Buscar"
                            aria-describedby="basic-addon2"
                            onChange={this.handleChangeSearch}
                            value={search}
                            type="search"
                            />
                            <Button variant="outline-secondary" id="button-addon2" onClick={this.handleChangeSearch}>
                                <Search color="black"/>
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>


                <Row xs={1} md={3} className="g-4">
                    {
                        data.map(passwords => {
                        return <ShowPassword delData={this.delData} passwords={passwords} setModifyData={this.setModifyData} passKey={User.pass}/>
                        
                    })
                    }
                </Row>
            </Container>
            </>
        )
    }

}

export default Home;