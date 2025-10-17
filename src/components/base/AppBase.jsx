import React, {useState} from 'react';
import {Layout} from 'antd';
import AppHeader from "./header/index.jsx";
import AppSider from "./sider/index.jsx";
import {calc} from 'antd/es/theme/internal.js';

const {Content} = Layout;


const AppBase = (props) => {

    const [collapsed, setCollapsed] = useState(false);

    const childrenWithProps = React.Children.map(props.children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {hello: "hello"});
        }
        return child;
    });
    return (
        <Layout style={{height: "100vh"}}>
            <AppSider collapsed={collapsed} setCollapsed={setCollapsed}/>
            <Layout>
                <AppHeader collapsed={collapsed} setCollapsed={setCollapsed}/>
                <Content
                    style={{
                        padding: 24,
                    }}
                >
                    {childrenWithProps}
                </Content>
            </Layout>


        </Layout>
    )
}

export default AppBase