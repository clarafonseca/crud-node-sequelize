const yup = require('yup');
const { StatusCodes } = require('http-status-codes');
const { messages } = require('../../utils');
const userRepository = require('../../repositories/user.repository');

// Cria um novo usuário recebendo os dados pelo corpo da requisição:
// retorna os dados do usuário criado com status correspondente.
// Se nickname já existe, retornar status e mensagem de erro.

// VERIFICAR SEGURANÇA,
// TRATAMENTO DO RETORNO,
// MSG CASO O NICKNAME SEJA DE UM USUARIO COM CONTA DESATIVADA/EXCLUIDA
// MENSAGEM DE ERRO EM GERAL

module.exports.create = async (body) => {
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    nickname: yup.string().required(),
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
  });

  const err = {
    status: StatusCodes.CONFLICT,
    message: messages.nicknameUnavailable,
  };

  if (user) {
    throw err;
  }

  const createUser = await userRepository.create(validated);
  return createUser;
};
