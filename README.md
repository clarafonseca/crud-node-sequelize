# A aplicação

- API REST capaz de realizar o `C.R.U.D.` seguindo os padrões atuais, manipulando os valores de entrada, processando e retornando os dados, mensagens e status coerentes.

- [x] A API deve seguir os princípios do desgin pattern `RESTful.`
- [x] Manipulação de dados no padrão `JSON`.
- [x] Os dados referentes à(s) entidade(s) devem ser persistidos em BD.
- [x] Isole as operações feitas diretamente no banco de dados em repositórios.
- [x] Retorno das requisições e status com semântica nas operações realizadas.
- [x] Tratamento de erros e exceções.

## Como rodar a aplicação

### Instalar os pacotes
> `npm install`
> `node src/app`

### Banco de dados

- Preencha o arquivo `.env.example`
- No terminal rode:
  > `npx sequelize db:migrate`

### Rotas & Métodos

Use o link `https://www.getpostman.com/collections/f0828cd4d38f61c8c9a7` para testar as rotas com o postman!

#### Criar usuário 

- Rota: `router.post('/create', usersController.create);`
- Passe no body as seguintes informações: firstName, lastName, nickname, adress, bio;

#### Listar um único usuário

- Rota: `router.get('/:nickname', usersController.get);`
- Passe por paramêtro de rota o nickname do usuário que gostaria de visualizar

#### Listar usuários filtrados pelos campos `nome` ou `sobrenome`

- Rota: `router.get('/', usersController.list);`
- Passe por paramêtro de consulta o primeiro nome e/ou sobrenome dos usuários que gostaria de visualizar

#### Alterar o sobrenome ou a bio de um usuário

- Rota: `router.put('/:id', usersController.update);`
- Passe por paramêtro de rota o id do usuário que gostaria de editar

#### Alterar o nickname de um usuário

- Rota: `router.patch('/:id', usersController.updateNickname);`
- Passe por paramêtro de rota o id do usuário que gostaria de editar o nickname

#### Deletar um usuário

- Rota: `router.delete('/:id', usersController.delete);`
- Passe por paramêtro de rota o id do usuário que gostaria de deletar

##### A entidade usuário:

  - id: string, (primário)(gerado automaticamente),
  - name: string,
  - lastname: string,
  - nickname: string, (único) - máx. 30 caracteres
  - address: string, // O endereço todo dentro da string
  - bio: string, (opcional) - máx. 100 caracteres // breve descrição sobre o usuário
  - createdAt: Date,
  - updatedAt: Date

#### Métodos:
  - [x] Cria um novo usuário recebendo os dados pelo corpo da requisição: retorna os dados do usuário criado com status correspondente.
    - Se nickname já existe, retornar status e mensagem de erro.
  - [x] Listar todos os usuários cadastrados filtrados pelos campos `nome` e/ou `sobrenome`, filtrados por parâmetros de consulta: retorna um array de usuários.
  - [x] Listar um usuário pelo nickname passado como parâmetro: retorna um único usuário com nome, sobrenome e nickname.
  - [x] Alterar o sobrenome e o endereço do usuário recebido no corpo da requisição, baseado no id recebido como parâmetro de rota: retorna o usuário alterado com as novas informações.
  - [x] Alterar o nickname de um usuário recebido no corpo da requisição, baseado no id recebido como parâmetro de rota: retorna o usuário alterado com as novas informações.
    - Se o nickname passado já existir, deve retornar status e mensagem de erro.
  - [x] Deletar um usuário baseado no id recebido como parâmetro de rota: retorna o status de sucesso.

