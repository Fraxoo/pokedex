const leftBlock = document.querySelector(".left-block")


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
        console.log(leftName);
        
        leftId.innerText = pokemon.id;
        leftName.innerText = pokemon.name;
        leftImg.setAttribute("src",pokemon.image)
        
        leftBlock.appendChild(cloneTemplateList);
    });
    




















}

main();






