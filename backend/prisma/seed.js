const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
    console.log('Iniciando el proceso de seeding...');

    console.log('Poblando publicaciones de blog...');
    
    const blogDataPath = path.join(__dirname, '../data/blog.json');
    const blogData = JSON.parse(fs.readFileSync(blogDataPath, 'utf-8'));

    const autorIdExistente = 1; 

    for (const post of blogData) {
        await prisma.publicacionesblog.create({
            data: {
                titulo: post.titulo,
                contenido: post.contenido_completo,
                imagen_url: post.imagen_url,
                autor_id: autorIdExistente, 
            },
        });
        console.log(`- Post creado: ${post.titulo}`);
    }
    
    console.log('Seeding de publicaciones de blog completado.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });