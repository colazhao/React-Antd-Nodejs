import {Component} from 'react';
import './breadcrumb.less';
import * as React from "react";
import { Breadcrumb } from 'antd';
import {
    HashRouter as Router, Link,
    Route, Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
class BreadcrumbComponent extends Component{
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }
    state = {
        hash: window.location.hash.includes('#/pages/')? window.location.hash.split('#/pages/')[1]:'/'
    }
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props['history'].listen(route => {
            if(route.pathname){
                this.setState({hash: route.pathname})
            }
        })
    }
    render() {
        let list = this.state.hash.split('/');
        // const { match, location, history } = this.props;
        return (
        <Breadcrumb>
                {
                    list.map((item, key)=>{
                        return <Breadcrumb.Item key={key}>
                            <Link to={this.state.hash}>{item}</Link>
                        </Breadcrumb.Item>
                    })
                }
            </Breadcrumb>
        );
    };
};
export default withRouter(BreadcrumbComponent);
