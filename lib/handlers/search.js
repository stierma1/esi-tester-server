var esiParsers = require("esi-tester");

var EsiSearch = require("../searches/esi");
var HtmlSearch = require("../searches/html");
var SearchMessage = require("../messages/search-message");

module.exports = function(req, res, next) {
    try {
        var messages = [];
        for (var i in req.body.urls) {
            var tMess = new SearchMessage(req.body);
            tMess.url = req.body.urls[i];
            tMess.data = req.body.datas[i];
            tMess.reports = [];
            tMess.next = tMess.next.concat([]);
            messages.push(tMess);
        }

        for (var i in messages) {
            processMessage(messages[i]);
        }

        res.body = messages.map((message) => {
            return {
                url: message.url,
                reports: message.reports
            };
        });
        next();
    } catch (err) {
        next(err)
    }
}

function processMessage(message){
  var ast = null;
  while(message.next.length > 0){
    var action = message.next.shift();

    if(action === "search"){
      search(message, ast);
    }
    if(action === "htmlAST"){
      ast = htmlAst(message);
    }
    if(action === "tolerantHtmlAST"){
      ast = tolerantHtmlAst(message);
    }
  }
}

function htmlAst(message){
  var ast = esiParsers.HTML_AST(message.data);
  //message.reports.push(new Reports.HtmlASTReport({success:true, ast:ast}));
  return ast;
}

function tolerantHtmlAST(message){
  var ast = esiParsers.TOLERANT_HTML_AST(message.data);
  //message.reports.push(new Reports.TolerantHtmlASTReport({success:true, ast:ast}));
  return ast;
}

function search(message, ast){
  var searchAlg = null;
  if(message.searchType === "esi"){
    searchAlg = new EsiSearch(message)
  } else {
    searchAlg = new HtmlSearch(message)
  }

  var extract = searchAlg.extract(ast);

  message.reports.push({success:true, tags:extract});
}
