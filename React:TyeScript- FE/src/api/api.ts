import { Film } from "./models/film";
import { Genre } from "./models/genre";
import { Review } from "./models/review";
import { getQuery } from "../utils/utils";
import {o as  ofetch} from 'odata'

class Api {
  BaseUrl = "http://localhost:5295";
  
  async getFilms({title = undefined, genre = undefined}) : Promise<Film[]> {
    const films = await ofetch(this.BaseUrl).get('film').query(getQuery(title, genre));
    return films;
  }
  
  async getFilm(filmId: string) : Promise<Film> {
    const film = (await (await fetch(`${this.BaseUrl}/film/${filmId}`)).json()) as Film;
    return film;
  }
  
  async getGenres() : Promise<Genre[]> {
    const genres = await fetch(`${this.BaseUrl}/genres`);
    return genres.json();
  }

  async getAutocomplete() {
    const data = await fetch(`${this.BaseUrl}/film/autocomplete`);
    return data.json();
  }

  async addReview(review: Review) : Promise<Review> {
    const reviewData = await fetch(`${this.BaseUrl}/review`, {
      method: 'post',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(review)
    });
    return reviewData.json();
  }
}

export const api = new Api();
