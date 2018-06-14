// array holding button names
var pokemon = ["bulbasaur", "venusaur", "blastoise", "charmander", "charizard", "pikachu", "raichu", "caterpie", "butterfree",
    "scyther", "magikarp", "gyarados", "weedle", "lapras", "pidgey", "dragonite", "pinsir", "chansey", "mewtwo", "mew"];

// function to render the buttons from the array
function renderButtons() {
    for (i = 0; i < pokemon.length; i++) {
        var pokemonButton = $("<button>");
        $(pokemonButton).addClass("pokemon-button btn");
        $(pokemonButton).attr("data-pokemon", i);
        $(pokemonButton).append(pokemon[i]);
        $("#pokemonButtons").append(pokemonButton)
    }
}

// click listener to add a new item to the array and make it into a button
$("#addPokemon").on("click", function (event) {
    event.preventDefault();
    var poke = $("#pokemon-input").val();
    if (pokemon.indexOf(poke) > -1) {
        $("#submitAlert").html("There is already a button for that pokemon!");
    } else {
        pokemon.push(poke);
        var pokemonButton = $("<button>");
        $(pokemonButton).addClass("pokemon-button btn");
        $(pokemonButton).attr("data-pokemon", pokemon.indexOf(poke));
        $(pokemonButton).append(pokemon[pokemon.length - 1]);
        $("#pokemonButtons").append(pokemonButton)
    }
});

// click listener for the buttons that uses AJAX to get api from giphy and display gifs to the user
$(document).on("click", ".pokemon-button", function () {
    var name = pokemon[$(this).attr("data-pokemon")];
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=7gKGW7OQzykULNtUvZFcEiuieezrbcc4&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#pokemon").empty();
        for (j = 0; j < response.data.length; j++) {
            var results = response.data;
            console.log(results);
            var imgStill = results[j].images.fixed_height_still.url;
            var imgGif = results[j].images.fixed_height.url;
            var imgRating = results[j].rating;
            var imgAlt = results[j].slug;
            var imgDiv = $("<div>");
            var ratingDiv = $("<h5>")
            var pokemonImg = $("<img>");
            $(ratingDiv).html("Rating: " + imgRating);
            $(pokemonImg).addClass("pokemon-images");
            $(pokemonImg).attr("data-state", "still");
            $(pokemonImg).attr("data-still", imgStill);
            $(pokemonImg).attr("data-gif", imgGif);
            $(pokemonImg).attr("src", imgStill);
            $(pokemonImg).attr("alt", imgAlt);
            $(imgDiv).addClass("float-this");
            $(imgDiv).append(ratingDiv);
            $(imgDiv).append(pokemonImg);
            $("#pokemon").append(imgDiv);
        }
    });
});

// click listener for each image that changes the image from still to gif or vice versa
$(document).on("click", ".pokemon-images", function () {
    var state = $(this).attr("data-state");
    var still = $(this).attr("data-still");
    var gif = $(this).attr("data-gif")
    if (state === "still") {
        $(this).attr("src", gif);
        $(this).attr("data-state", "gif");
    } else {
        $(this).attr("src", still);
        $(this).attr("data-state", "still");
    }
});

// call render buttons function to render the original buttons
renderButtons();