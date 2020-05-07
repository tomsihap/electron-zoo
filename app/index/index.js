const remote = require('electron').remote;
const { BrowserWindow } = require('electron').remote;
const { ipcRenderer } = require('electron');

let showAnimalsInHtml = function(container, list) {
    container.innerHTML = '';

    if (list !== null && list.length > 0) {
        list.forEach(function (animal, index) {
            let animalHtml = '<div class="col-md-4 col-sm-6 mt-1">'+
                                '<div class="card">'+
                                    '<img src="'+animal.photo+'" class="card-img-top" alt="'+animal.name+'">' +
                                    '<div class="card-body">'+
                                        '<h5 class="card-title">'+animal.name+'</h5>'+
                                        '<p class="card-text">'+
                                            '<ul>'+
                                                '<li>Taille: '+animal.size+' cm</li>'+
                                                '<li>Poids: '+animal.weight+' kg</li>'+
                                            '</ul>'+
                                            '<small>'+animal.description+'</small>'+
                                        '</p>'+
                                    '</div>'+
                                '</div>'+
                            '</div>';
            container.innerHTML += animalHtml;
        })
    }
    
}
let animalsArray = JSON.parse(localStorage.getItem('animals'));
const animalsListContainer = document.getElementById('animals-list');
showAnimalsInHtml(animalsListContainer, animalsArray);

const linkAddAnimal = document.getElementById('link-add-animal');

linkAddAnimal.addEventListener('click', () => {

    const winAddAnimal = new BrowserWindow({
        width: 800,
        height: 600,
        maxWidth: 800,
        minWidth: 800,
        maxHeight: 600,
        minHeight: 600,
        parent: remote.getCurrentWindow(),
        webPreferences: {
            nodeIntegration: true
        }
    });

    winAddAnimal.loadFile('app/add-animal/add-animal.html');

    winAddAnimal.show();
});

ipcRenderer.on('animal-added', function () {
    let animalsArray = JSON.parse(localStorage.getItem('animals'));
    const animalsListContainer = document.getElementById('animals-list');
    showAnimalsInHtml(animalsListContainer, animalsArray);
});