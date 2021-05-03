// const { StatusCodes } = require('http-status-codes');
// const { messages } = require('../../utils');
const userRepository = require('../../repositories/user.repository');

// Listar todos os usuários cadastrados filtrados pelos campos nome e/ou sobrenome,
// filtrados por parâmetros de consulta: retorna um array de usuários.

// VERIFICAR SEGURANÇA,
// TRAMATAMENTOS QUERY: Case Sensitive e espaçamento + Proteçao
// TRATAMENTO DO RETORNO (buscar formas melhores)
// Nenhum user = msg de erro
// MENSAGEM DE ERRO EM GERAL

module.exports.list = async (query) => {
  const { count, rows } = await userRepository.list({ where: query });

  const data = { ...rows };
  const response = [];
  for (let i = 0; i < rows.length; i += 1) {
    response.push({
      firstName: data[i].firstName,
      lastName: data[i].lastName,
      nickname: data[i].nickname,
      adress: data[i].adress,
      bio: data[i].bio,
    });
  }

  return {
    metadata: {
      total: count,
    },
    data: response,
  };
};
