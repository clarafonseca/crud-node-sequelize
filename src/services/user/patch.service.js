const yup = require('yup');
const { StatusCodes } = require('http-status-codes');
const { messages } = require('../../utils');
const userRepository = require('../../repositories/user.repository');

// Listar todos os usuários cadastrados filtrados pelos campos nome e/ou sobrenome,
// filtrados por parâmetros de consulta: retorna um array de usuários.

// VERIFICAR SEGURANÇA,
// TRATAMENTO DO RETORNO
// MENSAGEM CASO TENTEM ALTERAR ALGO ALEM DO NICKNAME
// MENSAGEM DE ERRO EM GERAL

module.exports.patch = async (id, body) => {
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

  const clonfict = {
    status: StatusCodes.CONFLICT,
    message: messages.nicknameUnavailable,
  };

  if (nickname) {
    throw clonfict;
  }

  user.setDataValue('nickname', validated.nickname);

  return userRepository.update(user);
};
