const prisma = require('../db');
const CrearPublicacionCommand = require('../commands/CrearPublicacionCommand');

const obtenerTodosLosPosts = async (req, res) => {
    const posts = await prisma.publicacionesblog.findMany({
        orderBy: { fecha_creacion: 'desc' },
        include: {
            usuarios: { select: { nombre: true } }
        }
    });
    res.json(posts);
};

const obtenerPostPorId = async (req, res) => {
    const { id } = req.params;
    const post = await prisma.publicacionesblog.findUnique({
        where: { id: parseInt(id) },
        include: {
            usuarios: { select: { nombre: true } }
        }
    });

    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ mensaje: 'Post no encontrado' });
    }
};

const crearPost = async (req, res) => {
    const { titulo, contenido, imagenUrl } = req.body;
    const autorId = req.usuario.id;

    const datosComando = { titulo, contenido, imagenUrl, autorId };
    const comando = new CrearPublicacionCommand(datosComando);
    const nuevaPublicacion = await comando.ejecutar();

    res.status(201).json({
        mensaje: "Publicación creada con éxito",
        publicacion: nuevaPublicacion
    });
};

module.exports = {
    obtenerTodosLosPosts,
    obtenerPostPorId,
    crearPost,
};