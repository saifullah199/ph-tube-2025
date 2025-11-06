// console.log('this is my marriage day')

const showLoader =() => {
    document.getElementById("loader").classList.remove('hidden')
    document.getElementById("video-container").classList.add('hidden')
}

const hideLoader =() => {
    document.getElementById("loader").classList.add('hidden')
    document.getElementById("video-container").classList.remove('hidden')
}
// removing active class
function removeActiveClass(){
    const activeButtons = document.getElementsByClassName("active")

    for (let btn of activeButtons){
        btn.classList.remove("active")
    }
    console.log(activeButtons)
}

// load categories on buttons dynamically
function loadCategories(){
    // fetch the data

    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res)=> res.json())
    .then((data) => displayCategories(data.categories))
}

// load category videos by id

const loadCategoryVideos = (id) => {
    showLoader();
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}
    
    `;
    console.log(url)

    fetch(url)
    .then((res) =>res.json())
    .then((data)=> {
        removeActiveClass();
        const clickedButton = document.getElementById(`btn-${id}`)
        clickedButton.classList.add("active")

        console.log(clickedButton)
        displayVideos(data.category)
    })
}

// load video details dynamically
const loadVideoDetails =(videoId) => {
    console.log(videoId)
    const url =`
    https://openapi.programming-hero.com/api/phero-tube/video/${videoId}
    `;
    fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideoDetails(data.video));

}

// display video details 
const displayVideoDetails =(video) => {
    console.log(video);
    document.getElementById("video_details").showModal();
    const detailsContainer = document.getElementById("details-container");

    detailsContainer.innerHTML = `
        <h2>${video.title}</h2>
    `;

};

// display category buttons
function displayCategories(categories){
//    get the container
const categoryCOntainer = document.getElementById("category-container");


// loop operation on Array of object
for (let cat of categories){
    // console.log(cat)
    // create Element
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML= `
    <button id="btn-${cat.category_id}"
            onclick="loadCategoryVideos(${cat.category_id})" 
            class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">
        ${cat.category} 
     </button>
    
    `
    // Append the Element
    categoryCOntainer.appendChild(categoryDiv);

}

}

// loading videos
function loadVideos(searchText = ""){
    showLoader();
    
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((response) => response.json())
    .then((data) => {
        removeActiveClass();
        document.getElementById("btn-all").classList.add("active");
        displayVideos(data.videos)
    })
}

// displaying videos
const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container")
    videoContainer.innerHTML ="";

    if(videos.length == 0){
         videoContainer.innerHTML =`
         <div class="col-span-full flex flex-col justify-center items-center py-20 text-center">
            <img class="w-[120px]" src="assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold"> Oops!! Sorry, There is no content here</h2>
        </div>`
        hideLoader();
        return
    }
    videos.forEach((video) => {
        // console.log(video)

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
            <p class="text-sm text-gray-400 flex gap-1">
                    ${video.authors[0].profile_name}
                    ${video.authors[0].verified == true ? 
                        `<img
                            class="w-5 h-5"
                            src="https://img.icons8.com/?size=96&id=2sZ0sdlG9kWP&format=png" alt="">`
                            : ``}

                    
            </p>
            <p class="text-sm text-gray-400 flex gap-1">${video.others.views} views </p>
        </div>
        </div>
        <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block"> Show Details</button>
    </div>
        `;

        // append

        videoContainer.appendChild(videoCard);
    });
    hideLoader();
}

document.getElementById('search-input').addEventListener("keyup", (e) =>{
    const input = e.target.value;
    loadVideos(input)
})

loadCategories();
