import { Genre } from "./genre";
import { Review } from "./review";

export interface FilmBase {
  id: string;
  title: string;
}

export interface Film extends FilmBase {
  summary: string;
  shortSummary: string;
  runtime: number;
  releaseDate: string;
  distributor: string;
  genres: Genre[];
  posterUrl: string;
  reviews: Review[];
  overallScore : number;
}
