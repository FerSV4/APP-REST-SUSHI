const express = require('express');
const router = express.Router();
const { obtenerTodosLosPosts, obtenerPostPorId, crearPost } = require('../controllers/blogController');
const { protegerRuta } = require('../middleware/authMiddleware');

router.get('/', obtenerTodosLosPosts);
router.get('/:id', obtenerPostPorId);

router.post('/', protegerRuta, crearPost);

module.exports = router;