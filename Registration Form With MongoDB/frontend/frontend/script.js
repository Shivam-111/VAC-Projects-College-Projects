const form = document.getElementById("studentForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        age: document.getElementById("age").value,
        course: document.getElementById("course").value
    };

    const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    });

    const data = await response.json();

    alert(data.message);
});