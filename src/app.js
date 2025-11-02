import express from "express";
import cors from "cors";
import productoRoutes from "./routes/productoRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/productos", productoRoutes);

export default app;
