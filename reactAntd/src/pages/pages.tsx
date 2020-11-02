import {Component} from 'react';
import * as React from "react";
import {
    HashRouter as Router, Link,
    Route, Switch, Redirect
} from 'react-router-dom';
import './pages.less';
import Home from './home/home';
import System from "./system/system";
import MenuList from './menu/menu';
import BreadcrumbComponent from './breadcrumb/breadcrumb';

import routes from './pages-router';

class Pages extends Component<{}, any> {
    constructor(props) {
        super(props);
        this.state = {
            hash: window.location.hash.split('#')[1],
        };
        props.history.push(this.state.hash);
        console.log(props);
        console.log(this.state);
    }
    render() {
        return (
            <div className="main">
                <nav className="title">REACT</nav>
                <div className="pages">
                    <div className="menu">
                        <MenuList/>
                    </div>
                    {/*routes={route.routes}*/}
                    <div className="breadcrumb">
                        <BreadcrumbComponent/>
                    </div>
                    <div className="content">
                        <Router>
                            <Switch>
                                {
                                    routes.map((route, key) => {
                                        if (route.exact) {
                                            return <Route key={key} exact path={route.path}
                                                          render={props => (
                                                              <route.component {...props}  />
                                                          )}
                                            />;
                                        } else if (route.redirect) {
                                            return <Redirect key={key} from={"/*"} to={route.redirect}/>
                                        } else {
                                            return <Route key={key} path={route.path}
                                                          render={props => (
                                                              <route.component {...props}  />
                                                          )}
                                            />
                                        }
                                    })
                                }
                            </Switch>
                        </Router>
                        {/*<Switch>*/}
                        {/*    <Route exact path='/' component={Home}/>*/}
                        {/*    <Route path='/pages/system' component={System}/>*/}
                        {/*    <Route path='/pages/home' component={Home}/>*/}
                        {/*</Switch>*/}
                    </div>
                </div>
            </div>
        );
    };
};
export default Pages;
