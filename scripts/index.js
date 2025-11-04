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
    // console.log(cat)
    // create Element
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML= `
    <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category} </button>
    
    `
    // Append the Element
    categoryCOntainer.appendChild(categoryDiv);

}

}

function loadVideos(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => displayVideos(data.videos))
}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container")

    videos.forEach((video) => {
        console.log(video)

        const videoCard = document.createElement("div");

        videoCard.innerHTML =`
    <div class="card bg-base-100 shadow-sm">
            <figure class="relative">
                <img
                    class="w-full h-[150px] object-cover"
                    src="${video.thumbnail}"
                    alt="Shoes" />
                <span class="absolute bottom-2 right-2 text-sm rounded text-white bg-black px-2"> 3hrs 56 min ago</span>
            </figure>
        <div class=" flex gap-3 px-0 py-5">
            <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                        <img src="${video.authors[0].profile_picture}" />
                    </div>
                </div>
            </div>
        <div class="intro">
            <h2 class="text-sm font-semibold">Midnight Serenade</h2>
            <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name}
                    <img
                    class="w-5 h-5"
                    src="https://img.icons8.com/?size=96&id=2sZ0sdlG9kWP&format=png" alt="">
            </p>
            <p class="text-sm text-gray-400 flex gap-1">${video.others.views} views </p>
        </div>
        </div>
    </div>
        `;

        // append

        videoContainer.appendChild(videoCard)
    });
}

loadCategories();
loadVideos();