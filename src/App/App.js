import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,

} from "react-router-dom";
import { Component } from "react";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Navigation from "../Navigation/Navigation";
import UserList from "../UserList/UserList";
import Registration from '../Registration/Registration';
import AboutMe from '../AboutMe/AboutMe';
import styles from './styles.scss';

export default class App extends Component {
    state = {
        users: []
    }

    addUser = (user) => {
        this.setState((prevState) => {
            return {
                users: [...prevState.users, { ...user }],
            };
        });
    };

    render() {
        return (

            <Router>
                <Route render={({ location }) => (
                    console.log(location),
                    <>
                        
                        <Route path="/">
                            <Redirect to="/add-user" />
                        </Route>
                        <Navigation />   {/* Возвращает список ссылок, которые меняют юрл */}
                        <TransitionGroup>
                            <CSSTransition
                                timeout={300}
                                classNames='page'
                                key={location.key}
                            >
                                <Switch>
                                    {/* роут отвечает за отрисовку компонента, то есть когда в юрл нужный, рисует компонент */}
                                    <Route path="/add-user">

                                        <Registration addUser={this.addUser} />

                                    </Route>
                                    <Route path="/user-list">
                                        <UserList users={this.state.users} />
                                    </Route>
                                    <Route path="/about-me"><AboutMe /></Route>

                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    </>
                )} />
            </Router>

        );
    }
}
