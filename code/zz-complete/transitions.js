/*******************************************************
 * task service implementation
 * transitions document (server)
 * March 2016
 * Mike Amundsen (@mamund)
 * Soundtrack : Complete Collection : B.B. King (2008)
 *******************************************************/

// list of *all* possible state transitions for this service

// run on first load;
var trans = [];
trans = fillTrans();

module.exports = main;

function main(name) {
  var rtn, i, x;
 
  rtn = {};
  for(i=0,x=trans.length;i<x;i++) {
    if(trans[i].name===name) {
      rtn = trans[i];
      break;
    }
  }

  return rtn;
}

// internal filling
function fillTrans() {
  var trans;
  trans = [];

  // search transition
  trans.push({
    name : "searchLink",
    type : "safe",
    action: "read",
    kind : "task",
    target : "list",
    prompt : "Search tasks"
  });
  trans.push({
    name : "searchForm",
    type : "safe",
    action : "read",
    kind : "task",
    target : "list",
    prompt : "Search tasks",
    inputs : [
      {name : "title", prompt : "Title", value : ""}
    ]
  });
  
  // self transition
  trans.push({
    name : "selfLink",
    type : "safe",
    action : "read",
    kind : "self",
    target : "self",
    prompt : "Reload"
  });
    
  // home transitions
  trans.push({
    name : "homeLink",
    type : "safe",
    action : "read",
    kind : "home",
    target : "list",
    prompt : "Home"
  });
  
  // task transitions
  trans.push({
    name : "listAll",
    type : "safe",
    action : "read",
    kind : "task",
    target : "list",
    prompt : "All task"
  });
  trans.push({
    name : "listActive",
    type : "safe",
    action : "read",
    kind : "task",
    target : "list",
    prompt : "Active tasks",
    inputs : [
      {name : "completed", prompt : "Complete", value : "false"}
    ]
  });
  trans.push({
    name : "listCompleted",
    type : "safe",
    action : "read",
    kind : "task",
    target : "list",
    prompt : "Completed tasks",
    inputs : [
      {name : "completed", prompt : "Complete", value : "true"}
    ]
  });
  
  trans.push({
    name : "addLink",
    type : "safe",
    action : "read",
    kind : "task",
    target : "list",
    prompt : "Add task"
  });
  trans.push({
    name : "addForm",
    type : "unsafe",
    action : "append",
    kind : "task",
    target : "list",
    prompt : "Add task",
    inputs : [
      {name : "title", prompt : "Title"},
      {name : "completed", prompt : "Complete", value : "false"}
    ]
  });
  
  trans.push({
    name : "editLink",
    type : "safe",
    action : "read",
    kind : "task",
    target : "item",
    prompt : "Edit task"
  });
  trans.push({
    name : "editForm",
    type : "unsafe",
    action : "replace",
    kind : "task",
    prompt : "Edit task",
    inputs : [
      {name : "id", prompt : "ID"},
      {name : "title", prompt : "Title"},
      {name : "completed", prompt : "Complete"}
    ]
  });
  
  trans.push({
    name : "removeLink",
    type : "safe",
    action : "read",
    kind : "task",
    target : "item",
    prompt : "Remove task"
  });
  trans.push({
    name : "removeForm",
    type : "unsafe",
    action : "remove",
    kind : "task",
    prompt : "Remove task",
    inputs : [
      {name : "id", prompt : "ID"}
    ]
  });
  
  trans.push({
    name : "completedLink",
    type : "safe",
    action : "read",
    kind : "task",
    target : "item",
    prompt : "Mark Completed"
  });
  trans.push({
    name : "completedForm",
    type : "unsafe",
    action : "append",
    kind : "task",
    prompt : "Mark Completed",
    inputs : [
      {name: "id", prompt:"ID"},
      {name: "completed", prompt:"Complete Status", value:"true"}
    ]
  });
  
  trans.push({
    name : "clearCompletedLink",
    type : "safe",
    action : "read",
    kind : "task",
    target : "list",
    prompt : "Clear Completed"
  });
  trans.push({
    name : "clearCompletedForm",
    type : "unsafe",
    action : "append",
    kind : "task",
    target : "list",
    prompt : "Clear Completed",
    inputs : [
      {name: "completed", prompt:"Complete Status", value:"true"}
    ]
  });
 
  return trans;
}
