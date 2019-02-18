import React, { Component } from 'react';
import './Login.css';
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import * as LoginService from "../../services/LoginService";
import {Redirect} from "react-router-dom";
import * as StorageService from "../../services/StorageService";

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: "",
            attempts: 1
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

    handleSubmit = event => {
        if(this.state.attempts < 3) {

            const email = this.state.email;
            const password = this.state.password;

            LoginService.login(email, password).then((user) => {
                StorageService.setUserToken(JSON.stringify({token: user.data.api_token, name: user.data.name}));
                    this.setState({ redirect: true });
            }).catch((e) => this.setState({
                error: "Wrong credentials",
                attempts: this.state.attempts + 1
            }));
        }

        if(this.state.attempts === 3) {
            this.setState({
                error: "To many attempts wait one minute",
            });
            setTimeout(this.resetAttempts, 10000);
        }

        event.preventDefault();
    };

    resetAttempts = () => {
        this.setState({
            attempts: 1,
            error: ""
        });
    };

    render() {

        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/home'/>;
        }

        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit} className="Form">
                    <FormGroup>
                        <h2>Login</h2>
                    </FormGroup>
                    <FormGroup controlId="email" size="lg">
                        <FormLabel>email</FormLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup controlId="password" size="lg">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                            required
                        />
                    </FormGroup>
                    <Button
                        size="lg"
                        variant="light"
                        type="submit"
                    >
                        Login
                    </Button>
                    <a href="/register">Not yet registered?</a>
                    {this.state.error && <p className="alert-danger alert fade show">{this.state.error}</p>}
                </form>
                <div className="Slant"/>
            </div>
        );
    }
}
