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
    let add = function (pokemon) {
        if (typeof pokemon === 'obejct' && 'name' in pokemon) {
            pokemonInfoList.push(item);
        } else {
            alert('Please enter the right pokemon info');
        };
    };

    function showDetails(pokemon) {
        console.log(pokemon.name);
    }

    let addListItem = function (pokemon) {
        // add the list of pokemon to dom, created buttons for each pokemon
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemonName');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        // click on button to show details in console
        button.addEventListener('click', function () {
            showDetails(pokemon)
        });
    };

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    }
})();

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});
