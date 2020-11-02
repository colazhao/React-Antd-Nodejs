import {Component} from 'react';
import * as React from "react";
import './loadingBox.less';
import { Spin } from 'antd';
class LoadingBox extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="loading-box">
                <Spin size="large"/>
            </div>
        );
    };
};
export default LoadingBox;

