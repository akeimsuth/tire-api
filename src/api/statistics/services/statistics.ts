/**
 * statistics service
 */

export default {
    async getDashboardStats() {
    // 1. Count total customers
    const totalCustomers = await strapi.documents('api::customer.customer').count({ status: 'published' });

    // 2. Count total providers
    const totalProviders = await strapi.documents('api::provider.provider').count({      
        filters: {
            isApproved: true,
        },
    });

    // 3. Get all service requests
    const serviceRequests = await strapi.documents('api::service-request.service-request').findMany({
      populate: '*',
      pagination: { pageSize: -1 }, // fetch all
    });

    const totalServiceRequests = serviceRequests.length;

    // 4. Total revenue (only where tireStatus is "Service Completed")
    const totalRevenue = serviceRequests.reduce((sum, req) => {
      const isCompleted = req.tireStatus === 'Service Completed';
      const amount = Number(req.amount) || 0;
      return isCompleted ? sum + amount : sum;
    }, 0);

    // 5. Average provider rating
    const providers = await strapi.documents('api::provider.provider').findMany({
      populate: '*',
      pagination: { pageSize: -1 },
    });

    let totalRating = 0;
    let ratingCount = 0;

    providers.forEach((provider) => {
      const rating = Number(provider.rating);
      if (!isNaN(rating)) {
        totalRating += rating;
        ratingCount++;
      }
    });

    const averageRating = ratingCount > 0 ? totalRating / ratingCount : 0;

    // 6. Jobs created today
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const jobsToday = await strapi.documents('api::service-request.service-request').count({
      filters: {
        createdAt: {
          $gte: startOfToday.toISOString(),
        },
      },
    });

    // Return all stats
    return {
      totalCustomers,
      totalProviders,
      totalServiceRequests,
      totalRevenue,
      averageRating: Number(averageRating.toFixed(2)),
      jobsToday,
    };
  }
};
