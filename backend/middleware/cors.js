import cors from 'cors';
import { CORS_OPTIONS } from '../config/server.js';

const corsMiddleware = cors(CORS_OPTIONS);

export default corsMiddleware;
