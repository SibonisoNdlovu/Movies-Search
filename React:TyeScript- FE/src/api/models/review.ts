export interface Review {
  id: string;
  filmId: string;
  text: string;
  user: string;
  score: number;
  date: Date;
}

export interface AddReviewModel {
  filmId: string;
  text: string;
  user: string;
  score: number;
}
