function fetchData(page = 1) {
    const parentDiv = document.getElementById("product-area");
    parentDiv.innerHTML = '';

    fetch(`http://localhost:3000/products/?page=${page}`)
    .then(res => res.json())
    .then(data => {
        for(let i = (data.length - 1); i >= 0; i--) {
            // display it backwards so we can sort it
            if(data[i] !== undefined) {
                const newDiv = document.createElement("div");
                newDiv.classList.add("product");
                newDiv.innerHTML = data[i].serialNumber + " " + data[i].name + " " + data[i].description;
                $(newDiv).appendTo(parentDiv);
            }               
        }
    });
}

function sortPage() {
    const parentDiv = document.getElementById("product-area");
    $('.product').sort(function(a, b) {
        let innerA = a.innerHTML;
        let innerB = b.innerHTML;
        let numberA = innerA.split(" ")[0];
        let numberB = innerB.split(" ")[0];

        if (Number(numberA) < Number(numberB)) {
            return -1;
        } else {
            return 1;
        }
    }).appendTo(parentDiv);
}


function searchPage() {
    const userInput = document.getElementsByClassName("search-input")[0].value;

    if(userInput === "")
        return;

    const productArea = document.getElementById("product-area");
    $(productArea).children().css("display", "none");

    const parentDiv = document.getElementById("search-result-area");
    parentDiv.innerHTML = '';

    fetch(`http://localhost:3000/product/?id=${userInput}`)
    .then(res => res.json())
    .then(data => {
        if(data.length === 0) {
            const newDiv = document.createElement("div");
            newDiv.classList.add("no-results");
            newDiv.innerHTML = "No results found.";
            $(newDiv).appendTo(parentDiv);
            return;
        }
        for(let i = (data.length - 1); i >= 0; i--) {
            // display it backwards so we can sort it
            if(data[i] !== undefined) {
                const newDiv = document.createElement("div");
                newDiv.classList.add("product");
                newDiv.classList.add("search-result");
                newDiv.innerHTML = data[i].serialNumber + " " + data[i].name + " " + data[i].description;
                $(newDiv).appendTo(parentDiv);
            }            
        }
    });

    document.getElementsByClassName("pagination")[0].style.display = "none";
}     

function resetSearchPage() {

    const productArea = document.getElementById("product-area");
    $(productArea).children().css("display", "block");

    const parentDiv = document.getElementById("search-result-area");
    parentDiv.innerHTML = '';

    document.getElementsByClassName("pagination")[0].style.display = "flex";
}

var preLastElement = false;
var page = 1;
function pagination(direction) {

    /*change the numbers of pagination according to direction*/
    
    if((direction === 'left' && Number(document.getElementsByClassName("page-number")[0].innerHTML) === 1) || (direction === 'right' && Number(document.getElementsByClassName("page-number")[0].innerHTML) === 10000000) ) {
        //no action. cant go more left or right
        return;
    }

    if(direction === 'right') {
        document.getElementsByClassName("page-number")[0].innerHTML = Number(document.getElementsByClassName("page-number")[0].innerHTML) + 1;
    }
    else if(direction === 'left') {
        document.getElementsByClassName("page-number")[0].innerHTML = Number(document.getElementsByClassName("page-number")[0].innerHTML) - 1;
    }

    /*change body content*/
    if(direction === 'left')
        page -= 1;
    else if(direction === 'right')
        page += 1;

    fetchData(page);
}