let page = 0;

async function getAllPokemons() {
    const respAllPokemons = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=20`
    );
    const dataAllPokemons = await respAllPokemons.json();

    dataAllPokemons.results.forEach(async function (item) {
        const respPagina = await fetch(item.url);
        const dataPagina = await respPagina.json();

        const respPokemon = await fetch(dataPagina.species.url);
        const dataPokemon = await respPokemon.json();

        const descricaoPokemon = dataPokemon.flavor_text_entries[9].flavor_text;

        function getTypes() {
            const accessTypes = dataPagina.types;
            const arrayTypesPokemons = [];
            for (tipo of accessTypes) {
                let typePokemon = tipo.type.name;
                arrayTypesPokemons.push(typePokemon);
            }

            let stringTypesPokemons;
            if (arrayTypesPokemons.length === 1) {
                stringTypesPokemons = arrayTypesPokemons.toString();
                return stringTypesPokemons;
            } else {
                stringTypesPokemons = arrayTypesPokemons.join(" & ");
                return stringTypesPokemons;
            }
        }

        document.querySelector("#main").insertAdjacentHTML(
            "beforeend",
            `
        <div id="pokemon-each">

        <img
          class="pokemon-image"
          src= ${dataPagina.sprites.other["official-artwork"].front_default}
          alt="imagem-${dataPokemon.name}"
        />
         
         <div id="pokemon-dates">
          <h2 class="name-pokemon">${dataPokemon.name}</h2>
          <h2 class="number-pokemon">${dataPokemon.id}</h2> 
          <h2 class="title-pokemon">Tipo:</h2>
          <p class="subtitle-pokemon type-pokemon">${getTypes()}</p>
          <h2 class="title-pokemon">Descrição:</h2>
          <p class="subtitle-pokemon desc-pokemon">${descricaoPokemon}</p>

          </div>
        </div>
        `
        );
    });
}

getAllPokemons();

const btnNext = document.querySelector("#btnNextPage");

btnNext.addEventListener("click", function () {
    page += 20;
    getAllPokemons();
});
