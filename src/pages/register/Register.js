import React, { Component } from 'react';
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import './Register.css';
import * as RegisterService from "../../services/RegisterService";
import {Redirect} from "react-router-dom";
import * as StorageService from "../../services/StorageService";

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: "",
            name: "",
            email: ""
        };
    }

    componentDidMount() {
        StorageService.logout();
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    register = (event) => {
        event.preventDefault();

        RegisterService.registerUser(
            this.state.email,
            this.state.password,
            this.state.name
        ).then((user) => {
            StorageService.setUserToken(JSON.stringify({token: user.data.api_token, name: user.data.name}));
            this.setState({success: "Successfully registered"});
            setTimeout(this.redirect, 1000);
        }).catch(e => console.log({error: e.error}));


    };

    redirect = () => {
        this.setState({ redirect: true })
    };


    validateForm = () => {
        return this.state.email.length > 0
            && this.state.password.length > 0
            && this.state.name.length > 0;
    };

    validatePassword = () => {
        return !this.state.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/) && this.state.password.length > 0;
    };

    render() {

        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/home'/>;
        }

        return (
            <div className="Register">
                <Form onSubmit={this.register}>
                    <FormGroup>
                        <h2>Register</h2>
                    </FormGroup>

                    <FormGroup  controlId="email">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            type="email"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup  controlId="password">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        {this.validatePassword() &&
                            <p className="alert-danger alert fade show">one digit, one uppercase, one lowercase, no special and 8 characters</p>}
                    </FormGroup>

                    <FormGroup controlId="name">
                        <FormLabel>Name</FormLabel>
                        <FormControl
                            placeholder="Full name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <Button
                        block
                        size="lg"
                        variant="light"
                        disabled={!this.validateForm() || this.validatePassword()}
                        type="submit"
                    >
                        Submit
                    </Button>
                    {this.state.success && <p className="alert-success alert fade show">{this.state.success}</p>}
                </Form>
                <div className="Slant"/>
            </div>
        );
    }
}
