
function search(ast, list, cb){
  if(ast.type === "ROOT"){
    rootHandler(ast, list, cb);
  }
  if(ast.type === "HTML_ELEMENTS"){
    htmlElementsHandler(ast, list, cb)
  }
  if(ast.type === "HTML_ELEMENT"){
    htmlElementHandler(ast, list, cb)
  }
  if(ast.type === "ESI_ELEMENTS"){
    esiElementsHandler(ast, list, cb)
  }
  if(ast.type === "ESI_ELEMENT"){
    esiElementHandler(ast, list, cb)
  }
  return list;
}

function rootHandler(ast, list, cb){
  cb(ast.type, ast, list);
  search(ast.inner, list, cb);
}

function htmlElementHandler(ast, list, cb){
  cb(ast.type, ast, list, ast.headTag.attributes);
  search(ast.inner, list, cb);
}

function htmlElementsHandler(ast, list, cb){
  cb(ast.type, ast, list);
  for(var i in ast.elements){
    search(ast.elements[i], list, cb);
  }
}

function esiElementHandler(ast, list, cb){
  cb(ast.type, ast, list, ast.headTag.attributes);
  search(ast.inner, list, cb);
}

function esiElementsHandler(ast, list, cb){
  cb(ast.type, ast, list);
  for(var i in ast.elements){
    search(ast.elements[i], list, cb);
  }
}

module.exports = search;
