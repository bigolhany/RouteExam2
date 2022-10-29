

$("#sideBar i").click(function(){
    let boxWidth = $('.box').outerWidth();
    if($("#sideBar").css('left')==='0px'){
        $("#sideBar").animate({left:`-${boxWidth}`},700);

    }
    else{
    $("#sideBar").animate({left:`0px`},700);
    }
})


async function getMainIngredient(){
    apiResponse =await fetch (`https://themealdb.com/api/json/v1/1/search.php?s=`);
    responseData = await apiResponse.json()
    console.log(responseData);
    displayMeals(responseData.meals);
}
 getMainIngredient();




function displayMeals(arr) {

    let meals="";
    for (let i = 0; i <arr.length; i++) {
        meals+=`
        <div class="col-md-6 col-lg-3 my-3 member position-relative text-light">
       
                <div onclick="getMeal('${arr[i].idMeal}')" class="movie shadow rounded position-relative">
                    <div class="post ">
                        <img src="${arr[i].strMealThumb}" alt="" srcset="" class="w-100 rounded">
                    
                    
                        <div class="member-caption  position-absolute top-100 w-100 h-100 text-center">
                        <p class="fs-4 p-2 mealName">${arr[i].strMeal}</p>
                        </div>
                        </div>
                        </div>
                </div>
                </div>
        `
        
    }
    document.querySelector(".row").innerHTML=meals;
}



 function displayMeal(meal){
    let recipes="";
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            recipes += `<li class="my-3 mx-1 p-1 alert-success rounded badge text-bg-primary fs-5">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",") 
    let tagsStr = "" 
    for (let i = 0; i < tags?.length; i++) { 
        tagsStr += `<li class="my-3 mx-1 p-1 alert-danger rounded">${tags[i]}</li>` 
    } 

    let str= `<div class="col-md-4 text-white">
    <img src=${meal.strMealThumb}" alt="" srcset="" class="w-100">
    <h1 class="text-center">${meal.strMeal}</h1>
</div>
<div class="col-md-8 text-white">
                    <h2>Instructions</h2>
                    <p>${meal.strInstructions}</p>
                    <p> <b>Area:</b>  ${meal.strArea}</p>
                    <p><b>Category:</b> ${meal.strCategory}</p>
                    <h3>Recipes : </h3>
                    <ul class="d-flex flex-wrap" id="recipes">

                        
                       


                    </ul>
                    <h3 class="my-2 mx-1 p-1">Tags:</h3>
                    <ul class="d-flex " id="tags">
                        <li class="my-3 mx-1 p-1 alert-danger rounded badge text-bg-warning fs-5">Soup</li>
                    </ul>
                    <a href="#" class="btn btn-success text-white ms-4" target="_blank">${meal.strSource}</a>
                    <a href="#" class="btn btn-danger text-white" target="_blank">${meal.strYoutube}</a>
                </div>
    
    `
    row.innerHTML = str
    document.getElementById("recipes").innerHTML = recipes
    document.getElementById("tags").innerHTML = tagsStr 
} 


 async function getMeal(mealID) {
    
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    meal = await meal.json()
    displayMeal(meal.meals[0])
    
} 




