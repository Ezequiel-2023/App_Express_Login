//file: src/middleware/validation.ts
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const handleInputError = (req:Request, res:Response, next : NextFunction) => {
    const error = validationResult(req); // Detecta errores en la validación.
    if (!error.isEmpty()) {
        res.status(400).json({ error: error.array() }); // Envía una respuesta y detiene la ejecución.
        return; // Importante: detiene la ejecución posterior.
    }
    next();
    console.log("No hay errores de validación en //file: src/middleware/validation.ts"); 
}