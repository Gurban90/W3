"use strict";

let token = localStorage.getItem("token");

fetch('http://localhost:8080/W3/rest/client', {
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
        document.getElementById('form').style.display = 'none';
    }
    let el;
    el = document.getElementById('clients');
    var data = " ";
    for (var i = 0; i < jsonData.length; i++) {
        data += '<tr>';
        data += '<td>' + jsonData[i].clientID + '</td>' + '<td>' + jsonData[i].firstname + '</td>' + '<td>' + jsonData[i].lastname + '</td>' + '<td>' + jsonData[i].email + '</td>';
        data += '<td><button onclick="view(' + jsonData[i].clientID + ')">View</button></td>';
        data += '<td><button onclick="edit(' + jsonData[i].clientID + ')">Edit</button></td>';
        data += '<td><button onclick="remove(' + jsonData[i].clientID + ')">Delete</button></td>';
        data += '</tr>';
    }
    return el.innerHTML = data;
});

fetch('http://localhost:8080/W3/rest/client/client', {
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
    let el;
    el = document.getElementById('clients');
    var data = " ";
    
    data += '<tr>';
    data += '<td>' + jsonData.clientID + '</td>' + '<td>' + jsonData.firstname + '</td>' + '<td>' + jsonData.lastname + '</td>' + '<td>' + jsonData.email + '</td>';
    data += '<td><button onclick="view(' + jsonData.clientID + ')">View</button></td>';
    data += '<td><button onclick="edit(' + jsonData.clientID + ')">Edit</button></td>';
    data += '<td><button onclick="remove(' + jsonData.clientID + ')">Delete</button></td>';
    data += '</tr>';
    return el.innerHTML = data;

});


function create() {
    var a = document.getElementById("firstname").value;
    var b = document.getElementById("lastname").value;
    var c = document.getElementById("email").value;
    var client = {firstname: a, lastname: b, email: c};

    fetch('http://localhost:8080/W3/rest/client', {
        method: 'POST',
        body: JSON.stringify(client),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Authorization': "Bearer " + token,
            'Content-Type': 'application/json'
        }
    }).then(function () {
        window.location.replace("http://localhost:8080/W3/client.html");
    });
}
;

function remove(id) {
    document.getElementById("form").innerHTML = " ";

    fetch('http://localhost:8080/W3/rest/client' + '/' + id, {
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
        let el;
        el = document.getElementById('clients');
        var data = " ";

        data += '<tr>';
        data += '<td>' + jsonData.clientID + '</td>' + '<td>' + jsonData.firstname + '</td>' + '<td>' + jsonData.lastname + '</td>' + '<td>' + jsonData.email + '</td>';
        data += '</tr>';

        document.getElementById("demo").innerHTML = "Delete Client with id: " + id + "? This will delete the whole account!";

        var button = document.createElement("button");
        button.innerHTML = "Delete";
        document.getElementById("demo").appendChild(button);
        button.addEventListener("click", function () {
            fetch('http://localhost:8080/W3/rest/client' + '/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Authorization': "Bearer " + token,
                    'Content-Type': 'application/json'
                }
            }).then(function () {
                window.location.replace("http://localhost:8080/W3/client.html");
            });
        });
        return el.innerHTML = data;

    });
}



function edit(id) {
    document.getElementById("form").innerHTML = " ";
    document.getElementById("demo").innerHTML = "What do you want to edit?";
    document.getElementById('form2').style.display = 'block';


    fetch('http://localhost:8080/W3/rest/client' + '/' + id, {
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
        let el;
        el = document.getElementById('clients');
        var data = " ";

        data += '<tr>';
        data += '<td>' + jsonData.clientID + '</td>' + '<td>' + jsonData.firstname + '</td>' + '<td>' + jsonData.lastname + '</td>' + '<td>' + jsonData.email + '</td>';
        data += '</tr>';
        return el.innerHTML = data, document.getElementById('efirstname').value = jsonData.firstname,
                document.getElementById('elastname').value = jsonData.lastname, document.getElementById('eemail').value = jsonData.email,
                document.getElementById('editid').value = jsonData.clientID;
    });
}
;

function editor() {
    var aa = document.getElementById("editid").value;
    var bb = document.getElementById("efirstname").value;
    var cc = document.getElementById("elastname").value;
    var dd = document.getElementById("eemail").value;
    var client = {clientID: aa, firstname: bb, lastname: cc, email: dd};
    fetch('http://localhost:8080/W3/rest/client', {
        method: 'PUT',
        body: JSON.stringify(client),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Authorization': "Bearer " + token,
            'Content-Type': 'application/json'
        }
    }).then(function () {
        window.location.replace("http://localhost:8080/W3/client.html");
    });
}
;


function view(id) {
    document.getElementById("form").innerHTML = " ";
    fetch('http://localhost:8080/W3/rest/client' + '/' + id, {
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
        let el;
        el = document.getElementById('clients');
        var data = " ";
        document.getElementById("demo").innerHTML = "Details Client named: " + jsonData.clientID + " " + jsonData.firstname + " " + jsonData.lastname;

        data += '<tr>';
        data += '<td>' + jsonData.clientID + '</td>' + '<td>' + jsonData.firstname + '</td>' + '<td>' + jsonData.lastname + '</td>' + '<td>' + jsonData.email + '</td>';
        data += '</tr>';

        var tbody = document.getElementById('addresses');
        var data2 = " ";
        data2 += '<tr>';
        data2 += '<th>' + 'AddressID' + '</th>' +
                '<th>' + 'Streetname' + '</th>' +
                '<th>' + 'Housenumber' + '</th>' +
                '<th>' + 'HouseNumberAddition' + '</th>' +
                '<th>' + 'Postal Code' + '</th>' +
                '<th>' + 'City' + '</th>' +
                '<th>' + 'Addresstype' + '</th>';

        data2 += '</tr>';


        for (var i = 0; i < jsonData.addressCollection.length; i++) {
            data2 += '<tr>';
            data2 += '<td>' + jsonData.addressCollection[i].addressID + '</td>' + '<td>' + jsonData.addressCollection[i].streetname + '</td>' +
                    '<td>' + jsonData.addressCollection[i].housenumber + '</td>' + '<td>' + jsonData.addressCollection[i].housenumberAddition + '</td>' +
                    '<td>' + jsonData.addressCollection[i].postalcode + '</td>' + '<td>' + jsonData.addressCollection[i].city + '</td>' +
                    '<td>' + jsonData.addressCollection[i].addresstypeID.typename + '</td>';
            data2 += '</tr>';
        }

        var tbody3 = document.getElementById('orders');
        var data3 = " ";
        data3 += '<tr>';
        data3 += '<th>' + 'OrdersID' + '</th>' +
                '<th>' + 'Order Date' + '</th>' +
                '<th>' + 'Total Price' + '</th>' +
                '<th>' + 'End Date' + '</th>';


        data3 += '</tr>';
        for (var i = 0; i < jsonData.ordersCollection.length; i++) {
            var x = new Date(jsonData.ordersCollection[i].currentdate).toLocaleDateString();
            var y = new Date(jsonData.ordersCollection[i].enddate).toLocaleDateString();
            data3 += '<tr>';
            data3 += '<td>' + jsonData.ordersCollection[i].ordersID + '</td>' + '<td>' + x + '</td>' +
                    '<td>' + jsonData.ordersCollection[i].totalprice + '</td>' + '<td>' + y + '</td>';
            data3 += '</tr>';
        }

        return el.innerHTML = data, tbody.innerHTML = data2, tbody3.innerHTML = data3;

    });
}

function gotomain() {
    document.getElementById("demo").innerHTML = "Go to the main menu to add an account!";
}
;