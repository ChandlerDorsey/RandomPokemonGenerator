const pokemongenerated = document.getElementById('pokemongenerated');

const fetchPokemon = () => {
const array = [];
const randomID = Math.floor(Math.random() * 906) + 1;


    const url = `https://pokeapi.co/api/v2/pokemon/${randomID}`;
    array.push(fetch(url).then((res) => res.json()));

Promise.all(array).then((results) => {
     const pokemon = results.map((data) => ({
        name: data.name,
        image: data.sprites['front_default'],
        shinyImage: data.sprites['front_shiny'],
        type: data.types.map((type) => type.type.name).join(', '),
        typeCss: data.types.map((type)=>type.type.name).join('--'),
        id: data.id,
        
       

    }));
    displayPokemon(pokemon);
  });
 };
 
const displayPokemon = (pokemon) => {
console.log(pokemon);
const pokemonHTMLString = pokemon
    .map(
        (pokemon) => `
    <ul class="card pokemon-type type-${pokemon.typeCss}">
        <img class="card-image" src="${pokemon.image}"/>
        <img class="card-image" src="${pokemon.shinyImage}"/>
        <h2 class="card-name"> National No ${pokemon.id}. ${pokemon.name}</h2>
        <p class="card-type">Type: ${pokemon.type}</p>   

    </ul>
`
    )
    .join('');

document.querySelector('#pokemonGenerated').innerHTML = pokemonHTMLString;
};

fetchPokemon();

  