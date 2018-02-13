"use strict";

let token = localStorage.getItem("token");

fetch('http://localhost:8080/W3/rest/cheese', {
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Authorization': "Bearer " + token,
        'Content-Type': 'application/json'
    }
})
        .then(function (response) {
            return response.json();
        }
        ).then(function (jsonData) {

    if (jsonData.length < 1) {
        document.getElementById('addresstype').style.display = 'none';
        document.getElementById('admin').style.display = 'none';
        document.getElementById("demo").innerHTML = "You are not an Admin, no options available";
    }

});