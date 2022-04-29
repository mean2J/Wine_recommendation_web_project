function removeFields(document, [...args]) {
  return Object
    .entries(document)
    .filter(([key, value]) => !args.includes(key))
    .reduce((res, [key, value]) => {
      res[key] = value;
      return res;
    }, {});
}

export {removeFields};