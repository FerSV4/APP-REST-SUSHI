require('dotenv').config();
const express = require('express');
const cors = require('cors');

const usuarioRoutes = require('./routes/usuarioRoutes');
const productoRoutes = require('./routes/productoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const blogRoutes = require('./routes/blogRoutes'); // <-- 1. ¿Está esta línea importando tus rutas?

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/blog', blogRoutes); 

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});