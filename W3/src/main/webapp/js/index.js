"use strict";

let g;

document.getElementById("AddClient").onclick = function () {
    createClient2();
};

function create() {
    document.getElementById('form').style.display = 'block';
}

function check() {
    let h = document.getElementById("username").value;
    let k = document.getElementById("password").value;

    fetch('http://localhost:8080/W3/rest/account/index')
            .then(function (response) {
                return response.json();
            }
            ).then(function (jsonData) {

        var x = "";
        for (var i = 0; i < jsonData.length; i++) {
            if (jsonData[i].username == h) {
                alert("Username already in use! Please select another one.");
                var x = "Same Username";
                return x;
            }
        }
        return creator(h, k);
    });
}

function creator(h, k) {
    var a = h;
    var b = k;
    var c = "USER";

    var account = {username: a, password: b, theRole: c};

    fetch('http://localhost:8080/W3/rest/account', {
        method: 'POST',
        body: JSON.stringify(account),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        return response.json();
    }
    ).then(function (jsonData) {

        return createClient(jsonData.accountID);
    });
}
;

function createClient(accountID) {
    document.getElementById('form').style.display = 'none';
    document.getElementById('form2').style.display = 'block';
    document.getElementById('accountID').value = accountID;
}


function createClient2() {
    var a = document.getElementById("firstname").value;
    var b = document.getElementById("lastname").value;
    var c = document.getElementById("email").value;
    let d = document.getElementById("accountID").value;


    var client = {firstname: a, lastname: b, email: c};

    fetch('http://localhost:8080/W3/rest/client' + '/' + d, {
        method: 'POST',
        body: JSON.stringify(client),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        return response.json();
    }
    ).then(function (jsonData) {

        return address(jsonData.clientID);
    });
}
;

function address(clientID) {
    document.getElementById('form').style.display = 'none';
    document.getElementById('form2').style.display = 'none';
    document.getElementById('form3').style.display = 'block';
    document.getElementById('clientID').value = clientID;

    fetch('http://localhost:8080/W3/rest/addresstype')
            .then(function (response) {
                return response.json();
            }
            ).then(function (jsonData) {
        var select = document.getElementById("addresstype");
        for (var i = 0; i < jsonData.length; i++) {
            var opt = jsonData[i].addresstypeID;
            let opttext = jsonData[i].typename;
            var el = document.createElement("option");
            el.textContent = opttext;
            el.value = opt;
            select.appendChild(el);
        }
        return select;
    });
}

function createAddress() {
    var a = document.getElementById("streetname").value;
    var b = document.getElementById("housenumber").value;
    var c = document.getElementById("housenumberaddition").value;
    var d = document.getElementById("postalcode").value;
    var e = document.getElementById("city").value;
    var f = document.getElementById("addresstype").value;
    var g = document.getElementById("clientID").value;
    var address = {streetname: a, housenumber: b, housenumberAddition: c, postalcode: d, city: e, addresstypeID: {"addresstypeID": f},
        clientID: {"clientID": g}};

    fetch('http://localhost:8080/W3/rest/address' + '/' + g, {
        method: 'POST',
        body: JSON.stringify(address),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }).then(function () {
        window.location.replace("http://localhost:8080/W3/index.html");
    });
}
;
