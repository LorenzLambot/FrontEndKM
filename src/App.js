import React, { Component } from 'react';
import { Route, Switch} from "react-router-dom";
import './App.css';
import {Home} from "./pages/home/Home";
import {Login} from "./pages/login/Login";
import {Register} from "./pages/register/Register";
import {AddFavoriteMovie} from "./pages/FavoriteMovie/AddFavoriteMovie";
import {EditFavoriteMovie} from "./pages/FavoriteMovie/EditFavoriteMovie";
import auth from "./util/auth";

class App extends Component {
  render() {
    return (
      <Switch>
          <Route exact path="/" component={auth(Home)} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/home" component={auth(Home)} />
          <Route path="/AddFavoriteMovie" component={auth(AddFavoriteMovie)} />
          <Route path="/EditFavoriteMovie/:id" component={auth(EditFavoriteMovie)} />
      </Switch>
    );
  }
}

export default App;