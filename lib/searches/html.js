var search = require("./search");

class HTMLSearch{
  constructor(config){
    this.searchTags = config.searchTags || [];
    this.all = false;
    if(this.searchTags.length === 0){
      this.all = true;
    }
    this.message = config.message;
  }

  extract(ast){
    return search(ast, [], this._extract.bind(this));
  }

  _extract(type, ast, list, attributes){
    if(type === "HTML_ELEMENT"){
      if(this.all){
        list.push({
          htmlTag:ast.htmlTag,
          attributes:attributes
        })
        return;
      }
      if(this.searchTags.indexOf(ast.htmlTag) >= 0){
        list.push({
          htmlTag:ast.htmlTag,
          attributes:attributes
        })
      }
    }
  }
}

module.exports = HTMLSearch;
