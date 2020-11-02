import Home from './home/home';
import System from './system/system';
import User from './system/user/user';
import Role from './system/role/role';
import UserContent from './system/user/content/content';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';

let routes=[
    {
        name: '首页',
        path:"/pages/home",
        component:Home,
        icon: 'DesktopOutlined',
        exact:true
    },
    {
        name: '系统管理',
        path: "/pages/system",
        component: System,
        icon: 'AppstoreOutlined',
        children:[
            {
                name: '用户管理',
                path:"/pages/system/user",
                component:User,
                children:[
                    {
                        name: '用户详情',
                        path: "/pages/system/user/content/:id",
                        component: UserContent,
                    }
                ]
            },
            {
                name: '角色管理',
                path:"/pages/system/role",
                component:Role,
                children:[]
            },
        ]
    },
    {
        name: '首页',
        path:"/",
        redirect: '/pages/home',
    },
]
export default routes;
