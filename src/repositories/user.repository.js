const { User } = require('../models');

module.exports = {
  create: (user) => User.create(user),
  list: (query) => User.findAndCountAll(query),
  findOne: (query) => User.findOne(query),
  findById: (id, options) => User.findByPk(id, options),
  delete: (query) => User.destroy(query),
  restore: (query) => User.restore(query),
  update: (updated) => updated.save(),
};
