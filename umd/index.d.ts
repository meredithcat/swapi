declare class Person {
    name: string;
    constructor({ name }: {
        name: string;
    });
}
declare class Planet {
    name: string;
    rotationPeriod: number;
    orbitalPeriod: number;
    diameter: number;
    climate: string;
    gravity: string;
    terrain: string;
    population: number;
    residents: Person[];
    constructor({ name, rotation_period, orbital_period, diameter, climate, gravity, terrain, population }: {
        name: string;
        rotation_period: string;
        orbital_period: string;
        diameter: string;
        climate: string;
        gravity: string;
        terrain: string;
        population: string;
    });
    getName(): string;
    setResidents(residents: Person[]): void;
}
declare function getPerson(personId: number): Promise<void>;
declare function getPlanet(planetId: number): Promise<Planet>;
export { Person, Planet, getPerson, getPlanet };
