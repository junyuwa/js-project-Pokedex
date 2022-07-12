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
]

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height <= 0.4) {
        document.write(`${pokemonList[i].name}` + `(${pokemonList[i].height})` + "-a small pokemon" + " ");
    } else {
        document.write(`${pokemonList[i].name}` + `(${pokemonList[i].height})` + " ");
    }
}
