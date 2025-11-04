// console.log('this is my marriage day')


function loadCategories(){
    // fetch the data

    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res)=> res.json())
    .then((data) => displayCategories(data.categories))
}

function displayCategories(categories){
//    get the container

// loop operation on Array of object

// create Element

// Append the Element
}

loadCategories();