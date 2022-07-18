import React,{useState} from "react";
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import SiteRouter from "./SiteRouter";
import CryptoJS from "crypto-js";
import $ from "jquery";


const App = () => {
    const [user, setUser] = useState({idUser:"", user: "", pass:""});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const Login=(usuario,password) =>{


        var datos={
            User: usuario
        }
        /*var encrypted = CryptoJS.AES.encrypt(usuario, password).toString();
        var decrypted = CryptoJS.AES.decrypt(encrypted, password);
        
        alert(encrypted + "   "+ encrypted.length);
        alert(decrypted.toString(CryptoJS.enc.Utf8));*/

        if(user.user==""){
            $.post("signin",datos, (resultado)=>{

                if(resultado[0].user !="error" && "Sin música la vida sería un error."==CryptoJS.AES.decrypt(resultado[0].userPass, password).toString(CryptoJS.enc.Utf8)){
                    
                    setUser({idUser:resultado[0].idUser, user:resultado[0].user, pass:password});
                    setIsLoggedIn(true);
                    
                }else{
                  alert("USUARIO NO REGISTRADO")
                }
                
            })
        }
    }

    const Logout = () =>{
        setUser({idUser:"", user: "", pass:""});
        setIsLoggedIn(false);
    } 

    if (isLoggedIn) {
        return <>
            <SiteRouter Login={Login} Logout={Logout} user={user}/>
            <Redirect to='/passwords' />
        </>
       }
    return (
        <SiteRouter Login={Login} Logout={Logout} user={user}/>
    )
}
export default App;