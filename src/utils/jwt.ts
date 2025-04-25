//src/utils/jwt.ts
import jwt ,{ JwtPayload }  from 'jsonwebtoken';

export const generateJWT = (payload:JwtPayload)=>{
    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn: '1h',// Tiempo de expiración del token segun el tipo de suscripción
    })
    return token;
}