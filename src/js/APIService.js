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

  /**
   * Load the initial model from the server if the path is provided in the query parameters of the url
   * for example: http://localhost:8080/?model=objexamples/Project.zip
   *
   * @returns {File} - File object that contains the zip content loaded from the server 
   */
  getModelFromServer() {
    const modelPath = this.getDefaultModel();
    if(!modelPath)
      return false;
    let filename = modelPath.split('/').filter(e => e.includes('.zip'))[0];
    let url = '/' + modelPath;
    return fetch(url)
    .then((res) => {
      return res.body;
    })
    .then(body => {
      const reader = body.getReader();
      return new ReadableStream({
        async start(controller) {
          while (true) {
            const { done, value } = await reader.read();
            // When no more data needs to be consumed, break the reading
            if (done) {
              break;
            }
            // Enqueue the next data chunk into our target stream
            controller.enqueue(value);
          }
          // Close the stream
          controller.close();
          reader.releaseLock();
        }
      })
    })
    .then(rs => new Response(rs))
    .then(response => response.blob())
    .then(blob => new File([blob], filename))
    .catch((err) => {
      console.error(err);
    })
  }

}