function getQueries(obj) {
  var data, d, query, q, rtn, i, x, j, y;
  
  rtn = [];
  if(Array.isArray(obj)!==false) {
    for(i=0,x=obj.length;i<x;i++) {
      query = obj[i];
      if(query.type==="safe" && query.inputs && Array.isArray(query.inputs)) {
        q = {};
        q.rel = query.rel.join(" ");
        q.href = query.href.replace(/^\/\//,"http://")||"";
        q.prompt = query.prompt||"";
        data = [];
        for(j=0,y=query.inputs.length;j<y;j++) {
          d = query.inputs[j];
          data.push({
            name:d.name||"input"+j,
            value:d.value||"",
            prompt:d.prompt||d.name
          });
        }
        q.data = data;
        rtn.push(q);
      }
    }
  }
  return rtn;
}

