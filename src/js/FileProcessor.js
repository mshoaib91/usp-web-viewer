/** created by shoaib khan on 07.07.2018 */

import JSZip from 'jszip';

/**
 * This class processes the uploaded zip file,
 * extract the obj file from it and return it
 */
class FileProcessor {
  
  readZip(zipFile) {
    let zip = new JSZip();
    this.readFile(zipFile)
    .then((buffer) => {
      return zip.loadAsync(buffer)
    })
    .then((zipContents) => {
      console.log(zipContents);
      for (var file in zipContents.files) {
        if(file.match((/\.obj\b/)).length) {
          zip.file(file).async("string").then((content) => {console.log(content)}).catch(err => console.error(err));
        }
      } 
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