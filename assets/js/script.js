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
                stringTypesPokemons = arrayTypesPokemons.join(" and ");
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
         
         <div id="descrição">
          <h2 class="title-pokemon">${dataPokemon.name}</h1>
          <h2 class="title-pokemon"> Número:</h2>
          <p class="subtitle-pokemon">${dataPokemon.id}</p> 
          <h2 class="title-pokemon">Tipo:</h2>
          <p class="subtitle-pokemon">${getTypes()}</p>
          <h2 class="title-pokemon>Descrição</h2>
          <p class="subtitle-pokemon">${descricaoPokemon}</p>

          </div>
        </div>
        `
        );
    });
}

getAllPokemons();

function btnNextPage() {
    const btnNext = document.querySelector("#btnNextPage");

    btnNext.addEventListener("click", function () {
        page += 20;
        getAllPokemons();
    });
}
