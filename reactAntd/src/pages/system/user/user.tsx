import * as React from "react";
import {Component, useState} from 'react';
import {
    HashRouter as Router, Link,
    Route, Switch,
} from 'react-router-dom';
import './user.less';
import {Table, Modal, Button, Popconfirm} from 'antd';
import http from '../../../common/service/http';
import UserDetail from "./detail/detail";
import UserEdit from './edit/edit';

// interface Props {
//     value: Object;
// }

class User extends Component {
    state = {
        editVisible: false,
        editId: '',
        title: '',
        data: []
    };
    curUser;
    child;

    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.getInfo();
    }

    //新建--编辑
    edit(id?) {
        let visible = this.state.editVisible;
        this.setState({
            editId: id ? id : '',
            title: id ? '编辑用户' : '新建用户',
            editVisible: !visible,
        });
    };

    //删除
    delete(id?) {
        http.post(`user/delete/${id}`, '', resp => {
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

    getInfo() {
        // let resp = await http.get('user/list', '') || [], info = [];
        // for (let i = 0; i < resp['length']; i++) {
        // }
        http.get('user/list', '', resp => {
            let info = [];
            resp.forEach((item, index) => {
                info.push({
                    key: index,
                    id: item.id,
                    name: item.name,
                    age: item.age,
                    email: item.email,
                    roleName: item.roleName,
                    address: item.address,
                    note: item.note,
                    operation:
                        <div>
                            <Button type="primary" style={{marginRight: '5px'}}
                                    onClick={() => this.edit(item.id)}>编辑</Button>
                            {/*<Button type="primary" onClick={() => this.delete(item.id)}>删除</Button>*/}
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


    render() {
        // useState会返回两个，一个是当前值。一个是改变它的函数
        // let [state,setState] = useState({visible: false});
        const columns = [
            {
                title: '用户名',
                dataIndex: 'name',
                width: 150,
                render: (text, record, index) => <Link to={`/pages/system/user/content/${record.key}`}>{text}</Link>,
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width: 150,
            },
            {
                title: '所属角色',
                dataIndex: 'roleName',
                width: 150,
            },
            {
                title: '地址',
                dataIndex: 'address',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
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
            <div className="user">
                <div className="buttons">
                    <Button type="primary" style={{marginRight: '5px'}} onClick={() => this.edit()}>新建</Button>
                </div>
                <div className={'user-table'} style={{'width': this.curUser ? '70%' : '100%'}}>
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
                    <UserEdit editId={this.state.editId} ref={e => {
                        this.child = e
                    }}>
                    </UserEdit>
                </Modal>
                {/*<div className={'user-detail'}>*/}
                {/*    {*/}
                {/*        this.curUser && <UserDetail value={this.curUser} callback={this.callback.bind(this)}/>*/}
                {/*    }*/}
                {/*</div>*/}
            </div>
        );
    };
};
export default User;
