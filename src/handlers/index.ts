//file: src/handlers/index.ts
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import slug from 'slug'
import { generateJWT } from "../utils/jwt";



export const createAccount = async (req: Request, res: Response): Promise<void> => {
    const error = validationResult(req); // Detecta errores en la validación.
    if (!error.isEmpty()) {
        res.status(400).json({ error: error.array() }); // Envía una respuesta y detiene la ejecución.
        console.log('Error de validación: ', error.array()); // Log del error para depuración.
        return; // Importante: detiene la ejecución posterior.
    }

    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        const userError = new Error('Usuario con ese mail ya está registrado');
        res.status(409).json({ error: userError.message });
        return; // Detiene ejecución en caso de error.
    }

    const handle = slug(req.body.handle, '');
    const handleExists = await User.findOne({ handle });
    if (handleExists) {
        const handleError = new Error('Nombre de usuario no disponible');
        res.status(409).json({ error: handleError.message });
       
        return;
    }

    const user = new User(req.body);
    user.password = await hashPassword(password);
    user.handle = handle;
    await user.save();
    res.status(201).json({message :'Registro Creado Correctamente'});
    console.log('Registro Creado Correctamente'); // Log de éxito para depuración.
};


export const login = async (req: Request, res:Response) => {
    const error = validationResult(req); // Detecta errores en la validación.
    if (!error.isEmpty()) {
        res.status(400).json({ error: error.array() }); // Envía una respuesta y detiene la ejecución.
        return;
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        const userError = new Error('Usuario no existe');
        res.status(404).json({ error: userError.message }); 
        return; // Detiene ejecución en caso de error.
    }
    // comprobar password
    const isPassword = await  checkPassword(password, user.password)
    if (!isPassword) {
        const userError = new Error('password incorrecto');
        res.status(401).json({ error: userError.message });
        console.log('password incorrecto' + userError.message); // Log del error para depuración.
        return; // Detiene ejecución en caso de error.
    }
    // generar token JWT
    const token =  generateJWT({id : user._id})
    res.status(201).json({message : token})
    console.log('Token generado correctamente'); // Log de éxito para depuración.
}
// autenticación de usuario
export const getUser = async (req: Request, res: Response) => {
    res.status(201).json(req.user); // Devuelve el usuario autenticado.
    console.log('Usuario autenticado devuelto correctamente'); // Log de éxito para depuración.
}



