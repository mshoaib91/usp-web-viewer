/**
 * (Singleton) class for accessing resource on the server
 */
export default class APIService {
  
  constructor() {}

  getDefaultModel() {
    let url = window.location.search;
    let modelPath = ''
    if(window.location.search) {
      let modelurl = window.location.search.split('?')[1].split('&').filter((e) => {return e.includes('model')});
      modelPath = modelurl[0].split('=')[1];
      console.log('modelPath', modelPath);
    }
    return modelPath;
  }

  getModelFromServer() {
    const modelPath = this.getDefaultModel();
    if(!modelPath)
      return false;
    let url = '/' + modelPath;
    fetch(url)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }

}