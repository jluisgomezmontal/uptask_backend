import express from "express";
import { registrandoUsuario, autenticar, confirmar } from "../controllers/usuarioControllers.js";

const router = express.Router();

// Creacion Usuarios
router.post('/', registrandoUsuario); // registrandoUsuario
router.post('/login', autenticar); // autenticar usuario
router.get('/confirmar/:token', confirmar); // autenticar usuario

export default router