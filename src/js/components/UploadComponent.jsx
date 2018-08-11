import React from 'react';
import { Upload, Icon } from 'antd';
import FileProcessor from '../FileProcessor';
import SceneCreator from '../SceneCreator';


const Dragger = Upload.Dragger;

const DraggerProps = {
  name: 'file',
  multiple: false,
  showUploadList: false,
  beforeUpload(file) {
    let fileProcessor = new FileProcessor();
    fileProcessor.readZip(file)
    .then(zipContents => {
      let objBuffer = zipContents.obj.buffer;
      let fileName = zipContents.obj.name;
      let objFile = new File([objBuffer], fileName);
      const objFileUrl = URL.createObjectURL(objFile);
      const sc = new SceneCreator();
      sc.LoadModel(objFileUrl)
      .then(obj => {
        obj.name = fileName;
        sc.addObjToScene(obj);
      })
      .catch(err => console.error(err));
    })
    return false;
  },
  
};

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
