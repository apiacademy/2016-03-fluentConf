/*******************************************************
 * task service implementation
 * internal JSON representor format (server)
 * March 2016
 * Mike Amundsen (@mamund)
 * Soundtrack : Complete Collection : B.B. King (2008)
 *******************************************************/

// internal JSON representor
module.exports = repjson;

function repjson(object) {

  // emit the full internal representor graph
  return JSON.stringify(object, null, 2);
}

// EOF

