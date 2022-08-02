const pokemonRepository = (function () {
    let pokemonInfoList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // for adding pokemon to the list
    let add = function (pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
            pokemonInfoList.push(pokemon);
        } else {
            alert('Please enter the right pokemon info');
        }
    };

    let getAll = function () {
        return pokemonInfoList;
    };

    let addListItem = function (pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {

            let row = $(".row");
            // $row.classList.add('d-flex', 'justify-content-center');

            let card = $('<div class="card" style="width:400px"></div>');
            let image = $(
                '<img class="card-img-top" alt="Card image" style="width:20%" />'
            );
            image.attr("src", pokemon.imageUrlFront);
            let cardBody = $('<div class="card-body"></div>');
            let cardTitle = $("<h4 class='card-title' >" + pokemon.name + "</h4>");
            let seeProfile = $(
                '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#pokemon-modal">See Profile</button>'
            );

            row.append(card);
            //Append the image to each card
            card.append(image);
            card.append(cardBody);
            cardBody.append(cardTitle);
            cardBody.append(seeProfile);

            seeProfile.on("click", function (event) {
                showDetails(pokemon);
            });
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
            item.imageUrlFront = details.sprites.front_default;
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
        let imageElement = $('<img class="pokemon-img" style="width:60%">')
        imageElement.attr("src", pokemon.imageUrlFront);
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
