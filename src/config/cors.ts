// File: src/config/cors.ts
import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL ) {
            callback(null, true);
            console.log("CORS permitido para el origen: ", origin);
        } else {
            callback(new Error("No permitido por CORS"));
        }
    }
}