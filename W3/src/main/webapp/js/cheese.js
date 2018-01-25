"use strict";

fetch('http://localhost:8080/W3/rest/cheese')
        .then(function (response) {
            return response.json();
        }
        ).then(function (jsonData) {
    let el;
    el = document.getElementById('cheeses');
    var data = " ";
    for (var i = 0; i < jsonData.length; i++) {
        data += '<tr>';
        data += '<td>' + jsonData[i].cheeseID + '</td>' + '<td>' + jsonData[i].name + '</td>' + '<td>' + jsonData[i].price + '</td>' + '<td>' + jsonData[i].stock + '</td>';
        data += '<td><button onclick="view(' + jsonData[i].cheeseID + ')">View</button></td>';
        data += '<td><button onclick="edit(' + jsonData[i].cheeseID + ')">Edit</button></td>';
        data += '<td><button onclick="remove(' + jsonData[i].cheeseID + ')">Delete</button></td>';
        data += '</tr>';
    }
    return el.innerHTML = data;
});

function create() {
    var a = document.getElementById("name").value;
    var b = document.getElementById("price").value;
    var c = document.getElementById("stock").value;
    var cheese = {name: a, price: b, stock: c};

    fetch('http://localhost:8080/W3/rest/cheese', {
        method: 'POST',
        body: JSON.stringify(cheese),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }).then(function () {
        window.location.replace("http://localhost:8080/W3/cheese.html");
    });
}
;

function remove(id) {
    document.getElementById("form").innerHTML = " ";

    fetch('http://localhost:8080/W3/rest/cheese' + '/' + id)
            .then(function (response) {
                return response.json();
            }
            ).then(function (jsonData) {
                let el;
        el = document.getElementById('cheeses');
        var data = " ";

        data += '<tr>';
        data += '<td>' + jsonData.cheeseID + '</td>' + '<td>' + jsonData.name + '</td>' + '<td>' + jsonData.price + '</td>' + '<td>' + jsonData.stock + '</td>';
        data += '</tr>';

        if (jsonData.orderdetailCollection.length === 0) {
            document.getElementById("demo").innerHTML = "Delete Cheese with id: " + id + "?";

            var button = document.createElement("button");
            button.innerHTML = "Delete";
            document.getElementById("demo").appendChild(button);
            button.addEventListener("click", function () {
                fetch('http://localhost:8080/W3/rest/cheese' + '/' + id, {
                    method: 'DELETE'
                }).then(function () {
                    window.location.replace("http://localhost:8080/W3/cheese.html");
                });
            });
            return el.innerHTML = data;
        } else {
            var data = " ";
            document.getElementById("demo").innerHTML = "Cannot delete cheese, it is currently in use.";
        }
    });
}



function edit(id) {
    document.getElementById("form").innerHTML = " ";
    document.getElementById("demo").innerHTML = "What do you want to edit?";
    document.getElementById('form2').style.display = 'block';


    fetch('http://localhost:8080/W3/rest/cheese' + '/' + id)
            .then(function (response) {
                return response.json();
            }
            ).then(function (jsonData) {
                let el;
        el = document.getElementById('cheeses');
        var data = " ";

        data += '<tr>';
        data += '<td>' + jsonData.cheeseID + '</td>' + '<td>' + jsonData.name + '</td>' + '<td>' + jsonData.price + '</td>' + '<td>' + jsonData.stock + '</td>';
        data += '</tr>';
        return el.innerHTML = data, document.getElementById('editname').value = jsonData.name,
                document.getElementById('editprice').value = jsonData.price, document.getElementById('editstock').value = jsonData.stock,
                document.getElementById('editid').value = jsonData.cheeseID;
    });
}
;

function editor() {
    var aa = document.getElementById("editid").value;
    var bb = document.getElementById("editname").value;
    var cc = document.getElementById("editprice").value;
    var dd = document.getElementById("editstock").value;
    var cheese = {cheeseID: aa, name: bb, price: cc, stock: dd};
    fetch('http://localhost:8080/W3/rest/cheese', {
        method: 'PUT',
        body: JSON.stringify(cheese),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }).then(function () {
        window.location.replace("http://localhost:8080/W3/cheese.html");
    });
}
;


function view(id) {
    document.getElementById("form").innerHTML = " ";
    fetch('http://localhost:8080/W3/rest/cheese' + '/' + id)
            .then(function (response) {
                return response.json();
            }
            ).then(function (jsonData) {
                let el;
        el = document.getElementById('cheeses');
        var data = " ";
        document.getElementById("demo").innerHTML = "Details Cheese named: " + jsonData.name;

        data += '<tr>';
        data += '<td>' + jsonData.cheeseID + '</td>' + '<td>' + jsonData.name + '</td>' + '<td>' + jsonData.price + '</td>' + '<td>' + jsonData.stock + '</td>';
        data += '</tr>';

        return el.innerHTML = data;
    });
}

function gotomain() {
    document.getElementById("demo").innerHTML = "Go to the main menu to add an account!";
}
;