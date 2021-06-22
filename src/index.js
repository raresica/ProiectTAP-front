import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GenreList from './GenreList';
import BookList from './BookList';
import NavBar from './NavBar';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import SignUpPage from "./SignUpPage";
import SignInPage from "./SignInPage";
import ProfilePage from "./ProfilePage";

ReactDOM.render(
    <Router>
        <NavBar/>
        <Switch>
            <Route path="/categorii">
                <GenreList/>
            </Route>
            <Route path="/carti">
                <BookList/>
            </Route>
            <Route path="/sign-up">
                <SignUpPage/>
            </Route>
            <VisitorRoute path="/sign-in">
                <SignInPage/>
            </VisitorRoute>
            <ProtectedRoute path="/profile">
                <ProfilePage/>
            </ProtectedRoute>
        </Switch>
    </Router>,
    document.getElementById('root')
);


function ProtectedRoute(props) {
    const isLoggedIn = !!localStorage.getItem("username")
    const {children, ...rest} = props;

    return (
        <Route
            {...rest}
            render={() =>
                isLoggedIn ? children : (
                    <Redirect
                        to="/sign-in"
                    />
                )
            }
        />
    );
}

function VisitorRoute(props) {
    const isLoggedIn = !!localStorage.getItem("username")
    const {children, ...rest} = props;

    return (
        <Route
            {...rest}
            render={() =>
                !isLoggedIn ? children : (
                    <Redirect
                        to="/profile"
                    />
                )
            }
        />
    );
}
