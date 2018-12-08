import React from 'react';
import { Upload, Icon } from 'antd';
import FileProcessor from '../FileProcessor';
import { loadModels } from '../ModelLoader';

const Dragger = Upload.Dragger;

const DraggerProps = {
  name: 'file',
  multiple: false,
  showUploadList: false,
  beforeUpload(file) {
    let fileProcessor = new FileProcessor();
    //fileProcessor.readZip(file)
    fileProcessor.readZipProject(file)
    .then(zipContents => {
      zipContents.forEach(models => {
        loadModels(models);
      });
    })
    .catch(ex => console.error(ex));
    return false;
  },  
};

/**
 * Main Jsx component
 * 
 * @param {ReactComponent} props 
 */
export const UploadComponent = (props) => {
  return (
    <div>
      <Dragger {...DraggerProps}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">Please use <i>.zip</i> files containing the object file</p>
      </Dragger>
  </div>
  );
}
