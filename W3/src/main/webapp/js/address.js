fetch('http://localhost:8080/W3/rest/address')
        .then(function (response) {
            return response.json();
        }
        ).then(function (jsonData) {
        this.el = document.getElementById('Addresses');
    var data = " ";
    for (i = 0; i < jsonData.length; i++) {
        data += '<tr>';
        data += '<td>' + jsonData[i].addressID + '</td>' + '<td>' + jsonData[i].streetname + '</td>' + '<td>' + jsonData[i].housenumber + '</td>' +
                '<td>' + jsonData[i].housenumberAddition + '</td>' + '<td>' + jsonData[i].postalcode + '</td>' + '<td>' + jsonData[i].city + '</td>';              
        data += '<td><button onclick="view(' + jsonData[i].addressID + ')">View</button></td>';
        data += '<td><button onclick="edit(' + jsonData[i].addressID + ')">Edit</button></td>';
        data += '<td><button onclick="remove(' + jsonData[i].addressID + ')">Delete</button></td>';
        data += '</tr>';
    }
    return this.el.innerHTML = data;
});

fetch('http://localhost:8080/W3/rest/addresstype')
        .then(function (response) {
            return response.json();
        }
        ).then(function (jsonData) {
    var select = document.getElementById("addresstype");
    for (var i = 0; i < jsonData.length; i++) {
        var opt = jsonData[i].addresstypeID;
        var opttext = jsonData[i].typename;
        var el = document.createElement("option");
        el.textContent = opttext;
        el.value = opt;
        select.appendChild(el);
    }
    return select;
});



function create() {
    var a = document.getElementById("streetname").value;
    var b = document.getElementById("housenumber").value;
    var c = document.getElementById("housenumberaddition").value;
    var d = document.getElementById("postalcode").value;
    var e = document.getElementById("city").value;
    var f = document.getElementById("addresstype").value;
    var g = document.getElementById("client").value;
    var address = {streetname: a, housenumber: b, housenumberAddition: c, postalcode: d, city: e, addresstypeID: {"addresstypeID": f},
        clientID: {"clientID": g}};
    
    fetch('http://localhost:8080/W3/rest/address', {
        method: 'POST',
        body: JSON.stringify(address),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }).then(function () {
        window.location.replace("http://localhost:8080/W3/address.html");
    });
}
;

function remove(id) {
    document.getElementById("form").innerHTML = " ";
    fetch('http://localhost:8080/W3/rest/address' + '/' + id)
            .then(function (response) {
                return response.json();
            }
            ).then(function (jsonData) {
        this.el = document.getElementById('Addresses');
        var data = " ";

        data += '<tr>';
        data += '<td>' + jsonData.addressID + '</td>' + '<td>' + jsonData.streetname + '</td>' + '<td>' + jsonData.housenumber + '</td>' +
                '<td>' + jsonData.housenumberAddition + '</td>' + '<td>' + jsonData.postalcode + '</td>' + '<td>' + jsonData.city + '</td>' +
                '<td>' + jsonData.clientID.clientID + '</td>' + '<td>' + jsonData.addresstypeID.addresstypeID + '</td>';
        data += '</tr>';


        document.getElementById("demo").innerHTML = "Delete Address with id: " + id + "?";

        var button = document.createElement("button");
        button.innerHTML = "Delete";
        document.getElementById("demo").appendChild(button);
        button.addEventListener("click", function () {
            fetch('http://localhost:8080/W3/rest/address' + '/' + id, {
                method: 'DELETE'
            }).then(function () {
                window.location.replace("http://localhost:8080/W3/address.html");
            });
        });
        return this.el.innerHTML = data;


    });
}



function edit(id) {
    document.getElementById("form").innerHTML = " ";
    document.getElementById("demo").innerHTML = "What do you want to edit?";
    document.getElementById('form2').style.display = 'block';

    fetch('http://localhost:8080/W3/rest/address' + '/' + id)
            .then(function (response) {
                return response.json();
            }
            ).then(function (jsonData) {
        this.el = document.getElementById('Addresses');
        var data = " ";

        data += '<tr>';
        data += '<td>' + jsonData.addressID + '</td>' + '<td>' + jsonData.streetname + '</td>' + '<td>' + jsonData.housenumber + '</td>' +
                '<td>' + jsonData.housenumberAddition + '</td>' + '<td>' + jsonData.postalcode + '</td>' + '<td>' + jsonData.city + '</td>' +
                '<td>' + "ClientID: " + jsonData.clientID.clientID + '</td>';
        data += '</tr>';
        return this.el.innerHTML = data, document.getElementById('estreetname').value = jsonData.streetname, document.getElementById('ehousenumber').value = jsonData.housenumber,
                document.getElementById('ehousenumberaddition').value = jsonData.housenumberAddition, document.getElementById('epostalcode').value = jsonData.postalcode,
                document.getElementById('ecity').value = jsonData.city, document.getElementById('eaddresstype').value = jsonData.addresstypeID.addresstypeID,
                document.getElementById('eclient').value = jsonData.clientID.clientID,
                document.getElementById('editid').value = jsonData.addressID;
    });
}
;

function editor() {
    var aa = document.getElementById("editid").value;
    var bb = document.getElementById("estreetname").value;
    var cc = document.getElementById("ehousenumber").value;
    var dd = document.getElementById("ehousenumberaddition").value;
    var ee = document.getElementById("epostalcode").value;
    var ff = document.getElementById("ecity").value;
    var gg = document.getElementById("eaddresstype").value;
    var hh = document.getElementById("eclient").value;
    var editaddress = {addressID: aa, streetname: bb, housenumber: cc, housenumberAddition: dd, postalcode: ee, city: ff, addresstypeID: {"addresstypeID": gg},
        clientID: {"clientID": hh}};
       
    fetch('http://localhost:8080/W3/rest/address', {
        method: 'PUT',
        body: JSON.stringify(editaddress),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }).then(function () {
        window.location.replace("http://localhost:8080/W3/address.html");
    });

}
;


function view(id) {
    document.getElementById("form").innerHTML = " ";
    fetch('http://localhost:8080/W3/rest/address' + '/' + id)
            .then(function (response) {
                return response.json();
            }
            ).then(function (jsonData) {
        this.el = document.getElementById('Addresses');
        var data = " ";
        document.getElementById("demo").innerHTML = "Details Address number: " + jsonData.addressID;
        document.getElementById("demo2").innerHTML = "AddressType";

        data += '<tr>';
        data += '<td>' + jsonData.addressID + '</td>' + '<td>' + jsonData.streetname + '</td>' + '<td>' + jsonData.housenumber + '</td>' +
                '<td>' + jsonData.housenumberaddition + '</td>' + '<td>' + jsonData.postalcode + '</td>' + '<td>' + jsonData.city + '</td>' +
                '<td>' + "clientID: " + jsonData.clientID.clientID + '</td>' + '<td>';
        data += '</tr>';
        
        var tbody = document.getElementById('addresstypes');
        var data2 =" ";
        
        data2 += '<tr>';
        data2 += '<td>' + "AddressType" + '</td>' + '<td>' + "ID : " + jsonData.addresstypeID.addresstypeID + '</td>' + '<td>' + jsonData.addresstypeID.typename + '</td>';
        data2 += '</tr>';

        return this.el.innerHTML = data, tbody.innerHTML = data2;
        
    });
}

function gotomain(){
    document.getElementById("demo").innerHTML = "Go to the main menu to add an account!";
};