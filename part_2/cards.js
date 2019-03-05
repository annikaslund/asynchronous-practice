// calls deck of cards API and returns a response of a shuffled deck.
async function shuffle_cards(){
    let response = await $.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")

    return response;
}

// draws a card from the deck.
async function draw_card(){
    let deck = await shuffle_cards();
    let deckID = deck.deck_id;
    let response = await $.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)

    return response;
}

// generates HTML for one card
async function generate_card_HTML(){
    let card = await draw_card();
    let HTMLcard = `<img src="${card.cards[0].image}">`;

    $("#cards-container").append(HTMLcard);
}

// on button click, empties card container and adds new card to the container.
$("#draw-card").on("submit", async function(e){
    e.preventDefault()
    $("#cards-container").empty();

    generate_card_HTML();
})