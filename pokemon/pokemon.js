// Gets all pokemon {name, url} from the Pokemon
// API
async function getAllPokemon(){
    let allPokemon = await $.get("https://pokeapi.co/api/v2/pokemon/?limit=964")
    return allPokemon;
}

// Returns random number between 1 and 964
function getRandomID(){
    return Math.floor(Math.random() * 964) + 1
}

async function getThreeRandomPokemon(){
    let allPokemon = await getAllPokemon();

    let randomID1 = getRandomID();
    let randomID2 = getRandomID();
    let randomID3 = getRandomID();

    let pokemon1 = allPokemon["results"][randomID1];
    let pokemon2 = allPokemon["results"][randomID2];
    let pokemon3 = allPokemon["results"][randomID3];

    let poke1Name = pokemon1["name"];
    let poke2Name = pokemon2["name"];
    let poke3Name = pokemon3["name"];
    
    console.log(poke1Name, poke2Name, poke3Name)

    let poke1Info = await $.get(pokemon1["url"]);
    let poke2Info = await $.get(pokemon2["url"]);
    let poke3Info = await $.get(pokemon3["url"]);

    let poke1Species = await $.get(poke1Info["species"]["url"])
    let poke2Species = await $.get(poke2Info["species"]["url"])
    let poke3Species = await $.get(poke3Info["species"]["url"])

    let poke1Flavors = poke1Species["flavor_text_entries"];
    let poke2Flavors = poke2Species["flavor_text_entries"];
    let poke3Flavors = poke3Species["flavor_text_entries"];

    poke1Flavors.forEach(function(flavor){
        let lang = flavor["language"];
        if (lang["name"] == "en"){
            console.log(poke1Name, flavor["flavor_text"])
        }
    })
    poke2Flavors.forEach(function(flavor){
        let lang = flavor["language"];
        if (lang["name"] == "en"){
            console.log(poke2Name, flavor["flavor_text"])
        }
    })
    poke3Flavors.forEach(function(flavor){
        let lang = flavor["language"];
        if (lang["name"] == "en"){
            console.log(poke3Name, flavor["flavor_text"])
        }
    })
}

$("#poke-form").on("submit", function(e){
    e.preventDefault();

    getThreeRandomPokemon();
})