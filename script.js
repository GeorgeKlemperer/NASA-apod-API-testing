const apiKey = "3wnxOfRJD4eT7ejeRvcgQUIIKAANUyqtIBVq62Iz";
const form = document.querySelector("form");

const apodDisplayElement = document.querySelector("#apodDisplay");
const apodDiscriptionElement = document.querySelector("#apodDiscription");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const dateInput = document.getElementById("date").value;
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${dateInput}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const hdUrl = data.hdurl;
      const discription = data.explanation;

      apodDisplayElement.src = hdUrl;
      apodDisplayElement.alt = discription;
      apodDiscriptionElement.textContent = discription;

      console.log("NASA APOD HD URL:", hdUrl);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
});


// nb. good testing date for failed fetch = 06/06/2023
