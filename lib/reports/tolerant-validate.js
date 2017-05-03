
var Report = require("../report");

class TolerantValidateReport extends Report{
  constructor(config){
    super({success: config.valid, name:"tolerant-validate"});
    this.valid = config.valid;
    this.error = config.error;
  }

}

module.exports = TolerantValidateReport;
