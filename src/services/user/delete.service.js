const { StatusCodes } = require('http-status-codes');
const { messages } = require('../../utils');
const userRepository = require('../../repositories/user.repository');

// Deletar um usuário baseado no id recebido como parâmetro de rota: retorna o status de sucesso.

// VERIFICAR SEGURANÇA,
// TRATAMENTO DO RETORNO,
// MENSAGEM DE ERRO EM GERAL

module.exports.deleteOne = async (id) => {
  const user = await userRepository.findById(id);

  const err = {
    status: StatusCodes.NOT_FOUND,
    message: messages.notFound('user'),
  };

  if (!user) {
    throw err;
  }
  return userRepository.delete({ where: { id } }); // verificar casos de sql injection
};
