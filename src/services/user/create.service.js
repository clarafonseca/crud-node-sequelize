const yup = require('yup');
const { StatusCodes } = require('http-status-codes');
const { messages } = require('../../utils');
const userRepository = require('../../repositories/user.repository');

module.exports.create = async (body) => {
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    nickname: yup.string().required().min(4),
    adress: yup.string().required(),
    bio: yup.string(),
  });

  const validated = await schema.validate(body, {
    stripUnknown: true,
  });

  const user = await userRepository.findOne({
    where: {
      nickname: validated.nickname,
    },
    paranoid: false
  });

  if (user) {
    throw {
      status: StatusCodes.CONFLICT,
      message: messages.nicknameUnavailable,
    };
  }

  const userCreated = await userRepository.create(validated);

  return {
    id: userCreated.getDataValue('id'),
    firstName: userCreated.getDataValue('firstName'),
    lastName: userCreated.getDataValue('lastName'),
    nickname: userCreated.getDataValue('nickname'),
    adress: userCreated.getDataValue('adress'),
    bio: userCreated.getDataValue('bio'),
  };
};
