"use strict";

fetch('http://localhost:8080/W3/rest/addresstype')
        .then(function (response) {
            return response.json();
        }
        ).then(function (jsonData) {
            let el;
    el = document.getElementById('addresstypes');
    var data = " ";
    for (var i = 0; i < jsonData.length; i++) {
        data += '<tr>';
        data += '<td>' + jsonData[i].addresstypeID + '</td>' + '<td>' + jsonData[i].typename + '</td>';
        data += '<td><button onclick="view(' + jsonData[i].addresstypeID + ')">View</button></td>';
        data += '<td><button onclick="edit(' + jsonData[i].addresstypeID + ')">Edit</button></td>';
        data += '<td><button onclick="remove(' + jsonData[i].addresstypeID + ')">Delete</button></td>';
        data += '</tr>';
    }
    return el.innerHTML = data;
});

function create() {
    var a = document.getElementById("typename").value;
    var addresstype = {typename: a};

    fetch('http://localhost:8080/W3/rest/addresstype', {
        method: 'POST',
        body: JSON.stringify(addresstype),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }).then(function () {
        window.location.replace("http://localhost:8080/W3/addresstype.html");
    });
};

function remove(id) {
    document.getElementById("form").innerHTML = " ";
    fetch('http://localhost:8080/W3/rest/addresstype' + '/' + id)
            .then(function (response) {
                return response.json();
            }
            ).then(function (jsonData) {
                let el;
        el = document.getElementById('addresstypes');
        var data = " ";

        data += '<tr>';
        data += '<td>' + jsonData.addresstypeID + '</td>' + '<td>' + jsonData.typename + '</td>';
        data += '</tr>';
        if (jsonData.addressCollection.length === 0) {

            document.getElementById("demo").innerHTML = "Delete Addresstype with id: " + id + "?";

            var button = document.createElement("button");
            button.innerHTML = "Delete";
            document.getElementById("demo").appendChild(button);
            button.addEventListener("click", function () {
                fetch('http://localhost:8080/W3/rest/addresstype' + '/' + id, {
                    method: 'DELETE'
                }).then(function () {
                    window.location.replace("http://localhost:8080/W3/addresstype.html");
                });
            });
            return el.innerHTML = data;
        } else {
            var data = " ";
            document.getElementById("demo").innerHTML = "Cannot delete addresstyp, it is currently in use.";
        }

    });
}



function edit(id) {
    document.getElementById("form").innerHTML = " ";
    document.getElementById("demo").innerHTML = "What do you want to edit?";
    document.getElementById('form2').style.display = 'block';


    fetch('http://localhost:8080/W3/rest/addresstype' + '/' + id)
            .then(function (response) {
                return response.json();
            }
            ).then(function (jsonData) {
                let el;
        el = document.getElementById('addresstypes');
        var data = " ";

        data += '<tr>';
        data += '<td>' + jsonData.addresstypeID + '</td>' + '<td>' + jsonData.typename + '</td>';
        data += '</tr>';
        return el.innerHTML = data, document.getElementById('edittypename').value = jsonData.typename,
                document.getElementById('editid').value = jsonData.addresstypeID;
    });
}
;

function editor() {
    var aa = document.getElementById("editid").value;
    var bb = document.getElementById("edittypename").value;
    var addresstype = {addresstypeID: aa, typename: bb};
        fetch('http://localhost:8080/W3/rest/addresstype', {
        method: 'PUT',
        body: JSON.stringify(addresstype),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }).then(function () {
        window.location.replace("http://localhost:8080/W3/addresstype.html");
    });
}
;


function view(id) {
    document.getElementById("form").innerHTML = " ";
    fetch('http://localhost:8080/W3/rest/addresstype' + '/' + id)
            .then(function (response) {
                return response.json();
            }
            ).then(function (jsonData) {
                let el;
        el = document.getElementById('addresstypes');
        var data = " ";
        document.getElementById("demo").innerHTML = "Details Addresstype named: " + jsonData.typename;

        data += '<tr>';
        data += '<td>' + jsonData.addresstypeID + '</td>' + '<td>' + jsonData.typename + '</td>';
        data += '</tr>';

        return el.innerHTML = data;
    });
}

function gotomain(){
    document.getElementById("demo").innerHTML = "Go to the main menu to add an account!";
};