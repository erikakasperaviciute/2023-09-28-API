// Dogs API:
// Nuoroda: https://dog.ceo/dog-api/

// 1. Sukurti formą, kuri leidžia pasirinkti šuns veislę ir grąžina atsitiktinę tos veislės nuotrauką.

// 2. Jeigu šuns veislė yra išvestinė (sub-breed), tai šalia ji turėtų būti atvaizduojama parašant pagrindinės veislės pavadinimą (breed) ir šalia išvestinės veislės pavainimą (sub-breed).
// viena kategorija
// antra kategorija
// Bulldog (French)
// Bulldog (English)
// Bulldog (Boston)
// ketvirta kategorija

function getDogByBreed() {
  const dogsForm = document.querySelector("#dogs-by-breed");
  const selectBreedElement = document.querySelector("#dog-breed");
  fetch("https://dog.ceo/api/breeds/list/all")
    .then((res) => res.json())
    .then((breedList) => {
      const allBreeds = breedList.message;
      for (const breed in allBreeds) {
        const breedOption = document.createElement("option");
        breedOption.setAttribute("value", breed);
        breedOption.textContent = breed;
        selectBreedElement.append(breedOption);
      }
    });

  dogsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const selectedBreed = selectBreedElement.value;
    fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
      .then((res) => res.json())
      .then((dogImgList) => {
        const dogImg = dogImgList.message;
        const dogImgElement = document.querySelector("#dog-img-by-breed");
        dogImgElement.setAttribute("src", dogImg);
      });
  });
}

getDogByBreed();

function getDogByBreedAndSubbreed() {
  const dogsForm = document.querySelector("#dogs-by-breed-and-subbreed");
  const selectBreedElement = document.querySelector("#dog-breed-and-subbreed");
  fetch("https://dog.ceo/api/breeds/list/all")
    .then((res) => res.json())
    .then((breedList) => {
      const allBreeds = breedList.message;
      const breedEntries = Object.entries(allBreeds);
      breedEntries.forEach((entry) => {
        const mainBreed = entry[0];
        const subBreeds = entry[1];
        if (subBreeds.length > 0) {
          subBreeds.forEach((subBreed) => {
            const breedOption = document.createElement("option");
            breedOption.setAttribute("value", `${mainBreed}/${subBreed}`);
            breedOption.textContent = `${mainBreed} (${subBreed})`;
            selectBreedElement.append(breedOption);
          });
        } else {
          const breedOption = document.createElement("option");
          breedOption.textContent = mainBreed;
          breedOption.setAttribute("value", mainBreed);
          console.log(breedOption.value);
          selectBreedElement.append(breedOption);
        }
      });
    });
  dogsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const selectedBreed = selectBreedElement.value;
    fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
      .then((res) => res.json())
      .then((dogImgList) => {
        const dogImg = dogImgList.message;
        const dogImgElement = document.querySelector("#dog-img-by-breed");
        dogImgElement.setAttribute("src", dogImg);
      });
  });
}
getDogByBreedAndSubbreed();

// function getDogByBreedAndSubbreed() {
//   const dogsForm = document.querySelector("#dogs-by-breed-and-subbreed");
//   const selectBreedElement = document.querySelector("#dog-breed-and-subbreed");
//   fetch("https://dog.ceo/api/breeds/list/all")
//     .then((res) => res.json())
//     .then((breedList) => {
//       const allBreeds = breedList.message;
//       for (const breed in allBreeds) {
//         const subBreeds = allBreeds[breed];
//         if (subBreeds.length > 0) {
//           subBreeds.forEach((subBreed) => {
//             const breedWithSubBread = `${breed} (${subBreed})`;
//             const subBreedOption = document.createElement("option");
//             subBreedOption.setAttribute("value", `${breed}/${subBreed}`);
//             subBreedOption.textContent = breedWithSubBread;
//             selectBreedElement.append(subBreedOption);
//           });
//         } else {
//           const breedOption = document.createElement("option");
//           breedOption.setAttribute("value", breed);
//           breedOption.textContent = breed;
//           selectBreedElement.append(breedOption);
//         }
//       }
//     });

//   dogsForm.addEventListener("submit", (event) => {
//     event.preventDefault();
//     const selectedBreed = selectBreedElement.value;
//     fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
//       .then((res) => res.json())
//       .then((dogImgList) => {
//         // console.log(dogImgList);
//         const dogImg = dogImgList.message;
//         const dogImgElement = document.querySelector("#dog-img-by-breed");
//         // console.log(dogImg);
//         dogImgElement.setAttribute("src", dogImg);
//       });
//   });
// }

// getDogByBreedAndSubbreed();
