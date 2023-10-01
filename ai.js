// Dirbtinio intelekto API:
// 1. Sukurti formą, kurioje galima įrašyti asmens vardą.
// 2. Formos submit metu, pagal įrašytą vardą, ekrane atvaizduoti tikėtiną asmens lyti, amžių ir tautybę. Naudoti šiuos API:
// Amžiui - https://agify.io/
// Tautybei - https://nationalize.io/
// Lyčiai - https://genderize.io/

function getPersonInfo() {
  const aiForm = document.querySelector("#ai-form");
  const personNameInputElement = document.querySelector("#person-name");
  const container = document.querySelector("#container");
  aiForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const personName = personNameInputElement.value;

    const promise1 = fetch(`https://api.agify.io?name=${personName}`).then(
      (res) => res.json()
    );
    const promise2 = fetch(
      `https://api.nationalize.io?name=${personName}`
    ).then((res) => res.json());
    const promise3 = fetch(`https://api.genderize.io?name=${personName}`).then(
      (res) => res.json()
    );

    Promise.all([promise1, promise2, promise3]).then(
      ([data1, data2, data3]) => {
        const age = data1.age;
        const nameOutput = document.createElement("h2");
        nameOutput.textContent = personName;
        const ageOutput = document.createElement("p");
        ageOutput.textContent = `Predicted age: ${age} years.`;
        const nationalityOutput = document.createElement("p");
        nationalityOutput.textContent = "";
        if (data2.country.length > 0) {
          const index = Math.floor(Math.random() * data2.country.length);
          const nationality = data2.country[index].country_id;

          nationalityOutput.textContent = `Predicted nationality: ${nationality}.`;
        } else {
          nationalityOutput.textContent = `No data found`;
        }
        const gender = data3.gender;
        const genderOutput = document.createElement("p");
        genderOutput.textContent = `Predicted gender: ${gender}.`;
        container.append(
          nameOutput,
          ageOutput,
          nationalityOutput,
          genderOutput
        );
      }
    );
  });
}

getPersonInfo();
