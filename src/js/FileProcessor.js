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
      let promiseArray = new Array(3);
      let nameArray = new Array(3);
      for (var file in zipContents.files) {
        if(file.match((/\.obj\b/)).length) {
          promiseArray[0] = (zip.file(file).async("arraybuffer"));
          nameArray[0] = (file);
        }
        else if(file.match(/\.mlt\b/).length) {
          promiseArray[1] = (zip.file(file).async("arraybuffer"));
          nameArray[1] = (file);
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
    }).then((buffersObj) => {
      let contents = {
        obj : {
          buffer: null,
          name : null,
        },
        mlt : {
          buffer : null,
          name : null,
        },
      };
      let {objBufferArr, nameArray} = buffersObj;
      objBufferArr.forEach((element, index) => {
        if(index === 0) {
          contents.obj.buffer = element;
          contents.obj.name = nameArray[index];
        } else if (index === 1) {
          contents.mlt.buffer = element;
          contents.mlt.name = nameArray[index];
        }
      });
      return contents;
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