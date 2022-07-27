const pokemonRepository = (function () {
    let pokemonInfoList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');

    let add = function (pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
            pokemonInfoList.push(pokemon);
        } else {
            alert('Please enter the right pokemon info');
        };
    };

    // function showDetails(pokemon) {
    //     console.log(pokemon.name);
    // }

    let getAll = function () {
        return pokemonInfoList;
    };

    let addListItem = function (pokemon) {
        // add the list of pokemon to dom, created buttons for each pokemon
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemonName', 'show-modal');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        // click on button to show details in console
        button.addEventListener('click', function (event) {
            showModal(pokemon);
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
            item.name = details.name;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showModal(pokemon) {

        loadDetails(pokemon).then(function () {
            // clears the elements created otehrwise they will appear multiple times with multiple clicks
            modalContainer.innerHTML = '';
        });


        let modal = document.createElement('div');
        modal.classList.add('modal');

        let titleElement = document.createElement('h1');
        titleElement.innerText = `${pokemon.name}`;

        let contentElement = document.createElement('p');
        contentElement.innerText = `Height:${pokemon.height}`;

        let imageElement = document.createElement('p');
        imageElement.innerHTML = `<img src=${pokemon.imageUrl} alt=${pokemon.name}>`;

        let closeButton = document.createElement('button');
        closeButton.classList.add('modal-close');
        closeButton.innerText = 'Close';
        closeButton.addEventListener('click', hideModal);

        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        modal.appendChild(closeButton);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    };

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showModal: showModal,
        hideModal: hideModal,
        loadList: loadList,
        loadDetails: loadDetails
    }
})();


pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
    }
});

// document.querySelector('.show-modal').addEventListener('click', () => {
//     showModal(pokemon);
// });
