'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/user-role/update',
      handler: 'user-role.update',
      config: {
        auth: false, // or true if using auth
      },
    },
  ],
};
