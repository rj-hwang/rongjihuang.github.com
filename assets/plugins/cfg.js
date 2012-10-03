var cfg = {};
cfg.getFN = function( fnName ){
  console.log("getFN: "+fnName);
  if(typeof fnName == "function") return fnName;
  try{
    if(fnName){
      var names = fnName.split(".");
      var result = window[names[0]];
      for(var i=1;i<names.length;i++)
        result = result[names[i]];
      return result;
    }else{
      return null;
    }
  }catch(e){
    console.log("error get:" + fnName + ";e=" + e);
    return null;
  }
};