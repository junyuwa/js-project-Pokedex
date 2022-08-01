const pokemonRepository = (function () {
    let pokemonInfoList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // for adding pokemon to the list
    let add = function (pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
            pokemonInfoList.push(pokemon);
        } else {
            alert('Please enter the right pokemon info');
        };
    };

    let getAll = function () {
        return pokemonInfoList;
    };

    let addListItem = function (pokemon) {
        // add the list of pokemon to dom, created buttons for each pokemon
        let pokemonList = document.querySelector('.pokemon-list');

        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');

        let button = document.createElement('button');
        button.classList.add('btn-success');
        button.innerText = pokemon.name;
        button.classList.add('pokemonName');
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#pokemon-modal");

        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        // click on button to show details in modal
        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        });
    };

    function loadList() {
        // get data from api
        return fetch(apiUrl).then(function (response) {
            //  return the data in json to be passed on to the next callback
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
            item.weight = details.weight;
            item.types = details.types.map((type) => type.type.name).join(',');
            item.abilities = details.abilities.map((ability) => ability.ability.name).join(',');
            item.name = details.name;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            showModal(item);
        });
    }

    // add a modal to show info
    function showModal(pokemon) {

        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');

        modalTitle.empty();
        modalBody.empty();

        let nameElement = $('<h1>' + pokemon.name + '</h1>');
        let imageElement = $('<img class="pokemon-img">')
        imageElement.attr("src", pokemon.imageUrl);
        let heightElement = $('<p>' + 'Height : ' + pokemon.height + '</p>');
        let weightElement = $('<p>' + 'Weight : ' + pokemon.weight + '</p>');
        let typeElement = $('<p>' + 'Types : ' + pokemon.types + '</p>');
        let abilitiesElement = $('<p>' + 'Abilities : ' + pokemon.abilities + '</p>');

        modalTitle.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typeElement);
        modalBody.append(abilitiesElement);
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showModal: showModal,
        loadList: loadList,
        loadDetails: loadDetails,
    }
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
