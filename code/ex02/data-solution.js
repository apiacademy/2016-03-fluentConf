function updateItem(object, id, item) {
  var current, rtn;

  current = getItem(object, id);
  if (!current) {
    rtn = utils.exception("Task", "Invalid [id]", 400);
    return rtn;
  }

  /* accept new passed-in properties */
  for (var prop in item) {
    current[prop] = item[prop];
  }

  current = item;
  current.dateUpdated = new Date();

  rtn = null;
  try {
    fs.writeFileSync(folder + object + '/' + id, JSON.stringify(current));
    rtn = getItem(object, id);
  } catch (ex) {
    rtn = null;
  }

  return rtn;
}

