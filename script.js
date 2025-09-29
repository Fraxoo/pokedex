const leftBlock = document.querySelector(".left-block")
const rightBlock = document.querySelector(".right-block")

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

    const pokemonByID = await getPokemonById(1);
    console.log(pokemonByID);

    const allPokemon = await getAllPokemon();
    console.log(allPokemon);

    allPokemon.forEach(pokemon => {
        const templateList = document.getElementById("list");
        const cloneTemplateList = templateList.content.cloneNode(true);
        const leftId = cloneTemplateList.querySelector("#id");
        const leftName = cloneTemplateList.querySelector("#nom");
        const leftImg = cloneTemplateList.querySelector("#image")

        leftId.innerText = pokemon.id;
        leftName.innerText = pokemon.name;
        leftImg.setAttribute("src", pokemon.image)

        leftBlock.appendChild(cloneTemplateList);
    });


    const rightBlockTemplate = document.getElementById("right-detail")
    const detail = rightBlockTemplate.content.cloneNode(true);

    const rightId = detail.querySelector("#right-id");
    const rightImg = detail.querySelector("#right-img");
    const rightNom = detail.querySelector("h1");
    const rightTypesDiv = detail.querySelector(".types");
    const rightEvoId = detail.getElementById("id");
    const rightEvoName = detail.getElementById("nom");
    const rightEvoImg = detail.getElementById("image");


    rightId.textContent = `n° ${pokemonByID.id}`;
    rightImg.setAttribute("src", pokemonByID.image);
    rightNom.textContent = pokemonByID.name;
    const pokemonTypes = pokemonByID.apiTypes;

    pokemonTypes.forEach((type) => {
        const typeImg = document.createElement("img")
        typeImg.setAttribute("src", type.image);
        rightTypesDiv.appendChild(typeImg);
    })

    
    const evolutions = pokemonByID.apiEvolutions;
    for(const evolution of evolutions){
        const pokeEvo = await getPokemonById(evolution.pokedexId)
        console.log(pokeEvo);
        rightEvoId.textContent = pokeEvo.pokedexId;
        rightEvoName.textContent = pokeEvo.name;
        rightEvoImg.setAttribute("src",pokeEvo.image);
        
    }    

 
    


    rightBlock.appendChild(detail);






















}

main();






