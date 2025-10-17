import React from 'react';
import {Result, Button} from 'antd';


export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError() {
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        console.error("if you want to log the error on slack integrate code here or something api ",error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <Result status="error" title="Something went wrong"
                           extra={<Button onClick={() => window.location.reload()}>Reload</Button>}/>;
        }
        return this.props.children;
    }
}