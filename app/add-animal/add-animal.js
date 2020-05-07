const remote = require('electron').remote;

const formName = document.getElementById('form-name');
const formSize = document.getElementById('form-size');
const formWeight = document.getElementById('form-weight');
const formDescription = document.getElementById('form-description');
const formPhoto = document.getElementById('form-photo');
const formSend = document.getElementById('form-send');

console.log(formSend)
formSend.addEventListener('click', function () {

    alert("L'animal " + formName.value + " a bien été ajouté.");

    let animal = {
        name: formName.value,
        size: formSize.value,
        weight: formWeight.value,
        description: formDescription.value,
        photo: formPhoto.value,
    }

    let animalsArray = [];

    if (localStorage.getItem('animals') !== null) {
        animalsArray = JSON.parse(localStorage.getItem('animals'));
    }

    animalsArray.push(animal);
    localStorage.setItem("animals", JSON.stringify(animalsArray));

    remote.getCurrentWindow().getParentWindow().send('animal-added');

    // On ferme la fenêtre après avoir enregistré l'animal
    window.close();
})