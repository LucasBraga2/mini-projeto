import 'dotenv/config'; 
import express, { Application, Request, Response, NextFunction } from 'express';
import connectDB from './database/config';
import authRoutes from './routes/authRoutes';
import movieRoutes from './routes/movieRoutes'; 
import cors from 'cors'; 

const app: Application = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

const allowedFrontends = [
  'http://localhost:5173',                        // Local
  'https://mini-projeto-frontend-mongo.vercel.app', // frontend de produção (Mongo)
\];

app.use(cors({
 origin: allowedFrontends
}));;

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

connectDB();


// --- Rotas ---
app.use('/api', authRoutes);

// Prefixa todas as rotas de filmes com /api
app.use('/api', movieRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ status: 'API está online!' });
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV}`);
}); 