const router = require('express').Router();
const usersController = require('../controllers/users.controller');

router.get('/', usersController.list);

router.get('/:nickname', usersController.get);

router.post('/create', usersController.create);

router.put('/:id', usersController.update);

router.patch('/:id', usersController.updateNickname);

router.delete('/:id', usersController.delete);

module.exports = router;
