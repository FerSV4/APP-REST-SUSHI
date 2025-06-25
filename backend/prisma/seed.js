const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
    console.log('Iniciando el proceso de seeding...');

    await prisma.productos.deleteMany({});
    await prisma.categorias.deleteMany({});
    console.log('Tablas de Productos y Categorías limpiadas.');

    const menuDataPath = path.join(__dirname, '../data/menu.json');
    const menuData = JSON.parse(fs.readFileSync(menuDataPath, 'utf-8'));

    for (const categoria of menuData.categorias) {
        console.log(`Creando categoría: ${categoria.nombre}`);
        const nuevaCategoria = await prisma.categorias.create({
            data: {
                nombre: categoria.nombre,
            },
        });

        for (const item of categoria.items) {
            console.log(`  - Añadiendo producto: ${item.nombre}`);

            // --- SOLUCIÓN AQUÍ ---
            // En lugar de pasar 'categoriaId' directamente, usamos la sintaxis 'connect'
            // para enlazar el producto con su categoría a través de la relación.
            await prisma.productos.create({
                data: {
                    nombre: item.nombre,
                    descripcion_detallada: item.descripcion,
                    precio: parseFloat(item.precio),
                    imagen_url: item.imagen,
                    // El nombre 'categorias' debe coincidir con el nombre de la relación
                    // en tu archivo 'schema.prisma' (normalmente es el nombre del modelo en plural).
                    categorias: {
                        connect: {
                            id: nuevaCategoria.id,
                        },
                    },
                },
            });
        }
    }
    
    console.log('Seeding completado exitosamente.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });