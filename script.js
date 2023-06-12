const NASAapiKey = "3wnxOfRJD4eT7ejeRvcgQUIIKAANUyqtIBVq62Iz";
const unsplashAPIkey = "UhChBZg41aaNCvsaG2V9bstJAN_MB7U8UuVkqoOtDJQ"
const form = document.querySelector("form");

const apodDisplayElement = document.querySelector("#apodDisplay");
const apodDescriptionElement = document.querySelector("#apodDescription");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const dateInput = document.getElementById("date").value;
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${NASAapiKey}&date=${dateInput}`;

  // Show loading wheel
  apodDisplayElement.src = "https://upload.wikimedia.org/wikipedia/commons/5/53/Loading-red-spot.gif";

  fetch(apiUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not OK.');
      }
    })
    .then((data) => {
      const hdUrl = data.hdurl;
      const description = data.explanation;

      if (hdUrl === undefined) {
        throw new Error('HD URL is undefined.');
      }

      apodDisplayElement.src = hdUrl;
      apodDisplayElement.alt = description;
      apodDescriptionElement.textContent = description;

      console.log("NASA APOD HD URL:", hdUrl);
    })
    .catch((error) => {
      console.log("Error:", error);
      
      // Fetch a random space-related image
      fetch(`https://api.unsplash.com/photos/random?query=space&orientation=landscape&client_id=${unsplashAPIkey}`)
        .then((response) => response.json())
        .then((data) => {
          const randomImageUrl = data.urls.regular;
          
          // Display the random space-related image
          apodDisplayElement.src = randomImageUrl;
          apodDisplayElement.alt = "Random Space Image";
          apodDescriptionElement.textContent = "Random space-related image (apod undefined for this date)";

          console.log("Random Space Image URL:", randomImageUrl);
        })
        .catch((error) => {
          console.log("Error fetching random space image:", error);
        });
    });
});

// nb a good date to test an undefined apod hdurl response is 06/06/23 and 31/05/2023