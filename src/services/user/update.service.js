const yup = require('yup');
const { StatusCodes } = require('http-status-codes');
const { messages } = require('../../utils');
const userRepository = require('../../repositories/user.repository');

// Alterar o sobrenome e o endereço do usuário recebido no corpo da requisição,
// baseado no id recebido como parâmetro de rota:
// retorna o usuário alterado com as novas informações.

module.exports.update = async (id, body) => {
  const user = await userRepository.findOne({
    where: {
      id,
    },
  });
  // Msg de erro n esta printando
  const err = {
    status: StatusCodes.NOT_FOUND,
    message: messages.notFound('user'),
  };

  if (!user) {
    throw err;
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

  return userRepository.update(user);
};
