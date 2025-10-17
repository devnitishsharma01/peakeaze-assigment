import React, {useState} from 'react';
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    DoubleLeftOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Space, Divider, Typography} from 'antd';
import {useLocation, useNavigate} from 'react-router-dom';
import { PAGE_KEY } from '../../../constant/dataKey';

const {Sider} = Layout;

const Index = ({collapsed, setCollapsed}) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>

            {!collapsed ? (
                <div
                    className="logo"
                    style={{paddingTop: "15px"}}
                    onClick={() => history.push("/")}>
                    <div style={{display: "flex", alignItems: "center",justifyContent:"center"}}>
                        <Typography.Text style={{color:"#fff"}}>Nitish Sharma</Typography.Text>
                     
                    </div>
                </div>
            ) : (
                <div style={{paddingTop:"15px",display: "flex", alignItems: "center",justifyContent:"center"}}>
                    <Typography.Text style={{color:"#fff"}}>N S</Typography.Text>
                </div>
            )}

            <Divider size={"large"} style={{marginBottom: 2, background:"#fff"}}/>

            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                selectedKeys={[location.pathname]}
                onClick={({key}) => {navigate(key), localStorage.setItem(PAGE_KEY, 1);}}
                items={[
                    {
                        key: '/',
                        icon: <UserOutlined/>,
                        label: 'Dashboard',
                    },
                    {
                        key: '/detail',
                        icon: <VideoCameraOutlined/>,
                        label: 'Detail List',
                    },
                ]}
            />
        </Sider>
    );
}

export default Index