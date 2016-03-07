/*******************************************************
 * task service implementation
 * representation router (server)
 * May 2015
 * Mike Amundsen (@mamund)
 * Soundtrack : Complete Collection : B.B. King (2008)
 *******************************************************/

// handles internal representation routing (based on conneg)

// load representors
var cj = require('./representors/cj.js');
var json = require('./representors/json.js');
var repjson = require('./representors/repjson.js');

module.exports = main;

function main(object, mimeType, root) {
  var doc;

  // clueless? assume JSON
  if (!mimeType) {
    mimeType = "application/vnd.collection+json";
  }

  // dispatch to requested representor
  switch (mimeType.toLowerCase()) {
    case "application/json":
      doc = json(object, root);
      break;
    case "application/vnd.collection+json":
      doc = cj(object, root);
      break;
    case "application/representor+json":
      doc = repjson(object, root);
      break;
    default:
      doc = cj(object, root);
      break;
  }

  return doc;
}

// EOF

