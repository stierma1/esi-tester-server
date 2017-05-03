var search = require("./search");

class EsiSearch{
  constructor(config){
    this.searchTags = config.searchTags || [];
    this.all = false;
    if(this.searchTags.length === 0){
      this.all = true;
    }
    this.message = config.message;
  }

  extract(ast){
    return search(ast, [], this._extract);
  }

  _extract(type, ast, list, attributes){
    if(type === "ESI_ELEMENT"){
      if(this.all){
        list.push({
          esiTag:ast.esiTag,
          attributes:attributes
        });
        return;
      }
      if(this.searchTags.indexOf(ast.esiTag) >= 0){
        list.push({
          esiTag:ast.esiTag,
          attributes:attributes
        });
      }
    }
  }
}

module.exports = EsiSearch;
