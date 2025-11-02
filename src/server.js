import dotenv from "dotenv";
import app from "./app.js";
import { conectarDB } from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

// Conectar a Mongo y arrancar el servidor
conectarDB();
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
