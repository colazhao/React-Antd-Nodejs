import {Component} from 'react';
import * as React from "react";
import {
    HashRouter as Router,
    Route, Link
} from 'react-router-dom';
import './menu.less';
import {Menu, Button} from 'antd';
import Icon from '@ant-design/icons';
import {
    AppstoreOutlined,
    HomeOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
import menuRouter from '../pages-router';
// import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'

const {SubMenu} = Menu;

class MenuList extends Component {
    state = {
        collapsed: false,
        currentRouterKey: ''
    };

    constructor(props) {
        super(props);
        this.location();
    }

    location() {
        menuRouter.forEach((item, index) => {
            if (!item.redirect) {
                if (this.props['location'].pathname.includes(item.path)) {
                    if (item.children && item.children.length) {
                        item.children.forEach((val, i) => {
                            if (this.props['location'].pathname.includes(val.path)) {
                                this.state.currentRouterKey = 'c' + i;
                            } else {
                                this.state.currentRouterKey = 'c' + 0;
                            }
                        })
                    } else {
                        this.state.currentRouterKey = index + '';
                    }
                } else if (this.props['location'].pathname == '/' || !this.props['location'].pathname) {
                    this.state.currentRouterKey = '0';
                }
            }
        });
    }

    componentWillMount() {
        this.props['history'].listen(route => {
        })
    }

    componentDidMount() {
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <div className="menu-list">
                {/*<Button type="primary" onClick={this.toggleCollapsed} style={{marginBottom: 16}}>*/}
                {/*    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}*/}
                {/*</Button>*/}
                <Menu
                    defaultSelectedKeys={[this.state.currentRouterKey]}
                    defaultOpenKeys={['1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    {
                        menuRouter.map((item, key) => {
                            if (!item.redirect) {
                                if (item.children && item.children.length) {
                                    return <SubMenu key={key} title={
                                                <span>
                                                    <AppstoreOutlined/>
                                                    <span>{item.name}</span>
                                                </span>}>
                                                {
                                                item.children.map((val, index) => {
                                                    return <Menu.Item key={'c' + index}>
                                                            <Link to={val.path}><span>{val.name}</span></Link>
                                                            </Menu.Item>
                                                    })
                                                }
                                            </SubMenu>
                                } else {
                                    return <Menu.Item key={key} title="">
                                        <Link to={item.path}>
                                            <span><HomeOutlined />{item.name}</span>
                                        </Link>
                                    </Menu.Item>
                                }
                            }
                        })
                    }
                    {/*<SubMenu key="sub1" title={ <span> <MailOutlined/> <span>Navigation One</span> </span> }>*/}
                    {/*    <Menu.Item key="5">Option 5</Menu.Item>*/}
                    {/*    <Menu.Item key="6">Option 6</Menu.Item>*/}
                    {/*    <Menu.Item key="7">Option 7</Menu.Item>*/}
                    {/*    <Menu.Item key="8">Option 8</Menu.Item>*/}
                    {/*</SubMenu>*/}
                    {/*<SubMenu key="sub2" title={ <span> <MailOutlined/> <span>Navigation Two</span> </span>}>*/}
                    {/*    <Menu.Item key="9">Option 9</Menu.Item>*/}
                    {/*    <Menu.Item key="10">Option 10</Menu.Item>*/}
                    {/*    <SubMenu key="sub3" title="Submenu">*/}
                    {/*        <Menu.Item key="11">Option 11</Menu.Item>*/}
                    {/*        <Menu.Item key="12">Option 12</Menu.Item>*/}
                    {/*    </SubMenu>*/}
                    {/*</SubMenu>*/}
                </Menu>
            </div>
        );
    }
};
export default withRouter(MenuList);
