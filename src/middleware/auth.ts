//file: src/middleware/auth.ts
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import User from "../models/User";
import { IUser } from "../models/User";

declare global {
    namespace Express {
        interface Request {
            user: IUser; // Define la propiedad 'user' en la solicitud.
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        const error = new Error('No estás autorizado');
        res.status(401).json({ error: error.message });
    }
    const [, token] = bearer.split(' ');
    if (!token) {
        const error = new Error('No estás autorizado');
         res.status(401).json({ error: error.message });
    }
    try{
        const result = jwt.verify(token, process.env.JWT_SECRET )
        if(typeof result === 'object' && result.id){
            const user = await User.findById(result.id).select('name')
            if (!user) {
                const error = new Error('Usuario no existe');
                res.status(404).json({ error: error.message });
            }
            req.user = user// Almacena el usuario en la solicitud para su uso posterior.
            next(); // Llama a la siguiente función de middleware si el token es válido y el usuario existe.
        }
    }catch (error) {
         res.status(500).json({ error: 'Token inválido' });
    }
}