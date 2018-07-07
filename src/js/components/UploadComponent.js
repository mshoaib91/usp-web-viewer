import React from 'react';
import { Upload, Icon, message } from 'antd';


const Dragger = Upload.Dragger;

const DraggerProps = {
  name: 'file',
  multiple: false,
  beforeUpload(file) {
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = (evt) => {
      console.log(evt);
    }
    return false;
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
