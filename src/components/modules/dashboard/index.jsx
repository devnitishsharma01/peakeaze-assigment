import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {Table, Input, Space, Pagination} from 'antd';
import {PAGE_KEY, SELECTED_KEY} from "../../../constant/dataKey.jsx";
import useFiles from "../../../hooks/useFiles.js";
import FileUpload from "../common/FileUpload.jsx";
import AppBase from "../../base/AppBase.jsx";


export default function Dashboard() {
    const [page, setPage] = useState(parseInt(localStorage.getItem(PAGE_KEY) || '1'));
    const [limit, setLimit] = useState(5);
    const [name_like, onSearch] = useState('');
    const [sortField, setSortField] = useState('uploadedAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const navigate = useNavigate();
    const {data, isLoading, refetch} = useFiles(page, limit, name_like, sortField, sortOrder, true);


    useEffect(() => {
        localStorage.setItem(PAGE_KEY, page);
    }, [page]);


    const handleOpenDetail = (record) => {
        localStorage.setItem(SELECTED_KEY, record.id);
        navigate('/detail');
    };


    const columns = [
        {
            title: 'S.No',
            with: 20,
            render: (_, __, index) => (page - 1) * limit + index + 1
        },
        {
            title: 'File Name',
            dataIndex: 'name',
            sorter: true,
            render: (text, record) => (
                <a onClick={() => handleOpenDetail(record)}>{text}</a>
            )
        },
        {
            title: "Description",
            key: "desc",
            dataIndex: "description"
        },
        {
            title: 'Uploaded Date',
            dataIndex: 'uploadedAt',
            render: (val) => new Date(val).toLocaleString()
        },
        {
            title: 'Uploaded By',
            dataIndex: 'uploadedBy'
        }
    ];

    const handlePagination = (page, pageSize) => {
        setPage(page);
        setLimit(pageSize);
    }

    const onTableChange = (pagination, filters, sorter) => {
        setPage(pagination.current);
        setLimit(pagination.pageSize);
        console.log("sortOrder", sorter)

        if (sorter && sorter.field) {
            setSortField(sorter.field);
            setSortOrder(sorter.order === 'ascend' ? 'asc' : sorter.order === 'descend' ? 'desc' : 'desc');
        } else {
            setSortField('uploadedAt');
            setSortOrder('desc');
        }
    };


    return (
        <AppBase>
            <Space style={{marginBottom: 16}}>
                <Input.Search placeholder="Search file" onSearch={() => refetch()}
                              onChange={(e) => onSearch(e.target.value)}/>
                <FileUpload onUploaded={refetch}/>
            </Space>
                <Table
                    columns={columns}
                    loading={isLoading}
                    dataSource={data?.data || []}
                    // scroll={{ y: 55 * 5 }}
                    pagination={false}
                    rowKey="id"
                    onChange={onTableChange}
                />

                <div style={{display: "flex", justifyContent: "end", paddingTop: "15px"}}>
                    <Pagination defaultPageSize={limit} onChange={handlePagination} pageSizeOptions={[5, 10, 15, 20]}
                                showSizeChanger={true} defaultCurrent={data?.first} total={data?.items}/>
                </div>
        </AppBase>
    );
}