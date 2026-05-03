export interface PlanetData {
  name: string;
  slug: string;
  type: string;
  tagline: string;
  color: string;
  image: string;
  position: number;
  diameter: number;
  mass: number;
  distanceFromSun: number;
  orbitalPeriod: number;
  rotationPeriod: number;
  moons: number;
  temperature: { min: number; max: number };
  gravity: number;
  atmosphere: string;
  description: string;
  funFacts: string[];
  geology: string;
  discovery: string;
  missions: string[];
}

export const PLANETS: PlanetData[] = [
  {
      name: "Mercury",
      slug: "mercury",
      type: "Terrestrial",
      tagline: "The Swift Messenger",
      color: "#8c8c8c",
      image: "https://solartextures.b-cdn.net/2k_mercury.jpg",
      position: 1,
      diameter: 4879,
      mass: 0.055,
      distanceFromSun: 57.9,
      orbitalPeriod: 88,
      rotationPeriod: 58.6,
      moons: 0,
      temperature: { min: -180, max: 430 },
      gravity: 3.7,
      atmosphere: "Thin exosphere of oxygen, sodium, hydrogen, helium, and potassium.",
      description: "Closest planet to the Sun.",
      funFacts: ["A year is only 88 days", "No moons"],
      geology: "Heavily cratered surface, similar to Earth's Moon, with huge ridges called lobate scarps.",
      discovery: "Known to the ancients; first observed by telescope by Galileo in the early 17th century.",
      missions: ["Mariner 10", "MESSENGER", "BepiColombo"]
  },
  {
      name: "Venus",
      slug: "venus",
      type: "Terrestrial",
      tagline: "The Veiled Planet",
      color: "#e6c67a",
      image: "https://solartextures.b-cdn.net/2k_venus_atmosphere.jpg",
      position: 2,
      diameter: 12104,
      mass: 0.815,
      distanceFromSun: 108.2,
      orbitalPeriod: 225,
      rotationPeriod: 243,
      moons: 0,
      temperature: { min: 462, max: 462 },
      gravity: 8.87,
      atmosphere: "Extremely dense CO2 with clouds of sulfuric acid, creating a runaway greenhouse effect.",
      description: "Hottest planet in our solar system.",
      funFacts: ["Rotates backwards", "Thick clouds"],
      geology: "Vast plains, mountains, and thousands of volcanoes. The surface is relatively young.",
      discovery: "Brightest object in the sky after the Sun and Moon; known since prehistory.",
      missions: ["Venera", "Magellan", "Pioneer Venus", "Akatsuki"]
  },
  {
      name: "Earth",
      slug: "earth",
      type: "Terrestrial",
      tagline: "Our Pale Blue Dot",
      color: "#4fa3e0",
      image: "https://solartextures.b-cdn.net/2k_earth_daymap.jpg",
      position: 3,
      diameter: 12742,
      mass: 1.0,
      distanceFromSun: 149.6,
      orbitalPeriod: 365.25,
      rotationPeriod: 1,
      moons: 1,
      temperature: { min: -89, max: 57 },
      gravity: 9.81,
      atmosphere: "Nitrogen (78%), Oxygen (21%), Argon, and Carbon Dioxide.",
      description: "The only known planet to support life.",
      funFacts: ["Only planet with liquid water on surface", "Magnetic field protects us"],
      geology: "Active plate tectonics, diverse ecosystems, and an active core generating a magnetosphere.",
      discovery: "Home planet.",
      missions: ["ISS", "Hubble", "JWST", "Landsat"]
  },
  {
      name: "Mars",
      slug: "mars",
      type: "Terrestrial",
      tagline: "The Red Planet",
      color: "#d45a36",
      image: "https://solartextures.b-cdn.net/2k_mars.jpg",
      position: 4,
      diameter: 6779,
      mass: 0.107,
      distanceFromSun: 227.9,
      orbitalPeriod: 687,
      rotationPeriod: 1.03,
      moons: 2,
      temperature: { min: -140, max: 20 },
      gravity: 3.72,
      atmosphere: "Thin atmosphere composed primarily of Carbon Dioxide (95%).",
      description: "A dusty, cold, desert world with a very thin atmosphere.",
      funFacts: ["Home to Olympus Mons, the tallest volcano", "Has evidence of ancient water"],
      geology: "Iron oxide dust gives it the red color. Features include polar ice caps and deep canyons.",
      discovery: "Known to the ancients; named after the Roman god of war.",
      missions: ["Perseverance", "Curiosity", "Ingenuity", "Mavic", "Insight"]
  },
  {
      name: "Jupiter",
      slug: "jupiter",
      type: "Gas Giant",
      tagline: "The King of Planets",
      color: "#c89b6b",
      image: "https://solartextures.b-cdn.net/2k_jupiter.jpg",
      position: 5,
      diameter: 139820,
      mass: 317.8,
      distanceFromSun: 778.5,
      orbitalPeriod: 4333,
      rotationPeriod: 0.41,
      moons: 95,
      temperature: { min: -145, max: -108 },
      gravity: 24.79,
      atmosphere: "Mostly hydrogen and helium, with swirling clouds of ammonia and water.",
      description: "Twice as massive as all the other planets combined.",
      funFacts: ["Great Red Spot is a centuries-old storm", "Strongest magnetic field"],
      geology: "No solid surface; likely a small rocky core surrounded by metallic hydrogen.",
      discovery: "Known to the ancients; Galileo discovered its four largest moons in 1610.",
      missions: ["Juno", "Galileo", "Voyager 1 & 2", "Pioneer 10 & 11"]
  },
  {
      name: "Saturn",
      slug: "saturn",
      type: "Gas Giant",
      tagline: "The Ringed Beauty",
      color: "#e4c76e",
      image: "https://solartextures.b-cdn.net/2k_saturn.jpg",
      position: 6,
      diameter: 116460,
      mass: 95.2,
      distanceFromSun: 1434,
      orbitalPeriod: 10759,
      rotationPeriod: 0.45,
      moons: 146,
      temperature: { min: -178, max: -139 },
      gravity: 10.44,
      atmosphere: "Hydrogen and helium, with high-speed winds reaching 1,800 km/h.",
      description: "Adorned with a dazzling, complex system of icy rings.",
      funFacts: ["Least dense planet", "Hexagonal storm at North Pole"],
      geology: "A gas giant like Jupiter; its rings are composed of billions of ice and rock particles.",
      discovery: "Known to the ancients; Huygens first identified the rings in 1655.",
      missions: ["Cassini-Huygens", "Voyager 1 & 2", "Pioneer 11"]
  },
  {
      name: "Uranus",
      slug: "uranus",
      type: "Ice Giant",
      tagline: "The Tilted World",
      color: "#73d5e8",
      image: "https://solartextures.b-cdn.net/2k_uranus.jpg",
      position: 7,
      diameter: 50724,
      mass: 14.5,
      distanceFromSun: 2871,
      orbitalPeriod: 30687,
      rotationPeriod: 0.72,
      moons: 28,
      temperature: { min: -224, max: -197 },
      gravity: 8.87,
      atmosphere: "Hydrogen, helium, and methane, which gives it its blue-green tint.",
      description: "An ice giant that rotates on its side at nearly a 90-degree angle.",
      funFacts: ["Rotates on its side", "First planet found with a telescope"],
      geology: "Mostly made of hot, dense 'icy' materials: water, methane, and ammonia.",
      discovery: "Discovered by William Herschel in 1781.",
      missions: ["Voyager 2"]
  },
  {
      name: "Neptune",
      slug: "neptune",
      type: "Ice Giant",
      tagline: "The Windiest World",
      color: "#3f6ccc",
      image: "https://solartextures.b-cdn.net/2k_neptune.jpg",
      position: 8,
      diameter: 49244,
      mass: 17.1,
      distanceFromSun: 4495,
      orbitalPeriod: 60190,
      rotationPeriod: 0.67,
      moons: 16,
      temperature: { min: -218, max: -200 },
      gravity: 11.15,
      atmosphere: "Hydrogen, helium, and methane; features extremely fast supersonic winds.",
      description: "The most distant major planet orbiting our Sun.",
      funFacts: ["Completed its first orbit since discovery in 2011", "Has a Great Dark Spot"],
      geology: "Inner structure similar to Uranus; mostly water, methane, and ammonia ice.",
      discovery: "Discovered by Johann Galle in 1846 using mathematical predictions.",
      missions: ["Voyager 2"]
  }
];
