// types.ts
export interface Genre {
  id: number;
  name: string;
}

export interface Country {
  iso_3166_1: string;
  name: string;
}

export interface MovieDetails {
  title: string;
  backdrop_path: string;
  genres: Genre[];
  production_countries: Country[];
  release_date: string;
  vote_average: number;
  runtime: number;
  tagline: string;
  overview: string;
}

export interface Credit {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MovieCredits {
  cast: Credit[];
  crew: Credit[];
}
