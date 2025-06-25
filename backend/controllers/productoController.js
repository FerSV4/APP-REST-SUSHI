const prisma = require('../db');

const obtenerProductos = async (req, res) => {
    const productos = await prisma.productos.findMany({
        include: {
            // Se corrige el nombre del campo de la relación a plural.
            categorias: true,
        },
        orderBy: {
            id: 'asc'
        }
    });

    // Esta lógica de agrupación necesita un pequeño ajuste para usar el nombre correcto.
    const productosAgrupados = productos.reduce((acc, producto) => {
        // Ahora accedemos a la categoría a través de 'producto.categorias'
        const categoriaNombre = producto.categorias.nombre;
        if (!acc[categoriaNombre]) {
            acc[categoriaNombre] = {
                nombre: categoriaNombre,
                items: [],
            };
        }
        acc[categoriaNombre].items.push(producto);
        return acc;
    }, {});

    const resultadoFinal = Object.values(productosAgrupados);

    res.json(resultadoFinal);
};

module.exports = {
    obtenerProductos,
};