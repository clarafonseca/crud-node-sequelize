const { StatusCodes } = require('http-status-codes');
const { messages } = require('../../utils');
const userRepository = require('../../repositories/user.repository');

module.exports.list = async (query) => {
  const { count, rows } = await userRepository.list({ where: query });

  const data = { ...rows };
  const response = [];
  for (let i = 0; i < rows.length; i += 1) {
    response.push({
      id: data[i].id,
      firstName: data[i].firstName,
      lastName: data[i].lastName,
      nickname: data[i].nickname,
      adress: data[i].adress,
      bio: data[i].bio,
    });
  }

  if (count === 0) {
    throw {
      status: StatusCodes.NOT_FOUND,
      message: messages.notFound('users'),
    };
  }

  return {
    metadata: {
      total: count,
    },
    data: response,
  };
};
