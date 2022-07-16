const pokemonRepository = (function () {
    let pokemonInfoList = [
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
        return pokemonInfoList;
    }
    let add = function (item) {
        // if (typeof item === obejct && Object.keys === [name, category, weight, height]) {
        pokemonInfoList.push(item);
        // } else {
        //     alert('Please enter the right pokemon info');
        // }
    };

    let addListItem = function (pokemon) {

    };

    return {
        getAll: getAll,
        add: add
    }
})();

pokemonRepository.getAll().forEach(function (pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemonName');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
});
