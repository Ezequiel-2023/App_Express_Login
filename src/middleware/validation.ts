//file: src/middleware/validation.ts
import { NextFunction, Request, Response } from "express";
import { body, validationResult, ValidationError } from "express-validator";

export const handleInputError = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrors = errors.array({ onlyFirstError: true }).map((error: ValidationError) => ({
            field: error.msg, 
            message: error.msg
        }));

        res.status(400).json({ errors: formattedErrors });
        return;
    }

    next();
};


export const registerValidation = [
    body('handle')
        .notEmpty().withMessage('El nombre de usuario es obligatorio')
        .isLength({ min: 3, max: 20 }).withMessage('El nombre de usuario debe tener entre 3 y 20 caracteres'),
    
    body('email')
        .isEmail().withMessage('Debes proporcionar un correo electrónico válido'),

    body('password')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una letra mayúscula')
        .matches(/[a-z]/).withMessage('La contraseña debe contener al menos una letra minúscula')
        .matches(/[0-9]/).withMessage('La contraseña debe contener al menos un número')
        .matches(/[^A-Za-z0-9]/).withMessage('La contraseña debe contener al menos un carácter especial (por ejemplo, @, $, !, %, *)')
];

export const loginValidation = [
    body('email')
        .isEmail().withMessage('Debes proporcionar un correo electrónico válido'),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
];
