const { StatusCodes } = require('http-status-codes');
const { messages } = require('../../utils');
const userRepository = require('../../repositories/user.repository');

module.exports.deleteOne = async (id) => {
  const user = await userRepository.findById(id);

  const err = {
    status: StatusCodes.NOT_FOUND,
    message: messages.notFound('user'),
  };

  if (!user) {
    throw {
      status: StatusCodes.NOT_FOUND,
      message: messages.notFound('user'),
    };
  }
  const userDeleted = userRepository.delete({ where: { id } });
  if (userDeleted) {
    return messages.sucess('user-deleted');
  };
};
