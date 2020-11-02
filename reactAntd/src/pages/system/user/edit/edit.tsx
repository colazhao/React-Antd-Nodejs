import * as React from "react";
import {Component} from 'react';
import './edit.less';
import {Modal, Button, Form, Input, InputNumber, Select} from 'antd';
import http from '../../../../common/service/http';
import { FormInstance } from 'antd/lib/form';

interface Props {
    editId: String,
}

class Edit extends Component<Props, any> {
    formRef = React.createRef<FormInstance>();
    constructor(props: Props) {
        super(props);
        this.state = {
            roleList: []
        }
    }
    componentWillMount() {
        this.getRole();
        if(this.props.editId){
            this.getInfo(this.props.editId);
        }
    }
    getRole(){
        http.get(`role/list`, '',resp=>{
            this.setState({roleList: resp});
        });
    }
    getInfo(id){
        http.get(`user/get/${id}`, '',resp=>{
            console.log(resp);
            this.formRef.current.setFieldsValue(resp);
        });
    }
    onFinish(values?){
        console.log(values);
        let params = this.formRef.current.getFieldsValue();
        this.props.editId && Object.assign(params, {id: this.props.editId});
        let url = this.props.editId? 'update': 'add';
        return new Promise((resolve, reject) => {
            http.post('user/'+url, params, resp=>{
                resolve(true);
            })
        });
    };
    selectRole(e){
        console.log(e);
    }

    render() {
        const layout = {
            labelCol: {span: 4},
            wrapperCol: {span: 20},
        };
        const validateMessages = {
            required: '${label} is required!',
            types: {
                email: '${label} is not validate email!',
                number: '${label} is not a validate number!',
            },
            number: {
                range: '${label} must be between ${min} and ${max}',
            },
        };
        const { Option } = Select;
        return (
            <>
                <Form {...layout} ref={this.formRef} name="nest-messages" onFinish={(e)=>this.onFinish(e)} validateMessages={validateMessages}>
                    <Form.Item name="name" label="用户名" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="email" label="邮箱" rules={[{type: 'email'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="age" label="年龄" rules={[{type: 'number', min: 0, max: 99}]}>
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item name="address" label="地址">
                        <Input/>
                    </Form.Item>
                    <Form.Item name="roleId" label="角色">
                        <Select onChange={(e)=>this.selectRole(e)}>
                            {
                                this.state.roleList.map((item,key)=>{
                                    return <Option value={item.id} key={key}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="note" label="备注">
                        <Input.TextArea/>
                    </Form.Item>
                    {/*<Form.Item wrapperCol={{...layout.wrapperCol, offset: 10}}>*/}
                    {/*    <Button type="primary" htmlType="submit">*/}
                    {/*        Submit*/}
                    {/*    </Button>*/}
                    {/*</Form.Item>*/}
                </Form>
            </>
        );
    }
}

export default Edit;
