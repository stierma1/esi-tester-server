
var Report = require("../report");

class HtmlASTReport extends Report{
  constructor(config){
    super({success: config.success, name:"html-ast"});
    this.ast = config.ast;
  }

}

module.exports = HtmlASTReport;
