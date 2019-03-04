
//Retrieves a fact about a number from the Numbers API.
async function getNumFact(num){
    const fav_num_resp = await $.ajax({
        type: "GET",
        url: `http://numbersapi.com/${num}?json`
    })
}

async function getMultipleNums(...args){
    const multiple_nums = await $.ajax({
        type: "GET",
        url: `http://numbersapi.com/${[...args]}?json`,
        success: handleResponse
    });
}

function handleResponse(resp){
    let $container = $("#num-facts-container")
    for (let num in resp){
        let p = `<p>${resp[num]["text"]}</p>`;
        $container.append(p);
    }
}

$("#number-input").on("submit", async function(e){
    e.preventDefault()
    $("num-facts-container").empty()

    nums = $("#fav-numbers").val()
    await getMultipleNums(nums)
})



