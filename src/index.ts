import fetch from 'cross-fetch';

import { FilmJSON, SpeciesJSON, PersonJSON, Species, Person } from './person';
import { PlanetJSON, Planet } from './planet';


const BASE_URL = 'https://swapi.co/api';

/**
 * Returns a Person object, including their species and the films they appear 
 * in.
 * 
 * @param personId The id of the person you're searching for.
 */
async function getPerson(personId: number) {
  try {
    // Make person API call
    const url = `${BASE_URL}/people/${personId}/`;
    const response = await fetch(url);
    const json: PersonJSON = await response.json();

    // Construct person
    const person: Person = new Person(json);

    // Add species
    const speciesUrl: string = json.species[0];
    const speciesResponse = await fetch(speciesUrl);
    const speciesJson: SpeciesJSON = await speciesResponse.json();

    person.setSpecies(new Species(speciesJson));

    // Add films
    const filmUrls: string[] = json.films;
    const filmJson = await Promise.all(filmUrls.map((url) => {
      return fetch(url).then((response) => response.json());
    }));
    const filmTitles = filmJson.map((json: FilmJSON) => {
      return json.title;
    });
    person.setFilms(filmTitles);

    return person;
  } catch (error) {
    // Handle error
    console.log(error);
    return null;
  }
}

/**
 * Returns a Planet object, including the residents who live on that planet.
 *
 * @param personId The id of the person you're searching for.
 */
async function getPlanet(planetId: number): Promise<Planet> {
  try {
    // Make planet API call
    const url = `${BASE_URL}/planets/${planetId}/`;
    const response = await fetch(url);
    const json: PlanetJSON = await response.json();

    // Construct planet
    const planet: Planet = new Planet(json);

    // Make people API calls
    const peopleUrls: string[] = json.residents;
    const peopleJson = await Promise.all(peopleUrls.map((url) => {
      return fetch(url).then(response => response.json());
    }));

    // Construct people & add to planet
    const people = peopleJson.map((json: PersonJSON) => {
      return new Person(json);
    });
    planet.setResidents(people);

    return planet;

  } catch (error) {
    // Handle error
    console.log(error);
    return null;
  }
}


export { getPerson, getPlanet };