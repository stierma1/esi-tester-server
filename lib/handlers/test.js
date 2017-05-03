var esiParsers = require("esi-tester");
var fetchData = require("./fetch-data");
var Reports = require("../reports");
var TestMessage = require("../messages/test-message");

module.exports = function(req, res, next){
  try{


  var messages = [];
  for(var i in req.body.urls){
    var tMess = new TestMessage(req.body);
    tMess.url = req.body.urls[i];
    tMess.data = req.body.datas[i];
    tMess.reports = [];
    tMess.next = tMess.next.concat([]);
    messages.push(tMess);
  }

  for(var i in messages){
    processMessage(messages[i]);
  }

  res.body = messages.map((message) => {
    return {url: message.url, reports:message.reports};
  });
  next();
}catch(err){
  next(err)
}
}

function processMessage(message){
  while(message.next.length >= 0){
    var action = message.next.shift();
    if(action === "preprocess"){
      preprocess(message);
    }
    if(action === "validate"){
      validate(message);
    }
    if(action === "tolerant-validate"){
      tolerantValidate(message);
    }
    if(action === "htmlAST"){
      htmlAst(message);
    }
    if(action === "tolerantHtmlAST"){
      tolerantHtmlAst(message);
    }

  }
}

function preprocess(message){
  var preprocess = esiParsers.preprocessor(message.data);
  message.reports.push(new Reports.PreprocessReport({success:true, preprocess:preprocess}));
}

function validate(message){
  try{
    esiParsers.VALIDATOR(message.data);
    message.reports.push(new Reports.ValidateReport({valid:true}));
  }catch(err){
    message.reports.push(new Reports.ValidateReport({valid:false, error:err.message}));
  }
}

function tolerantValidate(message){
  try{
    esiParsers.TOLERANT_VALIDATOR(message.data);
    message.reports.push(new Reports.TolerantValidateReport({valid:true}));
  }catch(err){
    message.reports.push(new Reports.TolerantValidateReport({valid:false, error:err.message}));
  }
}

function htmlAst(message){
  var ast = esiParsers.HTML_AST(message.data);
  message.reports.push(new Reports.HtmlASTReport({success:true, ast:ast}));
}

function tolerantHtmlAST(message){
  var ast = esiParsers.TOLERANT_HTML_AST(message.data);
  message.reports.push(new Reports.TolerantHtmlASTReport({success:true, ast:ast}));
}
