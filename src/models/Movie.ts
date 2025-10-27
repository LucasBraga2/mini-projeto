import mongoose, { Schema, model, Document, Model } from 'mongoose';
import { IUser } from './User'; // Importamos a interface do usuário

// Interface para o documento do Filme
export interface IMovie extends Document {
  title: string;
  director?: string;
  genre?: string;
  releaseYear?: number;
  user: IUser['_id']; // Chave estrangeira para o usuário
}

const movieSchema = new Schema<IMovie>(
  {
    title: {
      type: String,
      required: [true, 'O título é obrigatório.'],
      trim: true,
    },
    director: {
      type: String,
      trim: true,
    },
    genre: {
      type: String,
      trim: true,
    },
    releaseYear: {
      type: Number,
    },
    // Chave estrangeira que referencia o Model 'User'
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true, // Adiciona createdAt e updatedAt
  }
);

const Movie = model<IMovie>('Movie', movieSchema);

export default Movie;