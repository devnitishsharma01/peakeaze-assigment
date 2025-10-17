import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import Dashboard from "./components/modules/dashboard/index.jsx";
import DetailView from "./components/modules/dashboard/DetailView.jsx";
import ErrorBoundary from "./components/modules/common/ErrorBoundary.jsx";


const {Header, Content} = Layout;


export default function App() {
    return (
        <ErrorBoundary>            
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/detail" element={<DetailView/>}/>
            </Routes>
        </ErrorBoundary>
    );
}