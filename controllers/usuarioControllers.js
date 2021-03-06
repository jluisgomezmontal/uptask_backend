import { generarID } from "../helpers/generarID.js";
import { generarJWT } from "../helpers/generarJWT.js";
import { Usuario } from "../models/Usuario.js"

export const registrandoUsuario = async(req, res) =>{
    // Evitar registros duplicados

    const {email} = req.body;
    const existeUsuario = await Usuario.findOne({ email })
    if(existeUsuario){
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message})
    }

    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarID(); 
        const usuarioAlmacenado = await usuario.save();
        res.json(usuarioAlmacenado);
    } catch (error) {
        console.log(error)
    }

}

export const autenticar = async(req, res ) => {

    const { email, password } = req.body;
    
    // Comprobar si el usuario existe
    const usuario = await Usuario.findOne({email})
    if(!usuario){
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message});
    }

    // Comprobar si el usuario esta confirmador
    if(!usuario){
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message});
    }
    // Comprobar su password 
    if(await usuario.comprobarPassword(password)){
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id),
        });
    }else{
        const error = new Error('El password es incorrecto');
        return res.status(404).json({msg: error.message});
    }
    
}


export const confirmar = async (req, res) => {
    const { token } = req.params
    const usuarioConfirmar = await Usuario.findOne({ token })
}