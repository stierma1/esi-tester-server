
class Message{
  constructor(config){
    this.initialPath = config.initialPath;
    this.initialBody = config.initialBody;
    this.urls = config.initialBody.urls || [];
    this.datas = config.datas || [];
    this.reports = config.reports || [];
    this.handlerResults = config.handlerResults || [];
    this.next = config.next || [];
    this.error = config.error || null;
  }

}

module.exports = Message;
