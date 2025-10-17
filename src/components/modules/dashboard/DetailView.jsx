import React, {useEffect, useState} from 'react';
import {List, Button, Row, Col, Card, Popconfirm, Typography, message, Pagination} from 'antd';
import filesApi from "../../../api/filesApi.js";
import {SELECTED_KEY} from "../../../constant/dataKey.jsx";
import AppBase from "../../base/AppBase.jsx";
import {DeleteOutlined, LeftOutlined, RightOutlined} from '@ant-design/icons';
import useFiles from '../../../hooks/useFiles.js';

export default function DetailView() {
    const [selectedId, setSelectedId] = useState(localStorage.getItem(SELECTED_KEY) || '0');
    const [pagination] = useState(false);

    const {data, isLoading, refetch} = useFiles(null, null, pagination);


    useEffect(() => {
        localStorage.setItem(SELECTED_KEY, selectedId);
    }, [selectedId]);

    const handleDelete = async (id) => {
        try {
            await filesApi.deleteFile(id);
            message.success({
                content: 'File deleted successfully',
                duration: 4,
            });
            setSelectedId(data[0].id);
            localStorage.setItem(SELECTED_KEY, data[0].id);
            refetch();
        } catch (error) {
            message.error('Failed to delete file');
        }
    };

    const currentIndex = data?.findIndex(f => f.id === selectedId);
    const next = () => setSelectedId(data[Math.min(currentIndex + 1, data.length - 1)]?.id);
    const prev = () => setSelectedId(data[Math.max(currentIndex - 1, 0)]?.id);
    const selectedFile = data?.find(f => f.id === selectedId);
    const itemRender = (_, type, originalElement) => {
        if (type === 'prev') {
            return <a>Previous</a>;
        }
        if (type === 'next') {
            return <a>Next</a>;
        }
        return originalElement;
    };
    return (<AppBase>
            <Row>
                <Col span={6}>
                    <Card title="Files"
                          bodyStyle={{
                              padding: 0,
                              height: '100%',            // make card body occupy full card height
                              display: 'flex',
                              flexDirection: 'column',
                          }}
                          style={{
                              height: '88vh',            // card fixed height (required)
                              padding: 0,
                              overflow: "hidden"
                          }}
                    >
                        <div style={{flex: 1, overflowY: 'auto', padding: 8}}>

                            <List
                                loading={isLoading}
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item

                                        style={{
                                            cursor: 'pointer',
                                            padding: '12px',
                                            background: item.id === selectedId ? '#f5f5f5' : 'transparent'
                                        }}
                                        extra={<div style={{paddingLeft: 10}}><Popconfirm
                                            title="Delete the task"
                                            description="Are you sure to delete this file?"
                                            onConfirm={() => handleDelete(item.id)}
                                            okText="Yes"
                                            cancelText="No"
                                        ><DeleteOutlined style={{color: 'red'}}/></Popconfirm></div>}


                                    >
                                        <List.Item.Meta onClick={() => setSelectedId(item.id)}
                                                        description={item.description}
                                                        title={<a href="#">{item.name}</a>}

                                        />

                                    </List.Item>
                                )}
                            />
                        </div>
                        <Row justify="space-between"
                             style={{width: "100%", position: "absolute", bottom: 0, padding: 10, background: "#fff"}}>
                            <Button onClick={prev} disabled={currentIndex <= 0}><LeftOutlined/></Button>
                            <Typography.Text> {currentIndex + 1} - {data?.length}</Typography.Text>
                            <Button onClick={next} disabled={currentIndex >= data?.length - 1}><RightOutlined/></Button>

                        </Row>
                    </Card>
                </Col>
                <Col span={18} style={{paddingLeft: "8px"}}>
                    <Typography.Title style={{textAlign: "center"}}>{selectedFile?.name}</Typography.Title>
                    <Row justify="space-between" style={{marginBottom: 8}}>
                        <Button onClick={prev} disabled={currentIndex <= 0}><LeftOutlined/></Button>
                        <Typography.Text>Document {currentIndex + 1} / {data?.length}</Typography.Text>
                        <Button onClick={next} disabled={currentIndex >= data?.length - 1}><RightOutlined/></Button>

                    </Row>
                    <Card style={{height: '75vh'}} bodyStyle={{padding: 0, height: "100%"}}>
                        {selectedFile ? (
                            selectedFile.type === 'application/pdf' ? (
                                <iframe src={selectedFile.url} title="PDF Viewer" width="100%" height="100%"/>
                            ) : (
                                <img src={selectedFile.url} alt={selectedFile.name}
                                     style={{maxWidth: '100%', maxHeight: '100%'}}/>
                            )
                        ) : <p>Select a file</p>}
                    </Card>
                </Col>
            </Row>
        </AppBase>
    );
}
