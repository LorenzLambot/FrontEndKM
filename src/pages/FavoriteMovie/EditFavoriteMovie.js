import Button from "react-bootstrap/Button";
import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import Header from "../home/Header";
import Form from "react-bootstrap/Form";
import {FormControl, FormGroup, FormLabel} from "react-bootstrap";
import './FavoriteMovie.css';
import * as FavoriteMovieService from "../../services/FavoriteMoviesService";


export class EditFavoriteMovie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            favoriteMovieId: this.props.match.params.id,
            movieName: "",
            score: 0,
        };
    }

    componentDidMount() {
        FavoriteMovieService.getFavoriteMovie(this.state.favoriteMovieId).then((movie) => {
            this.setState({movieName: movie.title, score: movie.score})
        });
    }

    Update = (event) => {
        event.preventDefault();
        FavoriteMovieService.updateFavoriteMovie(this.state.favoriteMovieId, this.state.movieName, this.state.score)
            .then(() => {
                this.setState({success: "Successfully added"});
                setTimeout(this.redirect, 1000);
            }).catch(err => console.log(err));
    };

    redirect = () => {
        this.setState({ redirect: true })
    };


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    render() {

        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/home'/>;
        }

        return (
            <div className="Home">
                <Header/>

                <Form onSubmit={this.Update} className="AddFavoriteMovies">
                    <FormGroup>
                        <h2>Update favorite movie</h2>
                    </FormGroup>

                    <FormGroup  controlId="movieName">
                        <FormLabel>Movie name</FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter movie name"
                            value={this.state.movieName}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup controlId="score">
                        <FormLabel>Score /10</FormLabel>
                        <FormControl
                            placeholder="score /10"
                            value={this.state.score}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Button type="submit" className="add" variant="dark">Update Favorite movie</Button>
                    {this.state.success && <p className="alert-success alert fade show">{this.state.success}</p>}
                </Form>
            </div>
        );
    }
}