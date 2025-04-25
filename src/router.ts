//file: src/router.ts
import { Router } from "express";
import { body } from 'express-validator'
import { handleInputError } from './middleware/validation'
import { createAccount, getUser, login } from "./handlers";
import { authenticate } from "./middleware/auth";


const router = Router();

router.post("/auth/register", 
    body('handle')
        .notEmpty()
        .withMessage('Handle no puede ir vacio'),
    body('name')
        .notEmpty()
        .withMessage('El nombre no puede ir vacio'),
    body('email')
        .isEmail()
        .withMessage('El email no valido debe tener @'),
    body('password')
        .isLength({min:8, max:10})
        .withMessage('El Passwor es muy corto minimo 8 caracteres'),
    handleInputError,
    createAccount
);
    router.post("/auth/login",
        body('email')
            .isEmail()
            .withMessage('El email no valido'),
         body('password')
            .notEmpty()
            .withMessage('El Passwor no es correcto'),
        handleInputError,
        login
    )

router.get('/user', authenticate, getUser)   

export default router;
