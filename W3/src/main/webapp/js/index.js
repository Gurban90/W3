function create(){
document.getElementById('form').style.display = 'block';
}

function creator() {
    var a = document.getElementById("username").value;
    var b = document.getElementById("password").value;
    var c = "USER";
    
    var address = {username: a, password: b, theRole: c};
    
    fetch('http://localhost:8080/W3/rest/account', {
        method: 'POST',
        body: JSON.stringify(address),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }).then(function () {
        window.location.replace("http://localhost:8080/W3/account.html");
    });
}
;