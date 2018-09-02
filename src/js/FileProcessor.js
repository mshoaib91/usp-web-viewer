/** created by shoaib khan on 07.07.2018 */

import JSZip from 'jszip';

/**
 * This class processes the uploaded zip file,
 * extract the obj file from it and return it
 */
class FileProcessor {
  
  /**
   * Reads a zip file and get .Obj files from it
   * @param {File} zipFile
   * @returns {Promise<ArrayBuffer[]>}
   */
  readZip(zipFile) {
    let zip = new JSZip();
    return this.readFile(zipFile)
    .then((buffer) => {
      return zip.loadAsync(buffer)
    })
    .then((zipContents) => {
      let promiseArray = [];
      //let nameArray = new Array(3);
      let files = {}
      for (var file in zipContents.files) {
        if(file.match((/\.obj\b/)) !== null) {
          var arrayPos = promiseArray.push(zip.file(file).async("arraybuffer"));
          const name = file.split('.obj')[0];
          this.addFiles(files, name, 'obj', arrayPos - 1);
        }
        else if(file.match(/\.mtl\b/) !== null) {
          var arrayPos = promiseArray.push(zip.file(file).async("arraybuffer"));
          const name = file.split('.mtl')[0];
          this.addFiles(files, name, 'mtl', arrayPos - 1);
        }
        else if (file.match(/(\.info\.json){1}$/) !== null) {
          var arrayPos = promiseArray.push(zip.file(file).async("string"));
          const name = file.split('.info.json')[0];
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
        let content = {
          name: fileName,
          content: fileStructure[fileName]
        }
        files.push(content);
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
      let reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = (evt) => {
        let buffer = evt.target.result;
        resolve(buffer);
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