import React from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import {Button, Layout, Typography} from 'antd';
import {useLocation} from 'react-router-dom';
import {routeTitles} from '../../../constant/dataKey';

const {Header} = Layout;


const AppHeader = ({collapsed, setCollapsed}) => {
    const location = useLocation();
    const currentPath = location.pathname;
    const title = routeTitles[currentPath] || 'Dashboard';


    return (
        <Header style={{padding: 0, backgroundColor: '#fff'}}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />

            <Typography.Text>{title}</Typography.Text>
        </Header>
    );
}
export default AppHeader