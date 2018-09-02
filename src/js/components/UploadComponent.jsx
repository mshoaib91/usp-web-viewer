import React from 'react';
import { Upload, Icon } from 'antd';
import FileProcessor from '../FileProcessor';
import SceneCreator from '../SceneCreator';
import { setNameAndMtls } from '../ThreeMain';
import ModelContainer from '../ModelContainer';


const Dragger = Upload.Dragger;

const DraggerProps = {
  name: 'file',
  multiple: false,
  showUploadList: false,
  beforeUpload(file) {
    let fileProcessor = new FileProcessor();
    fileProcessor.readZip(file)
    .then(zipContents => {
      loadModels(zipContents);
      return;
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

/**
 * Extract the file contents from the object and load it to the scene
 * 
 * @param {Object} zipContents 
 */
function loadModels (zipContents) {
  // first load Main model and then load sub models
  const mainFileObj = zipContents.filter(fileObj => fileObj.name.indexOf('main') > -1);
  const subFilesObj = zipContents.filter(fileObj => fileObj.name.indexOf('main') < 0);
  console.log(zipContents);
  console.log('mainFile', mainFileObj);
  console.log('subfiles', subFilesObj);

  let mainObj = mainFileObj[0].content.obj;
  let mainMtl = mainFileObj[0].content.mtl;
  let info = mainFileObj[0].content.info;
  let name = mainFileObj[0].name;
  
  let mainModelContainer = loadFileToScene(mainObj, mainMtl, name, info, null);
}


/**
 * @private
 * Load `.obj` files as a THREE.Object3D model and add it to the scene
 * as either main model or sub model of the main model
 *  
 * @param {File} objFile - file referencing `.obj` file 
 * @param {File} mtlFile - file referencing `.mtl` file 
 * @param {string} name - name of the obj
 * @param {Object} infoObj - Object containing information related to polygons and graphs 
 * @param {ModelContainer|null} mainModelContainer - ModelContainer object containing the main Object3D model 
 * @returns {ModelContainer|null} - returns the `ModelContainer` object of main model or null in case of submodel is added
 */
function loadFileToScene(objFile, mtlFile, name, infoObj, mainModelContainer) {
  const sc = new SceneCreator();    // get instance of SceneCreator Object
  let mainModelContainerObj = null;
  if (mtlFile === null || mtlFile === undefined) {
    sc.LoadModel(objFile)
    .then(obj3D => {
      obj3D.name = name;
      if(!mainModelContainer && mainModelContainer !== null) {
        sc.addSubObjectToScene(obj3D, mainModelContainer);
      } else {
        mainModelContainerObj = sc.addObjToScene(obj3D, infoObj);
      }
    })
    .catch(err => console.error(err));
  } else {
    sc.LoadModelAndMtl(objFile, mtlFile)
    .then((obj3D) => {
      obj3D = setNameAndMtls(obj3D, name);
      if(!mainModelContainer && mainModelContainer !== null) {
        sc.addSubObjectToScene(obj3D, mainModelContainer);
      } else {
        mainModelContainerObj = sc.addObjToScene(obj3D, infoObj);
      }
    })
    .catch(err => console.error(err))
  }
  return mainModelContainerObj
}

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
