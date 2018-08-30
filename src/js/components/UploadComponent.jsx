import React from 'react';
import { Upload, Icon } from 'antd';
import FileProcessor from '../FileProcessor';
import SceneCreator from '../SceneCreator';
import { setNameAndMtls } from '../ThreeMain';


const Dragger = Upload.Dragger;

const DraggerProps = {
  name: 'file',
  multiple: false,
  showUploadList: false,
  beforeUpload(file) {
    let fileProcessor = new FileProcessor();
    fileProcessor.readZip(file)
    .then(zipContents => {
      console.log(zipContents);
      const objBuffer = zipContents.obj.buffer;
      const fileName = zipContents.obj.name;
      const objFile = new File([objBuffer], fileName);
      const objFileUrl = URL.createObjectURL(objFile);
      const mtlBuffer = zipContents.mtl.buffer;
      const mtlName = zipContents.mtl.name;
      const modelData = JSON.parse(zipContents.details.fileContent);
      const sc = new SceneCreator();
      if (mtlBuffer === null) {
        sc.LoadModel(objFileUrl)
        .then(obj => {
          obj.name = fileName;
          sc.addObjToScene(obj, modelData);
        })
        .catch(err => console.error(err));
      } else {
        let mtlFile = new File([mtlBuffer], mtlName);
        const mtlFileUrl = URL.createObjectURL(mtlFile);
        sc.LoadModelAndMtl(objFileUrl, mtlFileUrl)
        .then((obj) => {
          obj = setNameAndMtls(obj, fileName);
          sc.addObjToScene(obj, modelData);
        })
        .catch(err => console.error(err))

      }
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
