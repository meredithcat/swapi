"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var cross_fetch_1 = require("cross-fetch");
var Person = /** @class */ (function () {
    function Person() {
    }
    Person.prototype.setFilms = function (films) {
        this.films = films;
    };
    Person.prototype.setSpecies = function (species) {
        this.species = species;
    };
    Person.fromJSON = function (json) {
        var person = Object.create(Person.prototype);
        // copy all the fields from the json object
        return Object.assign(person, json, {
            // convert fields that need converting
            height: parseInt(json.height),
            mass: parseInt(json.mass)
        });
    };
    return Person;
}());
exports.Person = Person;
var Species = /** @class */ (function () {
    function Species() {
    }
    Species.fromJSON = function (json) {
        var person = Object.create(Species.prototype);
        // copy all the fields from the json object
        return Object.assign(person, json, {
            // convert fields that need converting
            average_height: json.average_height == "n/a" ? null : json.average_height,
            mass: json.homeworld == "n/a" ? null : json.homeworld,
            language: json.language == "n/a" ? null : json.language
        });
    };
    return Species;
}());
var Planet = /** @class */ (function () {
    function Planet() {
    }
    Planet.prototype.getName = function () {
        return "my name is " + this.name;
    };
    Planet.prototype.setResidents = function (residents) {
        this.residents = residents;
    };
    Planet.fromJSON = function (json) {
        var planet = Object.create(Planet.prototype);
        // copy all the fields from the json object
        return Object.assign(planet, json, {
            // convert fields that need converting
            rotationPeriod: parseInt(json.rotation_period),
            orbitalPeriod: parseInt(json.orbital_period),
            diameter: parseInt(json.diameter),
            population: parseInt(json.population)
        });
    };
    return Planet;
}());
exports.Planet = Planet;
/*
 * Async functions
 */
var BASE_URL = 'https://swapi.co/api';
function getPerson(personId) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, json, person, speciesUrl, speciesResponse, speciesJson, filmUrls, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    url = BASE_URL + "/people/" + personId + "/";
                    return [4 /*yield*/, cross_fetch_1["default"](url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    person = Person.fromJSON(json);
                    speciesUrl = json.species[0];
                    return [4 /*yield*/, cross_fetch_1["default"](speciesUrl)];
                case 3:
                    speciesResponse = _a.sent();
                    return [4 /*yield*/, speciesResponse.json()];
                case 4:
                    speciesJson = _a.sent();
                    person.setSpecies(Species.fromJSON(speciesJson));
                    filmUrls = json.films;
                    //    const filmJson = await PromiseRejectionEvent.all();
                    return [2 /*return*/, person];
                case 5:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [2 /*return*/, null];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getPerson = getPerson;
function getPlanet(planetId) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, json, planet, peopleUrls, peopleJson, people, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    url = BASE_URL + "/planets/" + planetId + "/";
                    return [4 /*yield*/, cross_fetch_1["default"](url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    planet = Planet.fromJSON(json);
                    peopleUrls = json.residents;
                    return [4 /*yield*/, Promise.all(peopleUrls.map(function (url) {
                            return cross_fetch_1["default"](url).then(function (response) { return response.json(); });
                        }))];
                case 3:
                    peopleJson = _a.sent();
                    people = peopleJson.map(function (json) {
                        return Person.fromJSON(json);
                    });
                    planet.setResidents(people);
                    return [2 /*return*/, planet];
                case 4:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    });
}

let p = new Person();


exports.getPlanet = getPlanet;
