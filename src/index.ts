import fetch from 'cross-fetch';

/*
 * Classes
 */

interface PersonJSON {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  homeworld: string;
  species: string[];
  films: string[];
}

class Person {
  name: string;
  height: number;
  mass: number;
  birth_year: string;
  homeworld: string;
  films: string[];
  species: Species;

  constructor() {}

  setFilms(films: string[]) {
    this.films = films;
  }

  setSpecies(species: Species) {
    this.species = species;
  }

  static fromJSON(json: PersonJSON) {
    let person = Object.create(Person.prototype);
      // copy all the fields from the json object
      return Object.assign(person, json, {
        // convert fields that need converting
        height: parseInt(json.height),
        mass: parseInt(json.mass),
      });
  }
}

interface SpeciesJSON {
  name: string;
  classification: string;
  average_height: string;
  average_lifespan: string;
  homeworld: string | null;
  language: string;
}

class Species {
  name: string;
  classification: string;
  average_height: string | null;
  average_lifespan: string;
  homeworld: string | null;
  language: string | null;

  constructor() {}

  static fromJSON(json: SpeciesJSON) {
    let person = Object.create(Species.prototype);
      // copy all the fields from the json object
      return Object.assign(person, json, {
        // convert fields that need converting
        average_height: json.average_height == "n/a" ? null : json.average_height,
        mass: json.homeworld == "n/a" ? null : json.homeworld,
        language: json.language == "n/a" ? null : json.language,
      });
  }
}

interface PlanetJSON {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  population: string;
}

class Planet {
  constructor() {}

  getName(): string {
    return `my name is ${this.name}`;
  }

  setResidents(residents: Person[]) {
    this.residents = residents;
  }

  static fromJSON(json: PlanetJSON) {
    let planet = Object.create(Planet.prototype);
      // copy all the fields from the json object
      return Object.assign(planet, json, {
        // convert fields that need converting
        rotationPeriod: parseInt(json.rotation_period),
        orbitalPeriod: parseInt(json.orbital_period),
        diameter: parseInt(json.diameter),
        population: parseInt(json.population),
      });
  }
}

/*
 * Async functions
 */

const BASE_URL = 'https://swapi.co/api';

async function getPerson(personId: number) {
  try {
    // Make person API call
    const url = `${BASE_URL}/people/${personId}/`;
    const response = await fetch(url);
    const json: PersonJSON = await response.json();

    // Construct person
    const person: Person = Person.fromJSON(json);

    // Add species
    const speciesUrl: string = json.species[0];
    const speciesResponse = await fetch(speciesUrl);
    const speciesJson: SpeciesJSON = await speciesResponse.json();

    person.setSpecies(Species.fromJSON(speciesJson));

    // Add films
    const filmUrls: string[] = json.films;
//    const filmJson = await PromiseRejectionEvent.all();

    return person;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getPlanet(planetId: number): Promise<Planet> {
  try {
    // Make planet API call
    const url = `${BASE_URL}/planets/${planetId}/`;
    const response = await fetch(url);
    const json = await response.json();

    // Construct planet
    const planet: Planet = Planet.fromJSON(json);
    
    // Make people API calls
    const peopleUrls: string[] = json.residents;
    const peopleJson = await Promise.all(peopleUrls.map((url) => {
      return fetch(url).then((response) => response.json());
    }));

    // Construct people & add to planet
    const people = peopleJson.map((json: PersonJSON) => {
      return Person.fromJSON(json);
    });
    planet.setResidents(people);

    return planet;

  } catch (error) {
    console.log(error);
    return null;
  }
}


export { Person, Planet, getPerson, getPlanet };