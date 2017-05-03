
var Report = require("../report");

class PreprocessReport extends Report{
  constructor(config){
    super({success: config.success, name:"preprocess"});
    this.preprocess = config.preprocess;
  }

}

module.exports = PreprocessReport;
