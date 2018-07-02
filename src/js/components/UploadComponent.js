import React from 'react';
import { Upload, Icon, message } from 'antd';

const Dragger = Upload.Dragger;

const DraggerProps = {
  name: 'file',
  multiple: false,
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export const UploadComponent = (props) => {
  return (
    <Dragger {...DraggerProps}>
    <p className="ant-upload-drag-icon">
      <Icon type="inbox" />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">Please use <i>.zip</i> files containing the object file</p>
  </Dragger>
  );
}
