import React, { Component } from 'react';
import * as StorageService from "../services/StorageService";
import {Login} from "../pages/login/Login";
/**
 * Higher-order component (HOC) to wrap restricted pages
 */

export default function(WrapperComponent) {
    class CheckTokenComponent extends Component {

        checkAuthentication() {
            return StorageService.checkToken();
        }

        render() {
            if(this.checkAuthentication()){
                return <WrapperComponent {...this.props} />
            }else{
                return <Login/>;
            }
        }
    }
    return CheckTokenComponent;
}