
var Report = require("../report");

class ValidateReport extends Report{
  constructor(config){
    super({success: config.valid, name:"validate"});
    this.valid = config.valid;
    this.error = config.error;
  }

}

module.exports = ValidateReport;
