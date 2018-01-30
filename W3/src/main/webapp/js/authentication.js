function login() {
    
    var a = document.getElementById("username").value;
    var b = document.getElementById("password").value;

    var account = {username: a, password: b};

    fetch('http://localhost:8080/W3/rest/authentication', {
        method: 'POST',
        body: JSON.stringify(account),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
   }).then(function (response) {
        return response.text();
    }
    ).then(function (text) {
        return window.sessionStorage.accessToken = text, window.location.replace("http://localhost:8080/W3/index.html"); 
        
                
    });
}
;