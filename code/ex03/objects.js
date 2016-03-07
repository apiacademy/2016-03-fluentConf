/*******************************************************
 * task service implementation
 * business object(s) (server)
 * May 2015
 * Mike Amundsen (@mamund)
 * Soundtrack : Complete Collection : B.B. King (2008)
 *******************************************************/

// matches data calls w/ middleware domain-specific verbs

// access stored data
var data = require('./data.js');

// handle task/todo business objects
exports.task = function(action, args1, args2, args3) {
  var object, props, rtn;

  // valid fields for this record   
  props = ["id","title","completed","dateCreated","dateUpdated"];

  object = 'task';
  rtn = null;

  switch (action) {
    case 'list':
      rtn = getList(data(object, 'list'));
      break;
    case 'read':
      rtn = getList(data(object, 'item', args1));
      break;
    case 'filter':
      rtn = getList(data(object, 'filter', args1));
      break;
    case 'add':
      rtn = addTask(object, args1, props);
      break;
    case 'update':
      rtn = updateTask(object, args1, args2, props);
      break;
    case 'remove':
      rtm = removeTask(object, args1, props);
      break;
    default:
      rtn = null;
  }
  return rtn;
}

// create a new task object
function addTask(elm, task, props) {
  var rtn, item;
  
  item = {}
  item.title = (task.title||"");
  item.completed = (task.completed||"false");
  
  if(item.completed!=="false" && item.completed!=="true") {
    item.completed="false";
  }
  if(item.title === "") {
    rtn = utils.exception("Missing Title");
  } 
  else {
    data(elm, 'add', setProps(item, props));
  }
  
  return rtn;
}

// update an existing task object
function updateTask(elm, id, task, props) {
  var rtn, check, item;
  
  check = data(elm, 'item', id);
  if(check===null) {
    rtn = utils.exception("File Not Found", "No record on file", 404);
  }
  else {
    item = check;
    item.id = id;      
    item.title = (task.title===undefined?check.title:task.title);
    item.completed = (task.completed===undefined?check.completed:task.completed);
    
    if(item.completed!=="false" && item.completed!=="true") {
      item.completed="false";
    }
    if (item.title === "") {
      rtn = utils.exception("Missing Title");
    } 
    else {
      data(elm, 'update', id, setProps(item, props));
    }
  }
  
  return rtn;
}

// remove a task object from collection
function removeTask(elm, id) {
  var rtn, check;
  
  check = data(elm, 'item', id);
  if(check===null) {
    rtn = utils.exception("File Not Found", "No record on file", 404);
  }
  else {
    data(elm, 'remove', id);
  }
  
  return rtn;  
}

// produce clean array of items
function getList(elm) {
  var coll;

  coll = [];
  if(Array.isArray(elm) === true) {
    coll = elm;
  }
  else {
    if(elm!==null) {
      coll.push(elm);
    }
  }

  return coll;
}

// only write 'known' properties for an item
function setProps(item, props) {
  var rtn, i, x, p;
    
  rtn = {};  
  for(i=0,x=props.length;i<x;i++) {
    p = props[i];
    rtn[p] = (item[p]||"");
  }
  return rtn;
}

// EOF

