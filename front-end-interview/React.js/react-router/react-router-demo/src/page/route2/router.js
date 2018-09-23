import React, { Component } from 'react'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import Main from '../route1/Main'
import About from '../route1/about'
import Topics from '../route1/topic'
import Home from './home'
export default class IRouter extends Component {
    render() {
        return (
            <Router>
                <Home>
                    <Route path="/main" render={() => (
                        <Main>
                            <Route path="/main/a" component={About}></Route>
                        </Main>
                    )}></Route>
                    <Route path="/about" component={About}></Route>
                    <Route path="/topics" component={Topics}></Route>
                </Home>
            </Router>
        )
    }
}