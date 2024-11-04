$(".menu i.sh").on("click",function(){
    $(".aside").css("margin-left","250px");
    $("aside").css("left","0px");
    $(".hi").removeClass("d-none");
    $(this).addClass("d-none");
    $("ul").slideDown(1000);
    
})
$(".hi").on("click",function(){
    $(".aside").css("margin-left","0px");
    $("aside").css("left","-250px");
   $(this).addClass("d-none");
   $(".menu i.sh").removeClass("d-none");
   $("ul").slideUp();
});

let searchInput= document.querySelector("input[type='search']");
let inputName= document.querySelector("input[type='text']");
let inputEmail= document.querySelector("input[type='email']");
let inputPhone= document.querySelector("input[type='phone']");
let inputPassword= document.querySelector("input[type='password']");
let inputAge= document.querySelector("input[type='age']");
let currentCondition="now_playing";
let newsContainer=$("#movies");
let condition= document.querySelectorAll("ul li a");

async function getData(m) {
    
    if(m=="trending"){
        $(".loading").removeClass("d-none").addClass("d-flex");
        const response= await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
        const data= await response.json();
        console.log(data.results);
        $(".loading").removeClass("d-flex").addClass("d-none");
        displayResult(data.results);

    }
    else{
    $(".loading").removeClass("d-none").addClass("d-flex");
    const response= await fetch(`https://api.themoviedb.org/3/movie/${m}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
    const data= await response.json();
    console.log(data.results);
    $(".loading").removeClass("d-flex").addClass("d-none");
    displayResult(data.results);
     }
   
}


function displayResult(arr){
newsContainer.empty();

    for(let i=0;i<arr.length;i++){
 newsContainer.append(`
     <div class="col-md-4">
                    <div class="card border-0 overflow-hidden position-relative ">
                        <img src="https://image.tmdb.org/t/p/w500${arr[i].poster_path}" alt="" class="w-100 ">
                        <div class="layer position-absolute  text-white">
                            <div class="card-body">
                            <h3 class="text-center my-3 ">${arr[i].title}</h3>
                            <p class="text-center mt-4">${arr[i].overview}</p>
                            <p class="ms-2 mt-4">${arr[i].release_date}</p>
                            <p class="ms-2 special mt-5">${arr[i].vote_average}</p>
                            </div>
                        </div>
                    </div>
     </div>
     
    
    `)
}
}


getData(currentCondition);

for(let i=0;i<condition.length-1;i++){
    condition[i].addEventListener("click",function(e){
     
     currentCondition=e.target.getAttribute("data-name");
     console.log(currentCondition);
     
     getData(currentCondition);
     
    })
}

$(".scroll").on("click",function(){
    $("html").animate({scrollTop:0},2000);
});






var regexNamebookmark = /^[a-zA-Z]{3,}$/;
var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var regexPhone = /^(\+2)?01[0125][0-9]{8}$/;
var regexPassword=/^((?=\S*?[a-zA-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
var rejexAge=/^(1[0-9]|[2-9]\d)$/
function validate(regex , input){
    if(regex.test(input.value)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
 }


 async function fetchByMovieName(movieName) {
    try {
        $(".loading").removeClass("d-none").addClass("d-flex");
        var response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&query=${movieName}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        var data = await response.json();
        $(".loading").removeClass("d-flex").addClass("d-none");
        return data;
    } catch (error) {
        alert("No meal with that name or there was a network error: " + error.message);
        console.error(error);
    }
}





 function attachSearchListener() {
    $(document).on("input", ".searchByName", async function() {
        let myString = $(this).val().trim();
        
        if (myString) {
            try {
                let data = await fetchByMovieName(myString);
                if (data && data.results) {
                    $(".new-container").empty(); 
                    displayResult(data.results);
                    
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        } else {
            console.log("Input is empty");
            $(".new-container").empty();
        }
    });
}

$(function(){

    attachSearchListener(); 
    
    
})















/*$("input[type='search']").on("keyup",function(e,arr){
    newsContainer.empty();
for (var i = 0; i < arr.length; i++) {
if(arr[i].title.toLowerCase().includes(searchInput.value.toLowerCase()))
    {
    displayResult(i);

}

}
    
})*/



















/* function searchMovies(arr) {
newsContainer.empty();
for (var i = 0; i < arr.length; i++) {
if(arr[i].title.toLowerCase().includes(searchInput.value.toLowerCase()))
    {
    displayResult(arr[i]);

}

}
 }*/
/*currentCondition=e.target.innerText;
       console.log(currentCondition);
       getData(currentCondition);*/