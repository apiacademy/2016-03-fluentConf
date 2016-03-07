  // handle item collection
  function items() {
    var elm, coll;
    var ul, li;
    var dl, dt, dd;
    var p, s1, s2, img;
    var a1, a2, a3;

    elm = d.find("items");
    d.clear(elm);
    if(g.cj.collection.items) {
      coll = g.cj.collection.items;
      ul = d.node("ul");

      for(var item of coll) {
        li = d.node("li");
        dl = d.node("dl");
        dt = d.node("dt");
        
        // item link
        a1 = d.anchor({href:item.href,rel:item.rel,className:"item link",text:item.rel});
        a1.onclick = httpGet;
        d.push(a1,dt);
        
        // edit link
        if(isReadOnly(item)===false && hasTemplate(g.cj.collection)===true) {
          a2 = d.anchor({href:item.href,rel:"edit",className:"item action",text:"Edit"});
          a2.onclick = cjEdit;
          d.push(a2, dt);
        }

        // delete link
        if(isReadOnly(item)===false) {
          a3 = d.anchor({href:item.href,className:"item action",rel:"delete",text:"Delete"});
          a3.onclick = httpDelete;
          d.push(a3,dt);
        }
        d.push(dt,dl);

        // CJ item data here
        dd = d.node("dd");
        for(var data of item.data) {
          p = d.data({
            className:"item "+data.name,
            text:data.prompt+"&nbsp;",
            value:data.value+"&nbsp;"}
          );
          d.push(p,dd);
        }

        // cj item links here
        if(item.links) {
          for(var link of item.links) {
            p = d.node("p");
            p.className = "item";
            
            // render as images, if asked
            if(isImage(link)===true) {
              img = d.image({
                className:"image "+link.rel, rel:link.rel,
                href:link.href}
              );         
              d.push(img, p);
            }
            else {
              a = d.anchor({
                className:"item", href:link.href,
                rel:link.rel, text:link.prompt}
                );
              a.onclick = httpGet;
              d.push(a, p);
            }
            d.push(p,dd);
          }
        }
        
        d.push(dd,dl);
        d.push(dl,li);
        d.push(li,ul);
      }
      d.push(ul,elm);
    }
  }

