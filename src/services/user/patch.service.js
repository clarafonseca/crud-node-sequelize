const yup = require('yup');
const { StatusCodes } = require('http-status-codes');
const { messages } = require('../../utils');
const userRepository = require('../../repositories/user.repository');

module.exports.patch = async (id, body) => {
  const user = await userRepository.findOne({
    where: {
      id,
    },
  });

  if (!user) {
    throw {
      status: StatusCodes.NOT_FOUND,
      message: messages.notFound('user'),
    };
  }

  const schema = yup.object().shape({
    nickname: yup.string().required(),
  });

  const validated = await schema.validate(body, {
    stripUnknown: true,
  });

  const nickname = await userRepository.findOne({
    where: {
      nickname: validated.nickname,
    },
  });

  if (nickname) {
    throw {
      status: StatusCodes.CONFLICT,
      message: messages.nicknameUnavailable,
    };
  }

  user.setDataValue('nickname', validated.nickname);
  const userUpdated = await userRepository.update(user)
  return {
    firstName: userUpdated.getDataValue('firstName'),
    lastName: userUpdated.getDataValue('lastName'),
    nickname: userUpdated.getDataValue('nickname'),
    adress: userUpdated.getDataValue('adress'),
    bio: userUpdated.getDataValue('bio'),
  };
};
