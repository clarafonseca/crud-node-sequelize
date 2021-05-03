const yup = require('yup');
const { StatusCodes } = require('http-status-codes');
const { messages } = require('../../utils');
const userRepository = require('../../repositories/user.repository');

module.exports.update = async (id, body) => {
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
    lastName: yup.string().required(),
    adress: yup.string().required(),
  });

  const validated = await schema.validate(body, {
    stripUnknown: true,
  });

  Object.keys(validated).forEach((key) => {
    user.setDataValue(key, validated[key]);
  });

  const userUpdated = await userRepository.update(user);

  return {
    firstName: userUpdated.getDataValue('firstName'),
    lastName: userUpdated.getDataValue('lastName'),
    nickname: userUpdated.getDataValue('nickname'),
    adress: userUpdated.getDataValue('adress'),
    bio: userUpdated.getDataValue('bio'),
  };
};
