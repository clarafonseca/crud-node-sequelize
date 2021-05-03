const { StatusCodes } = require('http-status-codes');
const { messages } = require('../../utils');
const userRepository = require('../../repositories/user.repository');

module.exports.get = async (nickname) => {
  const user = await userRepository.findOne({
    where: {
      nickname,
    },
  });

  if (!user) {
    throw {
      status: StatusCodes.NOT_FOUND,
      message: messages.notFound('user'),
    };
  }

  return {
    firstName: user.getDataValue('firstName'),
    lastName: user.getDataValue('lastName'),
    nickname: user.getDataValue('nickname'),
  };
};
