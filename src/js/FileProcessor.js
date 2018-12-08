/** created by shoaib khan on 07.07.2018 */

import JSZip from 'jszip';
import { ModelLoaderStructure } from './ModelLoader';

/**
 * This class processes the uploaded zip file,
 * extract the obj file from it and return it
 */
class FileProcessor {

  readZipProject(zipFile) {
    let zip = new JSZip();
    return this.readFile(zipFile)
    .then((buffer) => {
      return zip.loadAsync(buffer);
    })
    .then((zipContents) => {
      console.log(zipContents);
      const contents = zipContents.files;
      const contentFiles = Object.values(contents).filter((f) => {
        return !f.dir
      });
      return contentFiles;
    })
    .then((contentFiles) => {
      const regexp = /(\.zip)$/g
      const zipFiles = contentFiles.filter((file) => {
        return regexp.test(file.name);
      });
      this.contentFiles = contentFiles;
      return zipFiles;
    })
    .then((zipFiles) => {
      const promiseArray = [];
      zipFiles.forEach(file => {
        promiseArray.push(file.async("arraybuffer"));
      });
      return Promise.all(promiseArray);
    })
    .then((zipFiles) => {
      if(zipFiles.length) {   // if there are zip files inside main zip file
        let promiseArray = [];
        zipFiles.forEach(file => {
          let promise = this.readZip(file);
          promiseArray.push(promise);
        });
        return Promise.all(promiseArray);
      } else if(this.contentFiles && this.contentFiles.length) {    // there are files but no zips so read normally as one file
        var files = [];
        return this.readZip(zipFile)
        .then((modelLoaderStruct) => {
          files.push(modelLoaderStruct);
          return files;
        });
      } else {
        throw new Error("seems like zip is empty");
      }
    })
  }

  /**
   * Reads a zip file and get .Obj files from it
   * @param {File} zipFile
   * @returns {Promise<ModelLoaderStructure[]>}
   */
  readZip(zipFile) {
    let zip = new JSZip();
    return this.readFile(zipFile)
    .then((buffer) => {
      return zip.loadAsync(buffer)
    })
    .then((zipContents) => {
      const contents = zipContents.files;
      const contentFiles = Object.values(contents).filter((f) => {
        return !f.dir
      });
      let promiseArray = [];
      //let nameArray = new Array(3);
      let files = {}
      for (var file of contentFiles) {
        if(file.name.match((/\.obj\b/)) !== null) {
          var arrayPos = promiseArray.push(zip.file(file.name).async("arraybuffer"));
          const name = file.name.split('.obj')[0];
          this.addFiles(files, name, 'obj', arrayPos - 1);
        }
        else if(file.name.match(/\.mtl\b/) !== null) {
          var arrayPos = promiseArray.push(zip.file(file.name).async("arraybuffer"));
          const name = file.name.split('.mtl')[0];
          this.addFiles(files, name, 'mtl', arrayPos - 1);
        }
        else if (file.name.match(/(\.info\.json){1}$/) !== null) {
          var arrayPos = promiseArray.push(zip.file(file.name).async("string"));
          const name = file.name.split('.info.json')[0];
          this.addFiles(files, name, 'info', arrayPos - 1);
        }
      }
      return {promiseArray: Promise.all(promiseArray), files} 
    }).then((arraysObj) => {
      return new Promise((resolve, reject) => {
        let {promiseArray, files} = arraysObj;
        promiseArray
        .then(objBufferArr => {
          resolve({objBufferArr, files});
        })
        .catch(ex => reject(ex));
      })
    }).then((buffersObj) => {
      let {objBufferArr, files} = buffersObj;
      // assigning back the objects their respective buffers from the array of buffers based on the index saved early
      for(var fileName in files) {
        const fileDetails = files[fileName]
        for (var type in fileDetails) {
          const arrIndex = fileDetails[type];
          fileDetails[type] = objBufferArr[arrIndex];
        }
      }
      return files;
    })
    .then((fileStructure) => {
      // fileStructure looks like {name: {obj: buffer, mtl: buffer, info: string}, name:{{obj: buffer, mtl: buffer, info: string}}}
      for(var names in fileStructure) {
        let bufferObj = fileStructure[names];
        for(var type in bufferObj) { // types : mtl, obj, info
          let buffer = bufferObj[type];
          if(type === 'info') {
            bufferObj[type] = JSON.parse(buffer);
          } else {
            const objFile = new File([buffer], names + '.' + type);
            const objFileUrl = URL.createObjectURL(objFile);
            bufferObj[type] = objFileUrl;
          }
        }
      }
      return fileStructure;
    })
    .then((fileStructure) => {
      // converting object to array
      let files = []
      for (var fileName in fileStructure) {
        let content = fileStructure[fileName];
        let modelLoaderStructure = new ModelLoaderStructure(fileName, content.obj, content.mtl, content.info);
        files.push(modelLoaderStructure);
      }
      return files;
    })
    .catch(err => {
      console.error(err);
    })
  }

  /**
   * Reads the file using html5 FileReader API
   * @param {File} file
   * @returns {Promise<buffer>} 
   */
  readFile(file) {
    return new Promise((resolve, reject) => {
      if (file.constructor.name === "ArrayBuffer") {
        resolve(file);
      } else {
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = (evt) => {
          let buffer = evt.target.result;
          resolve(buffer);
        }
      }
    });
  }

  addFiles(obj, fileName, fileType, content) {
    if(!obj[fileName]) {
      obj[fileName] = {}
      obj[fileName][fileType] = content;
    }else {
      obj[fileName][fileType] = content;
    } 
  }
}

export default FileProcessor;