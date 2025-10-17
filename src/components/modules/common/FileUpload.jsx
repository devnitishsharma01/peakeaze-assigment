import React, {useState} from 'react';
import {Modal, Upload, Button, message, Spin} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import {addFileMetadata} from '../../../api/filesApi.js';


const FileUpload = ({onUploaded}) => {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleUpload = async () => {
        if (!file) return message.warning('Select a file first!');
        setLoading(true);
        const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;

        const meta = {
            name: file.name.substring(0, file.name.lastIndexOf('.')) || file.name,
            type: file.type,
            url: URL.createObjectURL(file),
            uploadedBy: 'You',
            uploadedAt: new Date().toISOString(),
            description: `File "${nameWithoutExt}" uploaded successfully!`
        };


        await addFileMetadata(meta);
        setLoading(false);
        message.success('File uploaded!');
        setOpen(false);
        setFile(null);
        onUploaded();
    };


    return (
        <div>
            <Button type="primary" icon={<UploadOutlined/>} onClick={() => setOpen(true)}>
                Upload File
            </Button>
            <Modal
                key={open + "1"}
                open={open}
                title="Upload File"
                onCancel={() => setOpen(false)}
                onOk={handleUpload}
            >
                <Spin spinning={loading}>
                    <Upload accept="application/pdf,image/*" beforeUpload={(f) => {
                        setFile(f);
                        return false;
                    }} maxCount={1}>
                        <Button icon={<UploadOutlined/>}>Select PDF/Image</Button>
                    </Upload>
                </Spin>
            </Modal>
        </div>
    );
}

export default FileUpload