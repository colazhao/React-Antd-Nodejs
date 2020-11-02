import {Component} from 'react';
import './content.less';
import * as React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";
import { Table } from 'antd';
import { Modal, Button } from 'antd';
interface Props {
    value: {
        name: String,
        age: Number,
        address:String,
    };
}
class UserContent extends Component<Props>{
    params = useParams;
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className="user-content">
                {this.props.value.name}
                {this.params}
            </div>
        );
    }
}
export default UserContent;
