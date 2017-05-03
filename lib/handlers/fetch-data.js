var request = require("request");

module.exports = function(url){

  return new Promise((res, rej) => {
    request({
      url:url,
      method:"get",
      headers:{
        "User-Agent": "curl/7.43.0",
        "Accept": "*/*"
      }
    },
    function(err, resp, body){
      if(err || resp.statusCode >= 400){
        rej(err || resp.statusCode);
        return;
      }
      res(body);
    });
  });
}
