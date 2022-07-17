const Blob = require("buffer").Blob;

// https://stackoverflow.com/a/38659875/19564350
function base64ImageToBlob(str) {
    // extract content type and base64 payload from original string
    var pos = str.indexOf(';base64,');
    var type = str.substring(5, pos);
    var b64 = str.substr(pos + 8);
  
    // decode base64
    var imageContent = atob(b64);
  
    // create an ArrayBuffer and a view (as unsigned 8-bit)
    var buffer = new ArrayBuffer(imageContent.length);
    var view = new Uint8Array(buffer);
  
    // fill the view, using the decoded base64
    for(var n = 0; n < imageContent.length; n++) {
      view[n] = imageContent.charCodeAt(n);
    }
  
    // convert ArrayBuffer to Blob
    var blob = new Blob([buffer], { type: type });
  
    return blob;
  }

module.exports = {
    base64ImageToBlob
}
