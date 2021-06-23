let url = "http://swapi.dev/api/planets/?page=1"
getData(url);
tableSwitch();



function createTable(data){
    let tableData = data.results
    let table = document.getElementById("table");
    for (let ctr = 0; ctr < 10; ctr++) {
        table.innerHTML +=
            '<tr id="row"><td>' + tableData[ctr].name +
            '</td><td>' + tableData[ctr].diameter +
            '</td><td>' + tableData[ctr].climate +
            '</td><td>' + tableData[ctr].terrain +
            '</td><td>' + tableData[ctr].surface_water +
            '</td><td>' + tableData[ctr].population +
            '</td><td>' + '<button type="submit" onclick="residents('+ctr+')" id="residents'+ctr+'">Residents</button>' +
            '</td><td style="display: none">' + tableData[ctr].residents +'</td></tr>';
    }

}


function getData(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => createTable(data));
}


function tableSwitch(){
    let n = 1;
    let prev = document.getElementById("prev");
    let next = document.getElementById("next");
    next.addEventListener("click", function (){

        n++;
        getData(`http://swapi.dev/api/planets/?page=${n}`)


    })
    prev.addEventListener("click", function (){

        getData(`http://swapi.dev/api/planets/?page=${(n-1)}`)


    })
}


function residents(d){
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
    let table = document.getElementById("table-person")


    table.innerHTML +=
        '<tr id="row"><td>' + tableData.name +
        '</td><td>' + tableData.height +
        '</td><td>' + tableData.skin_color +
        '</td><td>' + tableData.hair_color +
        '</td><td>' + tableData.eye_color +
        '</td><td>' + tableData.birth_year +
        '</td><td>' + tableData.gender + '</td></tr>';

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


