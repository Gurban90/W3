"use strict";

let token = localStorage.getItem("token");

fetch('http://localhost:8080/W3/rest/account', {
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
    document.getElementById("demo").innerHTML = "To delete your account, go to client and click on delete next to your clientaccount.";
    let el;
    el = document.getElementById('accounts');
    var data = " ";
    for (var i = 0; i < jsonData.length; i++) {
        data += '<tr>';
        data += '<td>' + jsonData[i].accountID + '</td>' + '<td>' + jsonData[i].username + '</td>' + '<td>' + jsonData[i].password + '</td>' +
                '<td>' + jsonData[i].theRole + '</td>';
        data += '<td><button onclick="view(' + jsonData[i].accountID + ')">View</button></td>';
        data += '<td><button onclick="edit(' + jsonData[i].accountID + ')">Edit</button></td>';
        data += '</tr>';
    }
    return el.innerHTML = data;
});

fetch('http://localhost:8080/W3/rest/account/client', {
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
    el = document.getElementById('accounts');
    var data = " ";

    data += '<tr>';
    data += '<td>' + jsonData.accountID + '</td>' + '<td>' + jsonData.username + '</td>' + '<td>' + jsonData.password + '</td>' +
            '<td>' + jsonData.theRole + '</td>';
    data += '<td><button onclick="view(' + jsonData.accountID + ')">View</button></td>';
    data += '<td><button onclick="edit(' + jsonData.accountID + ')">Edit</button></td>';
    data += '</tr>';

    return el.innerHTML = data;
});


function edit(id) {

    fetch('http://localhost:8080/W3/rest/account' + '/' + id, {
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
        el = document.getElementById('accounts');
        var data = " ";
        var client = " ";
        if (jsonData.clientID === null) {
            document.getElementById("demo").innerHTML = "Before you can edit your account, please add your client information.";
        } else {
            client = jsonData.clientID.clientID;
            document.getElementById("demo").innerHTML = "Please edit your password.?";
            document.getElementById('form2').style.display = 'block';
        }

        data += '<tr>';
        data += '<td>' + jsonData.accountID + '</td>' + '<td>' + jsonData.username + '</td>' + '<td>' + jsonData.password + '</td>' +
                '<td>' + jsonData.theRole + '</td>';
        data += '</tr>';
        return el.innerHTML = data, document.getElementById('id').value = jsonData.accountID, document.getElementById('username').value = jsonData.username,
                document.getElementById('password').value = jsonData.password, document.getElementById('role').value = jsonData.theRole,
                document.getElementById('client').value = client;
    });
}
;

function editor() {
    var aa = document.getElementById("id").value;
    var bb = document.getElementById("username").value;
    var cc = document.getElementById("password").value;
    var dd = document.getElementById("role").value;
    var ee = document.getElementById("client").value;

    editaccount = {accountID: aa, username: bb, password: cc, theRole: dd, clientID: {"clientID": ee}};


    fetch('http://localhost:8080/W3/rest/account', {
        method: 'PUT',
        body: JSON.stringify(editaccount),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Authorization': "Bearer " + token,
            'Content-Type': 'application/json'
        }
    }).then(function () {
        localStorage.removeItem('token');
        window.location.replace("http://localhost:8080/W3/account.html");
    });
}
;

function view(id) {
    fetch('http://localhost:8080/W3/rest/account' + '/' + id, {
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
        el = document.getElementById('accounts');
        var data = " ";
        document.getElementById("demo").innerHTML = "Details Account number: " + jsonData.accountID;

        var client = "";
        if (jsonData.clientID == null) {
            client = "none";
        } else {
            client = jsonData.clientID.clientID;
        }

        data += '<tr>';
        data += '<td>' + jsonData.accountID + '</td>' + '<td>' + jsonData.username + '</td>' + '<td>' + jsonData.password + '</td>' +
                '<td>' + jsonData.theRole + '</td>' + '<td>' + "Client : " + client + '</td>';
        data += '</tr>';

        return el.innerHTML = data;
    });
}

function gotomain() {
    document.getElementById("demo").innerHTML = "Go to the main menu to add an account!";
}
;