import {
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Alert, message} from 'antd';
import React, {useState} from 'react';
import ProForm, {ProFormCheckbox, ProFormText} from '@ant-design/pro-form';
import {useIntl, Link, history, SelectLang, useModel, FormattedMessage} from 'umi';
import {login} from '@/services/ant-design-pro/api';
import styles from './index.less';

const LoginMessage: React.FC<{
    content: string;
}> = ({content}) => (
    <Alert
        style={{
            marginBottom: 24,
        }}
        message={content}
        type="error"
        showIcon
    />
);
/** 此方法会跳转到 redirect 参数所在的位置 */

const goto = () => {
    if (!history) return;
    setTimeout(() => {
        const {query} = history.location;
        const {redirect} = query as {
            redirect: string;
        };
        history.push(redirect || '/');
    }, 10);
};

const Login: React.FC = () => {
    const [submitting, setSubmitting] = useState(false);
    const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
    const {initialState, setInitialState} = useModel('@@initialState');
    const intl = useIntl();
    
    const fetchUserInfo = async () => {
        const userInfo = await initialState?.fetchUserInfo?.();
        
        if (userInfo) {
            setInitialState({...initialState, currentUser: userInfo});
        }
    };
    
    const handleSubmit = async (values: API.LoginParams) => {
        setSubmitting(true);
        
        try {
            // 登录
            const msg = await login({...values});
            
            if (msg.status === 'ok') {
                const defaultloginSuccessMessage = intl.formatMessage({
                    id: 'pages.login.success',
                    defaultMessage: '登录成功！',
                });
                message.success(defaultloginSuccessMessage);
                await fetchUserInfo();
                goto();
                return;
            } // 如果失败去设置用户错误信息
            
            setUserLoginState(msg);
        } catch (error) {
            const defaultloginFailureMessage = intl.formatMessage({
                id: 'pages.login.failure',
                defaultMessage: '登录失败，请重试！',
            });
            message.error(defaultloginFailureMessage);
        }
        
        setSubmitting(false);
    };
    
    const {status} = userLoginState;
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.top}>
                    <div className={styles.header}>
                        <span className={styles.title}>
                            <FormattedMessage id={`pages.login.title`}/>
                        </span>
                    </div>
                    <div className={styles.desc}></div>
                </div>
                
                <div className={styles.main}>
                    <ProForm
                        initialValues={{
                            autoLogin: true,
                        }}
                        submitter={{
                            searchConfig: {
                                submitText: intl.formatMessage({
                                    id: 'pages.login.submit',
                                    defaultMessage: '登录',
                                }),
                            },
                            render: (_, dom) => dom.pop(),
                            submitButtonProps: {
                                loading: submitting,
                                size: 'large',
                                style: {
                                    width: '100%',
                                },
                            },
                        }}
                        onFinish={async (values) => {
                            handleSubmit(values as API.LoginParams);
                        }}
                    >
                        
                        {status === 'error' && (
                            <LoginMessage
                                content={intl.formatMessage({
                                    id: 'pages.login.accountLogin.errorMessage',
                                    defaultMessage: '账户或密码错误（admin/ant.design)',
                                })}
                            />
                        )}
                        <ProFormText
                            name="username"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined className={styles.prefixIcon}/>,
                            }}
                            placeholder={intl.formatMessage({
                                id: 'pages.login.username.placeholder',
                                defaultMessage: '用户名: admin',
                            })}
                            rules={[
                                {
                                    required: true,
                                    message: '用户名是必填项！',
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={styles.prefixIcon}/>,
                            }}
                            placeholder={intl.formatMessage({
                                id: 'pages.login.password.placeholder',
                                defaultMessage: '密码: admin@123',
                            })}
                            rules={[
                                {
                                    required: true,
                                    message: '密码是必填项！',
                                },
                            ]}
                        />
                        
                        <div
                            style={{
                                marginBottom: 24,
                            }}
                        >
                            <ProFormCheckbox noStyle name="autoLogin">
                                自动登录
                            </ProFormCheckbox>
                            <a
                                style={{
                                    float: 'right',
                                }}
                            >
                                忘记密码 ?
                            </a>
                        </div>
                    </ProForm>
                </div>
            </div>
        </div>
    );
};

export default Login;
