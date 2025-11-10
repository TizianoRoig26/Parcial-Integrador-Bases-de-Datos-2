import express from "express";
import dotenv from "dotenv";

// Importar rutas
import usuarioRoutes from "./routes/usuarioRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";
import categoriaRoutes from "./routes/categoriaRoutes.js";
import carritoRoutes from "./routes/carritoRoutes.js";
import pedidosRoutes from "./routes/pedidosRoutes.js";
import resenaRoutes from "./routes/resenaRoutes.js";

import { errorHandler } from "./middleware/middleware.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/carritos", carritoRoutes);
app.use("/api/pedidos", pedidosRoutes);
app.use("/api/resenas", resenaRoutes);

app.use(errorHandler);
export default app; 
