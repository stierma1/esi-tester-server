var express = require("express");
var bodyParser = require("body-parser");
var TestMessage = require("./messages/test-message");
var SearchMessage = require("./messages/search-message");
var testHandler = require("./handlers/test");
var searchHandler = require("./handlers/search");
var fetch = require("./handlers/fetch-data");
var app = express();
var request = require("request");

app.post("/test", bodyParser.json("100kb"), function(req, res, next){
  req.body = new TestMessage({initialPath: "/test", initialBody:req.body});
  Promise.all(req.body.urls.map((url) => {
    return fetch(url);
  })).then((datas) => {
    req.body.datas = datas;
    next();
  }).catch(next);
}, testHandler, function(req, res){
  res.status(200).send(res.body);
});

app.post("/search", bodyParser.json("100kb"), function(req, res, next){
  req.body = new SearchMessage({initialPath: "/search",initialBody:req.body});
  Promise.all(req.body.urls.map((url) => {
    return fetch(url);
  })).then((datas) => {
    req.body.datas = datas;
    next();
  }).catch(next);
}, searchHandler, function(req, res){
  res.status(200).send(res.body);
});

app.listen(3001);

setTimeout(() => {
  request({url:"http://localhost:3001/search", method:"POST", json: {
    urls:["http://www.facebook.com"],
    all:false,
    searchType:"html",
    searchTags: ["a"]
  }}, function(err, resp, body){
    console.log(err, body[0].reports[0].tags);
    body[0].reports[0].tags.map(function(tag){
      console.log(tag.htmlTag, tag.attributes)
    })
  })
}, 1000)
