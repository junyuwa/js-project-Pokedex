const pokemonRepository = (function () {
    let pokemonList = [
        {
            name: 'Nidoran',
            category: ["poison", "pin"],
            weight: 7,
            height: 0.5
        },
        {
            name: 'Cherubi',
            category: ["fairy", "grass"],
            weight: 3.3,
            height: 0.4
        },
        {
            name: 'Cubone',
            category: ["monster"],
            weight: 6.5,
            height: 0.4
        }
    ];
    let getAll = function () {
        return pokemonList;
    }
    let add = function (item) {
        if (typeof item === obejct && Object.keys === [name, category, weight, height]) {
            pokemonList.push(item);
        } else {
            alert('Please enter the right pokemon info');
        }
    };

    return {
        getAll,
        add
    }
})


function printPokemonList(pokemon) {
    document.write(pokemon.name + '' + pokemon.height)
};

getAll.forEach(printPokemonList);
