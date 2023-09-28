// 1. Sukurti mygtuką, kurį paspaudus ekrane atvaizduojamas atsitiktinis juokelis.

// 2. Sukurti galimybę pasirinkti juokelių kategoriją:
//   2.1. Sukurti formą, kurioje bus <select> elementas.
//   2.2. <select> elementas savyje turės <option> elementus. Juose galima pasirinkti juokelių kategoriją. Šie elementai turi susigeneruoti automatiškai, priklausomai nuo to, kokias kategorijas turi API.

//   2.3. Sukurti mygtuką, kurį paspaudus, sugeneruotų atsitiktinį juokelį pagal pasirinktą kategoriją.

// 3. Sukurti galimybę ieškoti juokelių pagal užklausos frazę.

randomJokeButton = document.querySelector("#random-joke-button");
jokeParagraph = document.querySelector("#joke-paragraph");

randomJokeButton.addEventListener("click", () => {
  fetch("https://api.chucknorris.io/jokes/random")
    .then((res) => res.json())
    .then((joke) => {
      //   const jokeParagraph = document.querySelector("#joke-paragraph");
      jokeParagraph.textContent = joke.value;
    });
});

categoryJokeButton = document.querySelector("#category-joke-btn");
selectCategoryElement = document.querySelector("#select-joke-by-category");

fetch("https://api.chucknorris.io/jokes/categories")
  .then((res) => res.json())
  .then((categories) => {
    categories.forEach((category) => {
      const categoryOption = document.createElement("option");
      categoryOption.setAttribute("value", category);
      categoryOption.textContent = category;
      selectCategoryElement.append(categoryOption);
    });
  });

categoryJokeButton.addEventListener("click", (event) => {
  event.preventDefault();
  const selectedCategory = selectCategoryElement.value;
  fetch(`https://api.chucknorris.io/jokes/random?category=${selectedCategory}`)
    .then((res) => res.json())
    .then((joke) => {
      //   const jokeParagraph = document.querySelector("#joke-paragraph");
      jokeParagraph.textContent = joke.value;
    });
});

queryJokeForm = document.querySelector("#query-joke-form");
queryJokeButton = document.querySelector("#category-joke-btn");
queryInputElement = document.querySelector("#select-joke-by-query");

queryJokeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = queryInputElement.value;
  console.log(query);
  fetch(`https://api.chucknorris.io/jokes/search?query=${query}`)
    .then((res) => res.json())
    .then((joke) => {
      if (joke.result && joke.result.length > 0) {
        const randomIndex = Math.floor(Math.random() * joke.result.length);
        const randomJoke = joke.result[randomIndex];
        // const jokeParagraph = document.querySelector("#joke-paragraph");
        jokeParagraph.textContent = randomJoke.value;
      } else {
        // const jokeParagraph = document.querySelector("#joke-paragraph");
        jokeParagraph.textContent = "There are no jokes with this query";
      }
    });
});

// Padarykime dabar kad galima butu pasirinkti ir kategorija ir irasyti paieskos fraze

categoryQueryJokeForm = document.querySelector("#category-query-joke-form");
selectJokeCategory = document.querySelector("#select-joke-category");
selectJokeQuery = document.querySelector("#select-joke-query");

fetch("https://api.chucknorris.io/jokes/categories")
  .then((res) => res.json())
  .then((categories) => {
    categories.forEach((category) => {
      const categoryOption = document.createElement("option");
      categoryOption.setAttribute("value", category);
      categoryOption.textContent = category;
      selectJokeCategory.append(categoryOption);
    });
  });

categoryQueryJokeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const selectedCategory = selectJokeCategory.value;
  const query = selectJokeQuery.value;

  if (query) {
    fetch(`https://api.chucknorris.io/jokes/search?query=${query}`)
      .then((res) => res.json())
      .then((queryJoke) => {
        if (queryJoke.result && queryJoke.result.length > 0) {
          const categoryFilteredJokes = queryJoke.result.filter((joke) =>
            joke.categories.includes(selectedCategory)
          );

          if (categoryFilteredJokes.length > 0) {
            const randomIndex = Math.floor(
              Math.random() * categoryFilteredJokes.length
            );
            const randomJoke = categoryFilteredJokes[randomIndex];

            jokeParagraph.textContent = randomJoke.value;
          } else {
            jokeParagraph.textContent =
              "There are no jokes in this category with this query";
          }
        } else {
          jokeParagraph.textContent = "There are no jokes with this query";
        }
      });
  } else {
    jokeParagraph.textContent = "Please enter a query";
  }
});
