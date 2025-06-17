'use strict';

module.exports = {
  async update(ctx) {
    const { userId, roleName } = ctx.request.body;

    if (!userId || !roleName) {
      return ctx.badRequest('Missing userId or roleName');
    }

    // Get role by name
    const role = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { name: roleName } });

    if (!role) {
      return ctx.notFound(`Role "${roleName}" not found`);
    }

    // Update user role
    const updatedUser = await strapi
      .query('plugin::users-permissions.user')
      .update({
        where: { id: userId },
        data: { role: role.id },
      });

    return ctx.send({ message: 'User role updated', user: updatedUser });
  },
};
