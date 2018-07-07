/** created by shoaib khan on 07.07.2018 */

import JSZip from 'jszip';

/**
 * This class processes the uploaded zip file,
 * extract the obj file from it and return it
 */
class FileProcessor {
  
  readZip(zipFile) {
    this.readFile(zipFile)
    .then((buffer) => {
      let zip = new JSZip();
      return zip.loadAsync(buffer)
    })
    .then((zip) => {
      console.log('response from jszip');
      console.log(zip);
    })
    .catch(err => {
      console.error(err);
    })
  }

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