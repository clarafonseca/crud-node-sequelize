const { StatusCodes } = require('http-status-codes');
const { messages } = require('../../utils');
const userRepository = require('../../repositories/user.repository');

// [] Listar um usuário pelo nickname passado como parâmetro:
// retorna um único usuário com nome, sobrenome e nickname.

// VERIFICAR SEGURANÇA,
// TRATAMENTO DO RETORNO,
// MSG CASO O NICKNAME SEJA DE UM USUARIO COM CONTA DESATIVADA/EXCLUIDA
// MENSAGEM DE ERRO EM GERAL

module.exports.get = async (nickname) => {
  const user = await userRepository.findOne({
    where: {
      nickname,
    },
  });
  // Msg de erro n esta printando
  const err = {
    status: StatusCodes.NOT_FOUND,
    message: messages.notFound(nickname),
  };

  if (!user) {
    throw err;
  }

  return user;
};
