import * as React from "react";
import {Component} from 'react';
import './detail.less';
import { Table } from 'antd';
import { Modal, Button } from 'antd';
import UserContent  from '../content/content';
interface Props {
    value: {
        name: String,
        age: Number,
        address:String,
    };
    callback: Function
}
class UserDetail extends Component<Props>{
    myRef;
    constructor(props: Props) {
        super(props);
        this.myRef=React.createRef();
        console.log(props);
    }
    componentDidMount(){
        console.log(this.myRef.current);
    }
    sendParent = (data)=>{
        this.props.callback(data);
    }
    render(){
        const data = this.props['value'];
        return (
            <div className="user-content">
                <p>{data.name}</p>
                <p>{data.age}</p>
                <p>{data.address}</p>
                <UserContent ref={this.myRef} value={data}/>
                <Button type="primary" onClick={() => this.sendParent(data)}>callBack</Button>
            </div>
        );
    }
}
export default UserDetail;
