// https://umijs.org/config/
import {defineConfig} from 'umi';

export default defineConfig({

  plugins: [
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
  webpack5: {
    // lazyCompilation: {},
  },
  nodeModulesTransform: { // 编译提速
    type: 'none',
    exclude: [],
  },
  // 定义配置变量
  define: {
    REACT_APP_API_URL: 'http://10.1.1.1', // API调用密钥
  },
  antd: {
    dark: false, // 开启暗色主题
    compact: false, // 开启紧凑主题
  },
  layout: {
    logo: 'https://preview.pro.ant.design/static/logo.f0355d39.svg',
    title: '某某管理系统',
    // copy from pro site
    navTheme: 'dark',
    primaryColor: '#1890ff',
    layout: 'mix', // 布局方式 side | top|mix
    contentWidth: 'Fluid',
    fixedHeader: true, // 固定header到顶部
    fixSiderbar: true, // 固定导航
    pwa: false,
    iconfontUrl: '',
    headerTheme: 'dark',
  },
});
