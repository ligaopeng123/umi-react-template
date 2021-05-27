export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/login',
          },
        ],
      },
    ],
  },
  {
    name: '首页',
    icon: 'smile',
    path: '/dashboard',
    component: './dashboardMonitor',
  },
  {
    path: '/devices',
    name: '设备',
    icon: 'smile',
    component: './devices/Welcome',
  },
  {
    path: '/uphold',
    name: '远程维护',
    icon: 'crown',
    access: 'canAdmin',
    component: './uphold/Admin',
    routes: [
      {
        path: '/uphold/sub-page',
        name: 'XXX',
        icon: 'smile',
        component: './404',
      },
    ],
  },
  {
    name: '视频查看',
    icon: 'table',
    path: '/list',
    component: './tableList',
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/404',
    name: '404',
    icon: 'smile',
    component: './404',
  },
  {
    component: './404',
  },
];
