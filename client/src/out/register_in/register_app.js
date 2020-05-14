import React,{Component} from "react";
import {Route,Switch} from "react-router-dom";
import {Register_account_page, Register_facebook_page} from "./register_pages";
import {NavBar} from "../../component/AppBar"
class register_app extends Component{
    render(){
        return(
            <div>
                <div>
                <NavBar/>
                </div>
                    Please choose one below, strongly recommend register by Facebook!
                <Switch>
                    <Route path="/Register/pages/Register_account" exact component={Register_account_page}/>
                    <Route path="/Register/pages/Register_facebook" exact component={Register_facebook_page}/>
                </Switch>
            </div>
        )
}
}

export default register_app;