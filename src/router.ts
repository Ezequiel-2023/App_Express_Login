//file: src/router.ts
import { Router } from "express";
import { handleInputError, loginValidation, registerValidation } from './middleware/validation'
import { createAccount, getUser, login } from "./handlers";
import { authenticate } from "./middleware/auth";


const router = Router();

router.post("/auth/register", 
    registerValidation,
    handleInputError,
    createAccount
);
    router.post("/auth/login",
        loginValidation,
        handleInputError,
        login
    )

router.get('/user', authenticate, getUser)   

export default router;
