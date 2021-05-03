const { StatusCodes } = require('http-status-codes');
const { usersService } = require('../services');

module.exports = {
  create: async (req, res) => {
    try {
      const response = await usersService.create(req.body);
      return res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
      console.error(error);
      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message);
    }
  },
  get: async (req, res) => {
    try {
      const response = await usersService.get(req.params.nickname);
      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      console.error(error);
      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.messages);
    }
  },
  list: async (req, res) => {
    try {
      const response = await usersService.list(req.query);
      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      console.error(error);
      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.messages);
    }
  },
  update: async (req, res) => {
    try {
      const response = await usersService.update(req.params.id, req.body);

      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      console.error(error);
      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message);
    }
  },
  updateNickname: async (req, res) => {
    try {
      const response = await usersService.patch(req.params.id, req.body);

      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      console.error(error);
      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message);
    }
  },
  delete: async (req, res) => {
    try {
      const response = await usersService.deleteOne(req.params.id);

      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      console.error(error);
      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message);
    }
  },
};
