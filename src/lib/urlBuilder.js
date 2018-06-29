const urlBuilder = (paths, params) => {
  return `${buildPath(paths)}${buildParams(params)}`;
};

const buildParams = (params) => {
  if (params) {
    let foo = Object.entries(params)
      .map(paramCouple => {
        return paramCouple.join('=');
      })
      .join('&');

    return `?${foo}`;
  }

  return '';
};

const buildPath = (paths) => {
  return paths.join('/');
};


module.exports = {
  buildParams,
  buildPath,
  urlBuilder
};