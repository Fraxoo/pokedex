const leftBlock = document.querySelector(".left-block");
const rightBlock = document.querySelector(".right-block");


async function main() {

    async function getAllPokemon() {
        const reponse = await fetch("https://pokebuildapi.fr/api/v1/pokemon");
        if (reponse.ok === true) {
            return reponse.json();
        }
        throw new Error("Erreur fetch");
    }

    async function getPokemonById(id) {
        const reponse = await fetch("https://pokebuildapi.fr/api/v1/pokemon/" + id);
        if (reponse.ok === true) {
            return reponse.json();
        }
        throw new Error("Erreur fetch");
    }

    const allPokemon = await getAllPokemon();
    console.log(allPokemon);

    allPokemon.forEach(pokemon => {
        const templateList = document.getElementById("list");
        const cloneTemplateList = templateList.content.cloneNode(true);
        const leftId = cloneTemplateList.querySelector("#id");
        const leftName = cloneTemplateList.querySelector("#nom");
        const leftImg = cloneTemplateList.querySelector("#image");
        const pokeDiv = cloneTemplateList.querySelector(".pokemon");



        pokeDiv.dataset.id = pokemon.id;
        leftId.innerText = pokemon.id;
        leftId.dataset.id = pokemon.id;
        leftName.innerText = pokemon.name;
        leftName.dataset.id = pokemon.id;
        leftImg.setAttribute("src", pokemon.image);
        leftImg.dataset.id = pokemon.id;


        leftBlock.appendChild(cloneTemplateList);


    });
    const pokemonDiv_elem = document.querySelectorAll(".pokemon");
    pokemonDiv_elem.forEach(poke => {
        poke.onclick = async function (event) {


            console.log(event.target);
            const target = event.target;
            const id = target.dataset.id;

            const pokemonByID = await getPokemonById(id);
            console.log(pokemonByID);


            const rightBlockTemplate = document.getElementById("right-detail")
            const detail = document.querySelector(".right-block");
            const imageType = detail.querySelector(".types");


            const rightId = detail.querySelector("#right-id");
            const rightImg = detail.querySelector("#right-img");
            const rightNom = detail.querySelector("h1");
            const rightTypesDiv = detail.querySelector(".types");


            rightId.textContent = `n° ${pokemonByID.id}`;
            rightImg.setAttribute("src", pokemonByID.image);
            rightNom.textContent = pokemonByID.name;
            // Flush all previous types from view
            imageType.innerHTML = "";
            
            // Append all types to view
            pokemonByID.apiTypes.forEach(type => {
                const typeImg = document.createElement("img");
                typeImg.setAttribute("src", type.image);
                imageType.appendChild(typeImg);
            });

            const evolutions = pokemonByID.apiEvolutions;

            for (const evolution of evolutions) {
                evolutionID = evolution.pokedexId;
                const pokemonByID = await getPokemonById(evolutionID);
                console.log(pokemonByID);
                const evoId = detail.querySelector("#id");
                const evoName = detail.querySelector("#nom");
                const evoImg = detail.querySelector("#image")
                evoId.textContent = pokemonByID.pokedexId;
                evoName.textContent = pokemonByID.name;
                evoImg.setAttribute("src",pokemonByID.image);

            }




        }
    });















}

main();






