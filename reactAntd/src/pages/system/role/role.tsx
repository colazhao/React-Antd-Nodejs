import * as React from "react";
import {Component, useState} from 'react';
import {
    HashRouter as Router, Link,
    Route, Switch,
} from 'react-router-dom';
import './role.less';
import {Table, Modal, Button, Popconfirm} from 'antd';
import http from '../../../common/service/http';
import RoleEdit from './edit/edit';

class Role extends Component {
    state = {
        editVisible: false,
        editId: '',
        title: '',
        data: []
    };
    child;

    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.getInfo();
    }
    getInfo() {
        http.get('role/list', '', resp => {
            let info = [];
            resp.forEach((item, index) => {
                info.push({
                    key: index,
                    id: item.id,
                    name: item.name,
                    note: item.note,
                    operation:
                        <div>
                            <Button type="primary" style={{marginRight: '5px'}}
                                    onClick={() => this.edit(item.id)}>编辑</Button>
                            <Popconfirm
                                title={'是否删除'+item.name+'?'}
                                onConfirm={()=>this.delete(item.id)}
                                okText="确定" cancelText="取消"
                            >
                                <Button type="primary" danger>删除</Button>
                            </Popconfirm>
                        </div>
                });
            });
            this.setState({data: info});
        });
    }

    //新建--编辑
    edit(id?) {
        let visible = this.state.editVisible;
        this.setState({
            editId: id ? id : '',
            title: id ? '编辑角色' : '新建角色',
            editVisible: !visible,
        });
    };

    //删除
    delete(id?) {
        http.post(`role/delete/${id}`, '', resp => {
            this.getInfo();
        });
    }

    handleOk(e) {
        this.child.onFinish().then(data => {
            data && this.handleCancel(e);
            this.getInfo();
        });
    };

    handleCancel(e) {
        this.setState({
            editVisible: false,
        });
    };

    render() {
        // useState会返回两个，一个是当前值。一个是改变它的函数
        // let [state,setState] = useState({visible: false});
        const columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
                width: 150,
            },
            {
                title: '备注',
                dataIndex: 'note',
            },
            {
                title: '操作',
                dataIndex: 'operation',
                width: '300px'
            },
        ];

        return (
            <div className="role">
                <div className="buttons">
                    <Button type="primary"  onClick={() => this.edit()}>新建</Button>
                </div>
                <div className={'role-table'} >
                    <Table columns={columns} dataSource={this.state.data} pagination={{pageSize: 50}}
                           scroll={{y: 600}}/>
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.editVisible}
                    // footer={null}
                    onOk={(e) => this.handleOk(e)}
                    onCancel={(e) => this.handleCancel(e)}
                    okText={"提交"}
                    cancelText={"取消"}
                    destroyOnClose
                >
                    <RoleEdit editId={this.state.editId} ref={e => {
                        this.child = e
                    }}>
                    </RoleEdit>
                </Modal>
            </div>
        );
    };
};
export default Role;
