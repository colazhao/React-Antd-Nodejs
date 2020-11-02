import * as React from "react";
import {Component} from 'react';
import './edit.less';
import {Modal, Button, Form, Input, InputNumber, Select} from 'antd';
import http from '../../../../common/service/http';
import { FormInstance } from 'antd/lib/form';

interface Props {
    editId: String,
}

class Edit extends Component<Props> {
    formRef = React.createRef<FormInstance>();
    constructor(props: Props) {
        super(props);
        this.state = {}
        if(props.editId){
            this.getInfo(props.editId);
        }
    }
    getInfo(id){
        http.get(`role/get/${id}`, '',resp=>{
            this.formRef.current.setFieldsValue(resp);
        });
    }
    onFinish(values?){
        let params = this.formRef.current.getFieldsValue();
        this.props.editId && Object.assign(params, {id: this.props.editId});
        let url = this.props.editId? 'update': 'add';
        return new Promise((resolve, reject) => {
            http.post('role/'+url, params, resp=>{
                resolve(true);
            })
        });
    };
    render() {
        const layout = {
            labelCol: {span: 4},
            wrapperCol: {span: 20},
        };
        const validateMessages = {
            required: '${label} is required!',
        };
        const { Option } = Select;
        return (
            <>
                <Form {...layout} ref={this.formRef} name="nest-messages" onFinish={(e)=>this.onFinish(e)} validateMessages={validateMessages}>
                    <Form.Item name="name" label="角色名" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="note" label="备注">
                        <Input.TextArea/>
                    </Form.Item>
                </Form>
            </>
        );
    }
}

export default Edit;
