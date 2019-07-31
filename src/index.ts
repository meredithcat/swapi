import fetch from 'cross-fetch';

/*
 * Classes
 */

class Person {
  name: string;

  constructor({name}: {name: string}) {
    this.name = name;
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
  name: string;
  rotationPeriod: number;
  orbitalPeriod: number;
  diameter: number;
  climate: string;
  gravity: string;
  terrain: string;
  population: number;
  residents: Person[];
  constructor(
      {name, rotation_period, orbital_period, diameter, climate, gravity, terrain, population}: 
      {name: string, rotation_period: string, orbital_period: string, diameter: string,
        climate: string, gravity: string, terrain: string, population: string}) {
    this.name = name;
    this.rotationPeriod = parseInt(rotation_period);
    this.orbitalPeriod = parseInt(orbital_period);
    this.diameter = parseInt(diameter);
    this.climate = climate;
    this.gravity = gravity;
    this.terrain = terrain;
    this.population = parseInt(population);
  }

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
  // TODO write this function
}

async function getPlanet(planetId: number): Promise<Planet> {
  try {
    // Make planet API call
    const url = `${BASE_URL}/planets/${planetId}/`;
    const response = await fetch(url);
    const json = await response.json();

    // Construct planet
    const planet: Planet = new Planet(json);
    
    // Make people API calls
    const peopleUrls: string[] = json.residents;
    const peopleJson = await Promise.all(peopleUrls.map((url) => {
      return fetch(url).then((response) => response.json());
    }));

    // Construct people & add to planet
    const people = peopleJson.map((json) => {
      return new Person(json);
    });
    planet.setResidents(people);

    return planet;

  } catch (error) {
    console.log(error);
    return null;
  }
}

getPlanet(2).then((result) => console.log(result));

export { Person, Planet, getPerson, getPlanet };