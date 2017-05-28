'use strict';

module.exports = app => {
  // app.get('/', 'home.index');
  app.resources('home', '/api/v2/home', 'home');

};
