let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");

//hiding the result div due to it changing the search box size initially
result.style.display = "none";


searchBtn.addEventListener("click", () => {
    let userInp = document.getElementById("user-inp").value;
    if (userInp.length == 0) {
        result.innerHTML = `
            <h3>Field Cannot Be Empty</h3>
            `
    } else {
        fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + userInp)
        .then(res => res.json())
        .then(data => {
            let myMeal = data.meals[0];
            console.log(myMeal);
            console.log(myMeal.strMealThumb);
            console.log(myMeal.strMeal);
            console.log(myMeal.strArea);
            console.log(myMeal.strInstructions);
            let count = 1;
            let ingredients = [];
            for (let i in myMeal) {
                let ingredient = "";
                let measure ="";
                if(i.startsWith ("strIngredient") && myMeal[i]) {
                    ingredient =myMeal[i];
                    measure = myMeal[`strMeasure` + count];
                    count += 1;
                    ingredients.push(`${measure} ${ingredient}`)
                }
            }
            console.log(ingredients);
            document.querySelector("img").src = myMeal.strMealThumb;
            document.querySelector("h1").innerHTML = myMeal.strMeal;
            document.querySelector("p").innerHTML = myMeal.strArea;
            let list = document.getElementById("ingredientsList");
            ingredients.forEach((item) => {
                let li = document.createElement("li");
                li.innerText = item;
                list.appendChild(li);
            })

            //displaying the result div after data retrieved
            result.style.display = "block";

        
            
        })
    }
})