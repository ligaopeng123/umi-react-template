import {Space} from 'antd';
import {QuestionCircleOutlined} from '@ant-design/icons';
import React from 'react';
import {useModel, useIntl} from 'umi';
import Avatar from './AvatarDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
    const intl = useIntl();
    const {initialState} = useModel('@@initialState');
    
    if (!initialState || !initialState.settings) {
        return null;
    }
    
    const {navTheme, layout} = initialState.settings;
    let className = styles.right;
    
    if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
        className = `${styles.right}  ${styles.dark}`;
    }
    return (
        <Space className={className}>
      <span
          className={styles.action}
          onClick={() => {
          }}
      >
        <QuestionCircleOutlined/> <span className={styles.help}>
        {
            intl.formatMessage({
                id: 'layout.user.link.help'
            })
        }
      </span>
      </span>
            <Avatar/>
        </Space>
    );
};
export default GlobalHeaderRight;
