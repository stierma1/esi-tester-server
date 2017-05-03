
var Message = require("../message");

class TestMessage extends Message{
  constructor(config){
    super(config);
    this.generateNext();
    this.onlyFullReportOnFailure = this.initialBody.onlyFullReportOnFailure;
  }

  generateNext(){
    var next = [];
    if(this.initialBody.all){
      next = ["preprocess", "validate", "htmlAST"]
      this.next = next;
      return;
    }

    if(this.initialBody.preprocess){
      this.next.push("preprocess");
    }

    if(this.initialBody.validate){
      this.next.push("validate");
    }

    if(this.initialBody.htmlAST){
      this.next.push("htmlAST");
    }

    if(this.initialBody.tolerant){
      this.next = this.next.map((action) => {
        switch(action){
          case "validate": return "tolerantValidate";
          case "htmlAST": return "tolerantHtmlAST";
          default: return action;
        }
      });
    }
  }
}

module.exports = TestMessage;
