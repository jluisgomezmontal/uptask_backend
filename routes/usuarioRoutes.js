import express from "express";
import { registrandoUsuario, autenticar } from "../controllers/usuarioControllers.js";

const router = express.Router();

// Creacion Usuarios
router.post('/', registrandoUsuario); // registrandoUsuario
router.post('/login', autenticar); // autenticar usuario

export default router