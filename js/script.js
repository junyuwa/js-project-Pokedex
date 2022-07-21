const pokemonRepository = (function () {
    let pokemonInfoList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    let add = function (pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
            pokemonInfoList.push(pokemon);
        } else {
            alert('Please enter the right pokemon info');
        };
    };

    function showDetails(pokemon) {
        console.log(pokemon.name);
    }

    let getAll = function () {
        return pokemonInfoList;
    };

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
        button.addEventListener('click', function (event) {
            showDetails(pokemon)
        });
    };

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (pokemon) {
                let pokemonItem = {
                    name: pokemon.name,
                    detailsUrl: pokemon.url
                };
                add(pokemonItem);
            });
        }).catch(function (e) {
            console.log(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            //add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails
    }
})();


pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
