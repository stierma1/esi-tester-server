
var Message = require("../message");

class SearchMessage extends Message{
  constructor(config){
    super(config);
    this.generateNext();
    this.searchType = config.initialBody.searchType;
    this.searchTags = config.initialBody.searchTags;
  }

  generateNext(){
    var next = [];
    this.next = ["preprocess", "htmlAST", "search"]

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

module.exports = SearchMessage;
