let url = "http://swapi.dev/api/planets/?page=1"
getData(url);
tableSwitch();



function createTable(data){
    let tableData = data.results
    let table = document.getElementById("table-data");
    table.innerHTML = ""

    for (let i = 0; i < 10; i++) {
        table.innerHTML +=
            '<tr><td>' + tableData[i].name +
            '</td><td>' + tableData[i].diameter +
            '</td><td>' + tableData[i].climate +
            '</td><td>' + tableData[i].terrain +
            '</td><td>' + tableData[i].surface_water +
            '</td><td>' + tableData[i].population +
            '</td><td>' + '<button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="residents('+i+')" id="residents'+i+'">Residents</button>' +
            '</td><td style="display: none">' + tableData[i].residents +'</td></tr>';
    }

}


function getData(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => createTable(data));
}


function tableSwitch(){
    let currentPlanetPage = 1;
    console.log(currentPlanetPage)
    let prev = document.getElementById("prev");
    let next = document.getElementById("next");

    next.addEventListener("click", function () {
        currentPlanetPage++;
        if(currentPlanetPage<7) {
            getData(`http://swapi.dev/api/planets/?page=${currentPlanetPage}`)
        }
        else {
            currentPlanetPage--;
            alert("No more planet in the galaxy!")
        }
    })
    prev.addEventListener("click", function () {
        currentPlanetPage--;
        if(currentPlanetPage>0) {
            getData(`http://swapi.dev/api/planets/?page=${currentPlanetPage}`)
        }
        else {
            currentPlanetPage++;
            alert("No more planet in the galaxy!")
        }

    })
}


function residents(d){
    let table = document.getElementById("res-data")
    table.innerHTML = ""
    let resButton = document.getElementById(`residents${d}`)
    let buttonName = resButton.parentElement.parentElement.children[7].innerText
    let urls = buttonName.split(",")
    let length = urls.length
    for(let item = 0; item < length; item++){
        residentsFetch(urls[item])

    }


}

function residentsFetch(buttonName){
    fetch(buttonName)
    .then(response => response.json())
    .then(data => resindentsTable(data))

}


function resindentsTable(data){
    let tableData = data
    let table = document.getElementById("res-data")

    table.innerHTML +=
        '<div id="residents-data"><tr id="row"><td>' + tableData.name +
        '</td><td>' + tableData.height +
        '</td><td>' + tableData.skin_color +
        '</td><td>' + tableData.hair_color +
        '</td><td>' + tableData.eye_color +
        '</td><td>' + tableData.birth_year +
        '</td><td>' + tableData.gender + '</td></tr></div>';

}

// function userLogin(){
//     let username = document.getElementById("login-username")
//     let userpw = document.getElementById("login-password")
//     let button = document.getElementById("login-button")
//
//     button.addEventListener("click", ()=>{
//         // impo
//     })
//
// }

// import {hash} from "./database.js"

// function createUser(){
//     let username = document.getElementById("username")
//     let userpw = document.getElementById("userpw")
//     let button = document.getElementById("create-button")
//
//     button.addEventListener("click", ()=>{
//         hash(username, userpw)
//     })
// }


