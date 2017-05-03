
var Report = require("../report");

class TolerantHtmlASTReport extends Report{
  constructor(config){
    super({success: config.success, name:"tolerant-html-ast"});
    this.ast = config.ast;
  }

}

module.exports = TolerantHtmlASTReport;
