// console.log('this is my marriage day')


function loadCategories(){
    // fetch the data

    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res)=> res.json())
    .then((data) => displayCategories(data.categories))
}

function displayCategories(categories){
//    get the container
const categoryCOntainer = document.getElementById("category-container");


// loop operation on Array of object
for (let cat of categories){
    console.log(cat)
    // create Element
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML= `
    <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category} </button>
    
    `
    // Append the Element
    categoryCOntainer.appendChild(categoryDiv);

}

}

loadCategories();