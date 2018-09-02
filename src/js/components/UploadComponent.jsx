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
    })
    .catch(ex => console.error(ex));
    return false;
  },  
};

/**
 * Extract the file contents from the object and load it to the scene
 * 
 * @param {Object} zipContents - looks like  `[{name: name, content: {obj: buffer, mtl: buffer, info: string}}, {name:name, content:{obj: buffer, mtl: buffer, info: string}}]`
 */
async function loadModels (zipContents) {
  // first load Main model and then load sub models
  const mainFileObj = zipContents.filter(fileObj => fileObj.name.indexOf('main') > -1);
  const subFilesObj = zipContents.filter(fileObj => fileObj.name.indexOf('main') < 0);
  console.log(zipContents);

  let mainObj = mainFileObj[0].content.obj;
  let mainMtl = mainFileObj[0].content.mtl;
  let info = mainFileObj[0].content.info;
  let name = mainFileObj[0].name;
  // loading main Object3D file and its information
  let mainModelContainer = await loadFileToScene(mainObj, mainMtl, name, info, null);
  // loading sub Object3S files that belongs to main file
  let promsiseArr = [];
  subFilesObj.forEach(element => {
    let subObj = element.content.obj;
    let subMtl = element.content.mtl;
    let info = element.content.info;
    let name = element.name;
    promsiseArr.push(loadFileToScene(subObj, subMtl, name, null, mainModelContainer));
  });
  promsiseArr.then(obj => {
    console.log('models loaded', obj);
  })
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
async function loadFileToScene(objFile, mtlFile, name, infoObj, mainModelContainer) {
  const sc = new SceneCreator();    // get instance of SceneCreator Object
  let mainModelContainerObj = null;
  if (mtlFile === null || mtlFile === undefined) {
    let obj3D = await sc.LoadModel(objFile);
    obj3D.name = name;
    if(!mainModelContainer) {
      mainModelContainerObj = sc.addObjToScene(obj3D, infoObj);
    } else {
      sc.addSubObjectToScene(obj3D, mainModelContainer);
    }
  } else {
    let obj3D = await sc.LoadModelAndMtl(objFile, mtlFile);
    obj3D = setNameAndMtls(obj3D, name);
    if(!mainModelContainer) {
      mainModelContainerObj = sc.addObjToScene(obj3D, infoObj);
    } else {
      sc.addSubObjectToScene(obj3D, mainModelContainer);
    }
  }
  return mainModelContainerObj;
}

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
