  // handle query collection
  function queries() {
    var elm, coll;
    var ul, li;
    var form, fs, lg, p, lbl, inp;

    elm = d.find("queries");
    d.clear(elm);
    if(g.cj.collection.queries) {
      ul = d.node("ul");
      coll = g.cj.collection.queries;
      for(var query of coll) {
        li = d.node("li");
        form = d.node("form");
        form.action = query.href;
        form.className = query.rel;
        form.method = "get";
        form.onsubmit = httpQuery;
        fs = d.node("fieldset");
        lg = d.node("legend");
        lg.innerHTML = query.prompt + "&nbsp;";
        d.push(lg,fs);
        for(var data of query.data) {
          p = d.input({prompt:data.prompt,name:data.name,value:data.value});
          d.push(p,fs);
        }
        p = d.node("p");
        inp = d.node("input");
        inp.type = "submit";
        d.push(inp,p);
        d.push(p,fs);
        d.push(fs,form);
        d.push(form,li);
        d.push(li,ul);
      }
      d.push(ul,elm);
    }
  }

