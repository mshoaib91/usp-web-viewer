/** created by shoaib khan on 07.07.2018 */

/**
 * This class processes the uploaded zip file,
 * extract the obj file from it and return it
 */
class FileProcessor {
  
  readZip(zipFile) {
    this.readFile(zipFile)
    .then((buffer) => {
      console.log('buffer of the file');
      console.log(buffer);
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