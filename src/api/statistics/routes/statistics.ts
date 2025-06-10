export default {
  routes: [
    {
      method: 'GET',
      path: '/statistics',
      handler: 'statistics.getStats',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};