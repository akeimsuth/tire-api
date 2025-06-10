/**
 * A set of functions called "actions" for `statistics`
 */

export default {
  async getStats(ctx) {
    const stats = await strapi.service('api::statistics.statistics').getDashboardStats();
    ctx.body = stats;
  }
};
