
import User from './user/user';
import UserContent from './user/content/content';
import Role from './role/role';
let routes=[
    {
        name: 'User',
        path:"/pages/system/user",
        component:User,
        children:[
            {
                name: 'User',
                path: "/pages/system/user/content/:id",
                component: UserContent,
            }
        ]
    },
    {
        name: 'Role',
        path:"/pages/system/role",
        component:Role,
    },
];
export default routes;
