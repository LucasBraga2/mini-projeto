import Movie, { IMovie } from '../models/Movie';
import { Error } from 'mongoose';

class MovieService {
  /**
   * Cria um novo filme associado a um usuário
   */
  public async create(
    movieData: Partial<IMovie>,
    userId: string
  ): Promise<IMovie> {
    try {
      // Adiciona o ID do usuário ao objeto do filme antes de criar
      const movie = await Movie.create({ ...movieData, user: userId });
      return movie;
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        throw new Error(`Erro de validação: ${error.message}`);
      }
      throw new Error('Erro ao criar filme.');
    }
  }

  /**
   * Busca todos os filmes DE UM USUÁRIO específico
   */
  public async getAll(userId: string): Promise<IMovie[]> {
    const movies = await Movie.find({ user: userId });
    return movies;
  }

  /**
   * Busca um filme específico pelo ID, garantindo que pertença ao usuário
   */
  public async getById(movieId: string, userId: string): Promise<IMovie> {
    const movie = await Movie.findOne({ _id: movieId, user: userId });
    
    if (!movie) {
      throw new Error('Filme não encontrado ou não pertence ao usuário.');
    }
    return movie;
  }

  /**
   * Atualiza um filme, garantindo que pertença ao usuário
   */
  public async update(
    movieId: string,
    movieData: Partial<IMovie>,
    userId: string
  ): Promise<IMovie> {
    // Busca o filme pelo ID e pelo ID do usuário
    const movie = await this.getById(movieId, userId); 
    // Se getById não falhar, sabemos que o filme existe e pertence ao usuário

    // Atualiza os campos
    Object.assign(movie, movieData);
    
    await movie.save();
    return movie;
  }

  /**
   * Deleta um filme, garantindo que pertença ao usuário
   */
  public async delete(movieId: string, userId: string): Promise<void> {
    // Busca o filme pelo ID e pelo ID do usuário
    const movie = await this.getById(movieId, userId);
    // Se getById não falhar, podemos deletar

    await Movie.findByIdAndDelete(movie._id);
  }
}

export default new MovieService();