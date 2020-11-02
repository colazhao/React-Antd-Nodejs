import {Component} from 'react';
import * as React from "react";
import {
    HashRouter as Router,
    Route, Switch
} from 'react-router-dom';
import user from './user/user';
import role from './role/role';
import UserContent from "./user/content/content";
import routes from './system-router';

class System extends Component {
    routerListen;
    constructor(props) {
        super(props);
        console.log(this.props);
    }

    //只会在装载之前调用一次，在 render 之前调用，
    componentWillMount() {
        this.props['history'].listen(route => {
            if (route.pathname) {
                this.setState({pathname: route.pathname});
            }
        })
        this.props['history'].push(this.props['location'].pathname);
    }

    // 组件挂载,只会在装载完成之后调用一次
    componentDidMount() {
        console.log(this.props['location']);
    }
    //更新
    componentWillReceiveProps(nextProps) {
        console.log(this.props['location']);
        console.log(nextProps);
        if(this.props['location'].pathname != nextProps.location.pathname){
            this.setState({pathname: nextProps.location.pathname});
        }
    }
    //组件卸载
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        return (
            <div className="system" style={{height: '100%'}} key={this.props['location'].key}>
                <Router>
                    <Switch>
                        <Route exact path='/' component={user}/>
                        {/*<Route path='/pages/system/user' component={user}/>*/}
                        {/*<Route path='/pages/system/role' component={role}/>*/}
                        {/*<Route path='/pages/system/user/content/:id' component={UserContent}/>*/}
                        {
                            routes.map((item, key) => {
                                if (item.children && item.children.length) {
                                    return <Route key={key} path={item.path} component={item.component}/>
                                } else {
                                    return <Route key={key} path={item.path} component={item.component}/>
                                }
                            })
                        }
                    </Switch>
                </Router>
            </div>
        );
    };
};
export default System;
