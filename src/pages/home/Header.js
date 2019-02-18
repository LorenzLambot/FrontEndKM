import React, { Component } from 'react';
import * as StorageService from "../../services/StorageService";
import {Button, Form} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import './Home.css';
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ""
        };
    }

    componentDidMount() {
        StorageService.getUserToken().then(token => this.setState({name: token.name}))
    }

    logout = (event) => {
        StorageService.logout();
        this.setState({redirect: true});
        event.preventDefault();
    };

    render() {

        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/login'/>;
        }

        return (
                <Navbar bg="dark" variant="dark">
                    <NavbarBrand className="mr-auto">
                        <h1>Welcome {this.state.name}</h1>
                    </NavbarBrand>
                    <Form inline onSubmit={this.logout} className="mr-sm-2">
                        <Button
                            size="lg"
                            variant="light"
                            type="submit"
                        >
                            Logout
                        </Button>
                    </Form>
                </Navbar>
        );
    }
}

