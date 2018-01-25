"use strict";

function create() {
    document.getElementById('form').style.display = 'block';
}

function check() {
    let h = document.getElementById("username").value;
    let k = document.getElementById("password").value;
    
    fetch('http://localhost:8080/W3/rest/account')
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
    }).then(function () {
        window.location.replace("http://localhost:8080/W3/index.html");
    });
}
;