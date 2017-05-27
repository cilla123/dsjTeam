'use strict';

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1495787512398_8979';

  config.middleware = [ 'errorHandler' ];

  config.errorHandler = {
      match: '/api',
  };

  return config;
};
