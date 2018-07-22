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
      let nameArray = [];
      for (var file in zipContents.files) {
        if(file.match((/\.obj\b/)).length) {
          promiseArray.push(zip.file(file).async("arraybuffer"));
          nameArray.push(file);
        }
      }
      return {promiseArray: Promise.all(promiseArray), nameArray} 
    }).then((arraysObj) => {
      return new Promise((resolve, reject) => {
        let {promiseArray, nameArray} = arraysObj;
        promiseArray.then(objBufferArr => {
          resolve({objBufferArr, nameArray});
        });
      })
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
}

export default FileProcessor;