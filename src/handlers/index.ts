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
        res.status(409).json({ error: 'Usuario con ese mail ya está registrado'});
        return; // Detiene ejecución en caso de error.
    }

    const handle = slug(req.body.handle, '');
    const handleExists = await User.findOne({ handle });
    if (handleExists) {
        res.status(409).json({ error: 'Nombre de usuario no disponible' });
       
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
        res.status(404).json({ error: 'Usuario no existe' }); 
        return; // Detiene ejecución en caso de error.
    }
    // comprobar password
    const isPassword = await  checkPassword(password, user.password)
    if (!isPassword) {
        res.status(401).json({ error: 'password incorrecto'});
        console.log('password incorrecto' ); // Log del error para depuración.
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



