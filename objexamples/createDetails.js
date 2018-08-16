var fs = require('fs');

fs.readFile('sample_rot.obj', 'utf8', (err, data) => {
  var lines = data.split('\n');
  var newlines = lines.filter((line) => {
    return !!(line.match(/^(o )/) !== null);
  });
  var ids = newlines.map(line => {
    return line.trim().split('o ')[1];
  })
  var obj = {};
  ids.forEach(e => {
      const len = Math.round(Math.random()*100);
      const width = Math.round(Math.random()*100);
      const height = Math.round(Math.random()*100);
    obj[e] = {
      len,
      width,
      height,
      area : len * width * height
    }
  })
  fs.writeFile("sample_obj_rote_nfo.json", JSON.stringify(obj), 'utf8', (err) => {
    if(err) console.error(err)
  });
});