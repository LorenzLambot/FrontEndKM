import React, { Component } from 'react';
import * as StorageService from "../../services/StorageService";
import {Button} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import './Home.css';
import * as FavoriteMovieService from "../../services/FavoriteMoviesService";
import Header from "./Header";


export class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            favoriteMovies: []
        };
    }

    componentDidMount() {
        this.getFavoriteMovies();
        StorageService.getUserToken().then(token => this.setState({name: token.name}))
    }

    getFavoriteMovies() {
        FavoriteMovieService.getFavoriteMovies()
            .then(movies => this.setState({favoriteMovies: movies}))
            .catch(e => console.log(e));
    }

    deleteFavoriteMovie = (event, id) => {
        event.preventDefault();
        FavoriteMovieService.deleteFavoriteMovie(id).then(() => {
            this.getFavoriteMovies();
        }).catch(err => console.log(err));
    };

    render() {

        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/login'/>;
        }

        return (
            <div className="Home">
                <Header/>
                <div className="FavoriteMovies">
                    <div className="FavoriteMovieItem">
                        <h2 className="scoretitle">Score</h2> <h2>Movie</h2>
                        <div/>
                        <div/>
                    </div>
                    {this.state.favoriteMovies.map((movie, i) => {
                        return <div key={i} className="FavoriteMovieItem">
                            <h5 className="score">{movie.score}/10</h5>
                            <h5 className="title">{movie.title}</h5>
                            <Button href={`/EditFavoriteMovie/${movie.id}`} variant="dark">Edit</Button>
                            <Button onClick={(e) => this.deleteFavoriteMovie(e, movie.id)} variant="dark">Delete</Button>
                        </div>
                    })}
                    <Button href="/AddFavoriteMovie" className="add" variant="dark">Add Favorite movie</Button>
                </div>
            </div>
        );
    }
}

