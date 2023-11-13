let rawText = "";
let wildPokemon = new Map();
let eventPokemon = new Map();
let output = document.querySelector("output");

const getWildPokemonData = async () => {
  // Replace ./data.json with your JSON feed
  await fetch("./data/wild.txt")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      // Work with JSON data here
      let wildText = data;
      for (let item of wildText.split(" ")) {
        wildPokemon.set(item, item);
      }
    })
    .catch((err) => {
      console.log(err);
      // Do something for an error here
    });
};

getWildPokemonData();

const getEventPokemonData = async () => {
  // Replace ./data.json with your JSON feed
  await fetch("./data/event.txt")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      // Work with JSON data here
      let eventText = data;
      for (let item of eventText.split(" ")) {
        eventPokemon.set(item, item);
      }
    })
    .catch((err) => {
      console.log(err);
      // Do something for an error here
    });
};

getEventPokemonData();

const getBoostedPokemonData = async () => {
  // Replace ./data.json with your JSON feed
  await fetch("./data/boosted.txt")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      // Work with JSON data here
      rawText = data;
      buildArray(rawText);
    })
    .catch((err) => {
      console.log(err);
      // Do something for an error here
    });
};

getBoostedPokemonData();

const buildArray = (text) => {
  const pokemonArray = [];
  rawArray = text.split(" ");
  for (const item of rawArray) {
    pokemonArray.push(item);
  }
  getPokedexInfo(pokemonArray);
};

const getPokedexInfo = async (pokemonArray) => {
  // Replace ./data.json with your JSON feed
  await fetch("./data/pokedexdata.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Work with JSON data here
      sortArrayBasedOnPokedexData(data, pokemonArray);
    })
    .catch((err) => {
      console.log(err);
      // Do something for an error here
    });
};

const sortArrayBasedOnPokedexData = (pokedexData, pokemonArray) => {
  pokemonArray.sort(
    (a, b) => pokedexData[a.split("-")[0]] - pokedexData[b.split("-")[0]]
  );
  buildUI(pokemonArray);
};

const buildUI = (pokemonArray) => {
  for (let item of pokemonArray) {
    let div = document.createElement("div");
    item = item.includes("mrmime") ? item.replace(/mrmime/, "mr-mime") : item;
    let img = document.createElement("img");
    img.classList.add("pokemon");
    wildPokemon.has(item) && div.classList.add("wild");
    eventPokemon.has(item) && div.classList.add("event");
    img.src = `https://img.pokemondb.net/sprites/home/shiny/${item}.png`;
    img.alt = item;
    div.appendChild(img);
    output.appendChild(div);
  }
};
