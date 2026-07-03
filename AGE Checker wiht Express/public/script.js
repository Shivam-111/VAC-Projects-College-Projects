// const ageInput = document.getElementById("age");
// const checkBtn = document.getElementById("checkBtn");
// const result = document.getElementById("result");

// checkBtn.addEventListener("click", () => {

//     const age = ageInput.value;

//     result.textContent = `Your Age is: ${age}`;

// });





const ageInput = document.getElementById("age");
const checkBtn = document.getElementById("checkBtn");
const result = document.getElementById("result");

checkBtn.addEventListener("click", async () => {

    const age = ageInput.value;

    const response = await fetch("/check-age", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            age: age
        })
    });

    const data = await response.text();

    result.textContent = data;

});