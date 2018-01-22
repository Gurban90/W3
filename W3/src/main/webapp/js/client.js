fetch('http://localhost:8080/W3/rest/client')
        .then(function (response) {
            return response.json();
        }
        ).then(function (jsonData) {
    this.el = document.getElementById('clients');
    var data = " ";
    for (i = 0; i < jsonData.length; i++) {
        data += '<tr>';
        data += '<td>' + jsonData[i].clientID + '</td>' + '<td>' + jsonData[i].firstname + '</td>' + '<td>' + jsonData[i].lastname + '</td>' + '<td>' + jsonData[i].email + '</td>';
        data += '<td><button onclick="view(' + jsonData[i].clientID + ')">View</button></td>';
        data += '<td><button onclick="edit(' + jsonData[i].clientID + ')">Edit</button></td>';
        data += '<td><button onclick="remove(' + jsonData[i].clientID + ')">Delete</button></td>';
        data += '</tr>';
    }
    return this.el.innerHTML = data;
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
            'Content-Type': 'application/json'
        }
    }).then(function () {
        window.location.replace("http://localhost:8080/W3/client.html");
    });
}
;

function remove(id) {
    document.getElementById("form").innerHTML = " ";

    fetch('http://localhost:8080/W3/rest/client' + '/' + id)
            .then(function (response) {
                return response.json();
            }
            ).then(function (jsonData) {
        this.el = document.getElementById('clients');
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
                    method: 'DELETE'
                }).then(function () {
                    window.location.replace("http://localhost:8080/W3/client.html");
                });
            });
            return this.el.innerHTML = data;
        
    });
}



function edit(id) {
    document.getElementById("form").innerHTML = " ";
    document.getElementById("demo").innerHTML = "What do you want to edit?";
    document.getElementById('form2').style.display = 'block';


    fetch('http://localhost:8080/W3/rest/client' + '/' + id)
            .then(function (response) {
                return response.json();
            }
            ).then(function (jsonData) {
        this.el = document.getElementById('clients');
        var data = " ";

          data += '<tr>';
        data += '<td>' + jsonData.clientID + '</td>' + '<td>' + jsonData.firstname + '</td>' + '<td>' + jsonData.lastname + '</td>' + '<td>' + jsonData.email + '</td>';
        data += '</tr>';
        return this.el.innerHTML = data, document.getElementById('efirstname').value = jsonData.firstname,
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
            'Content-Type': 'application/json'
        }
    }).then(function () {
        window.location.replace("http://localhost:8080/W3/client.html");
    });
}
;


function view(id) {
    document.getElementById("form").innerHTML = " ";
    fetch('http://localhost:8080/W3/rest/client' + '/' + id)
            .then(function (response) {
                return response.json();
            }
            ).then(function (jsonData) {
        this.el = document.getElementById('clients');
        var data = " ";
        document.getElementById("demo").innerHTML = "Details Client named: " + jsonData.clientID +" "+ jsonData.firstname +" "+ jsonData.lastname;

        data += '<tr>';
        data += '<td>' + jsonData.clientID + '</td>' + '<td>' + jsonData.firstname + '</td>' + '<td>' + jsonData.lastname + '</td>' + '<td>' + jsonData.email + '</td>';
        data += '</tr>';

        return this.el.innerHTML = data;
    });
}

function gotomain(){
    document.getElementById("demo").innerHTML = "Go to the main menu to add an account!";
};