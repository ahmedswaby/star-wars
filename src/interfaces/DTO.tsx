interface SData {
    count: number;
    next: string | undefined;
    previous: string | undefined;
  }
  
  //People
  export interface SPeople extends SData {
    results: Array<Character>;
  }
  
  export interface Character {
    name: string;
    height: string;
    mass: string;
    gender: string;
    url: string;
    created: string;
  }
  
  export interface User {
    name: string;
    height: string;
    birth_year: string;
    gender: string;
  }
  //Planets
  export interface Planets extends SData {
    results: Array<Planet>;
  }
  
  export interface Planet {
    name: string;
    climate: string;
    gravity: string;
    terrain: string;
    population: string;
    created: string;
  }
  //Films
  export interface SFilms extends SData {
    results: Array<Film>;
  }

 
  export interface Film {
    title: string;
    episode_id: number;
    director: string;
    producer: string;
    release_date: Date;
    opening_crawl: string;
    created: string;
  }
 
  //Species
  export interface Sspecies extends SData{
    results: Array<Specie>;
  }

  export interface Specie {
    name: string;
    classification: string;
    designation: string;
    language: string;
    created: string;
  }

  
  //Vehicles
  export interface Svehicles extends SData {
    results: Array<Vehicle>;

  }

  export interface Vehicle {
    name: string;
    model: string;
    max_atmosphering_speed: string;
    crew: string;
    created: string;
  }


  //Starships
  export interface Sstarships extends SData {
    results: Array<Starship>;
    
  }

  export interface Starship {
    name: string;
    manufacturer: string;
    max_atmosphering_speed: string;
    crew: string;
  }

  