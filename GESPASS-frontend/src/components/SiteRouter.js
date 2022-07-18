import React from "react";
import {
    Switch,
    Route
} from "react-router-dom";
import FuncLogin from "./funcLogin";
import Home from "./home";
import Signup from "./Signup";


function SiteRouter({Login, Logout, user}){
   return  <Switch>
        <Route exact path="/">
            <FuncLogin Login={Login} />
        </Route>
        <Route exact path="/passwords">
            <Home user={user} Logout={Logout}/>
        </Route>
        <Route exact path="/registro">
            <Signup/>
        </Route>
        <Route path="*" render={() => <h1>Recurso no encontrado</h1>} />
    </Switch>

}
export default SiteRouter;