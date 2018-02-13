"use strict";

let token = localStorage.getItem("token");

fetch('http://localhost:8080/W3/rest/orders', {
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
    el = document.getElementById('orders');
    var data = " ";
    for (var i = 0; i < jsonData.length; i++) {
        var x = new Date(jsonData[i].currentdate).toLocaleDateString();
        var y = new Date(jsonData[i].enddate).toLocaleDateString();
        data += '<tr>';
        data += '<td>' + jsonData[i].ordersID + '</td>' + '<td>' + x + '</td>' + '<td>' + jsonData[i].totalprice + '</td>' +
                '<td>' + y + '</td>';
        data += '<td><button onclick="view(' + jsonData[i].ordersID + ')">View</button></td>';
        data += '<td><button onclick="remove(' + jsonData[i].ordersID + ')">Delete</button></td>';
        data += '<td><button onclick="createdetail(' + jsonData[i].ordersID + ')">Add</button></td>';
        data += '</tr>';
    }
    return el.innerHTML = data;
});

fetch('http://localhost:8080/W3/rest/orders/client', {
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
    el = document.getElementById('orders');
    var data = " ";
    for (var i = 0; i < jsonData.length; i++) {
        var x = new Date(jsonData[i].currentdate).toLocaleDateString();
        var y = new Date(jsonData[i].enddate).toLocaleDateString();
        data += '<tr>';
        data += '<td>' + jsonData[i].ordersID + '</td>' + '<td>' + x + '</td>' + '<td>' + jsonData[i].totalprice + '</td>' +
                '<td>' + y + '</td>';
        data += '<td><button onclick="view(' + jsonData[i].ordersID + ')">View</button></td>';
        data += '<td><button onclick="remove(' + jsonData[i].ordersID + ')">Delete</button></td>';
        data += '<td><button onclick="createdetail(' + jsonData[i].ordersID + ')">Add</button></td>';
        data += '</tr>';
    }
    return el.innerHTML = data;
});

function create() {
    var a = 0;
    var b = 0;
    var c = 0;
    var d = 0;

    var order = {currentdate: a, totalprice: b, enddate: c, clientID: d};

    fetch('http://localhost:8080/W3/rest/orders', {
        method: 'POST',
        body: JSON.stringify(order),
       headers: {
        'Accept': 'application/json, text/plain, */*',
        'Authorization': "Bearer " + token,
        'Content-Type': 'application/json'
    }
    }).then(function (response) {
        return response.json();
    }
    ).then(function (jsonData) {

        document.getElementById("demo").innerHTML = "Order created with id: " + jsonData.ordersID + ".";
        return createdetail(jsonData.ordersID);
    });
}
;

function createdetail(orderid) {
    fetch('http://localhost:8080/W3/rest/orders' + '/' + orderid, {
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
        el = document.getElementById('orders');
        var data = " ";
        let x = new Date(jsonData.currentdate).toLocaleDateString();
        let y = new Date(jsonData.enddate).toLocaleDateString();
        data += '<tr>';
        data += '<td>' + jsonData.ordersID + '</td>' + '<td>' + x + '</td>' + '<td>' + jsonData.totalprice + '</td>' +
                '<td>' + y + '</td>' ;
        data += '</tr>';
        return el.innerHTML = data;
    });

    document.getElementById('form').style.display = 'block';



    fetch('http://localhost:8080/W3/rest/cheese/client', {
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
        var select = document.getElementById("cheese");
        for (var i = 0; i < jsonData.length; i++) {
            var opt = jsonData[i].cheeseID;
            var opttext = "ID: " + jsonData[i].cheeseID + " " + jsonData[i].name + " Price: " + jsonData[i].price;
            var el = document.createElement("option");
            el.textContent = opttext;
            el.value = opt;
            select.appendChild(el);
        }
        return select, document.getElementById("orderid").value = orderid;
    });
}
;

function check() {
    alert('check');
    var h = document.getElementById("quantity").value;
    var z = document.getElementById("orderid").value;
    fetch('http://localhost:8080/W3/rest/orders' + '/' + document.getElementById("orderid").value, {
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

        var y = document.getElementById("cheese").value;
        var x = "";
        for (var i = 0; i < jsonData.orderdetailCollection.length; i++) {
            if (jsonData.orderdetailCollection[i].cheeseID.cheeseID == y) {
                alert("You are allready ordering this Cheese! Please select another one.");
                var x = "Same Cheese";
                return x;
            }
        }
        return finalize(h, y, z);

    });

}

function finalize(h, y, z) {
    alert(z);
    var orderdetail = {quantity: h, cheeseID: {"cheeseID": y}, ordersID: {"ordersID": z}};

    fetch('http://localhost:8080/W3/rest/orderdetail' + '/' + z, {
        method: 'POST',
        body: JSON.stringify(orderdetail),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Authorization': "Bearer " + token,
        'Content-Type': 'application/json'
    }
    }).then(function () {
        window.location.replace("http://localhost:8080/W3/orders.html");
    });

}
;

function remove(id) {
    fetch('http://localhost:8080/W3/rest/orders' + '/' + id, {
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
        el = document.getElementById('orders');
        var data = " ";
        var x = new Date(jsonData.currentdate).toLocaleDateString();
        var y = new Date(jsonData.enddate).toLocaleDateString();
        data += '<tr>';
        data += '<td>' + jsonData.ordersID + '</td>' + '<td>' + x + '</td>' + '<td>' + jsonData.totalprice + '</td>' +
                '<td>' + y + '</td>';
        data += '</tr>';


        document.getElementById("demo").innerHTML = "Delete Order with id: " + id + "?";

        var button = document.createElement("button");
        button.innerHTML = "Delete";
        document.getElementById("demo").appendChild(button);
        button.addEventListener("click", function () {
            fetch('http://localhost:8080/W3/rest/orders' + '/' + id, {
                method: 'DELETE',
                headers: {
        'Accept': 'application/json, text/plain, */*',
        'Authorization': "Bearer " + token,
        'Content-Type': 'application/json'
    }
            }).then(function () {
                window.location.replace("http://localhost:8080/W3/orders.html");
            });
        });
        return el.innerHTML = data;


    });
}

function view(id) {
    fetch('http://localhost:8080/W3/rest/orders' + '/' + id, {
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
        el = document.getElementById('orders');
        var data = " ";
        document.getElementById("demo").innerHTML = "Details Order number: " + jsonData.ordersID;
        document.getElementById("demo2").innerHTML = "OrderDetails";
        var x = new Date(jsonData.currentdate).toLocaleDateString();
        var y = new Date(jsonData.enddate).toLocaleDateString();
        data += '<tr>';
        data += '<td>' + jsonData.ordersID + '</td>' + '<td>' + x + '</td>' + '<td>' + jsonData.totalprice + '</td>' +
                '<td>' + y + '</td>';
        data += '</tr>';

        var tbody = document.getElementById('orderdetails');
        var data2 = " ";
        data2 += '<tr>';
        data2 += '<th>' + 'OrderDetailID' + '</th>' +
                '<th>' + 'Quantity' + '</th>' +
                '<th>' + 'CheeseID' + '</th>' +
                '<th>' + 'CheeseName' + '</th>' +
                '<th>' + 'PPU' + '</th>';
        data2 += '</tr>';
        for (var i = 0; i < jsonData.orderdetailCollection.length; i++) {
            data2 += '<tr>';
            data2 += '<td>' + jsonData.orderdetailCollection[i].orderdetailID + '</td>' + '<td>' + jsonData.orderdetailCollection[i].quantity + '</td>' +
                    '<td>' + jsonData.orderdetailCollection[i].cheeseID.cheeseID + '</td>' + '<td>' + jsonData.orderdetailCollection[i].cheeseID.name + '</td>' +
                    '<td>' + jsonData.orderdetailCollection[i].cheeseID.price + '</td>';
            data2 += '<td><button onclick="edit2(' + jsonData.orderdetailCollection[i].orderdetailID + ')">Edit</button></td>';
            data2 += '<td><button onclick="remove2(' + jsonData.orderdetailCollection[i].orderdetailID + ')">Delete</button></td>';
            data2 += '</tr>';
        }
        return el.innerHTML = data, tbody.innerHTML = data2;

    });
}

function remove2(detailid) {
    fetch('http://localhost:8080/W3/rest/orderdetail' + '/' + detailid, {
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

        var tbody = document.getElementById('orderdetails');
        var data2 = " ";
        data2 += '<tr>';
        data2 += '<th>' + 'OrderDetailID' + '</th>' +
                '<th>' + 'Quantity' + '</th>' +
                '<th>' + 'CheeseID' + '</th>' +
                '<th>' + 'CheeseName' + '</th>' +
                '<th>' + 'PPU' + '</th>';
        data2 += '</tr>';

        data2 += '<tr>';
        data2 += '<td>' + jsonData.orderdetailID + '</td>' + '<td>' + jsonData.quantity + '</td>' + '<td>' + jsonData.cheeseID.cheeseID + '</td>' +
                '<td>' + jsonData.cheeseID.name + '</td>' + '<td>' + jsonData.cheeseID.price + '</td>';
        data2 += '</tr>';

        document.getElementById("demo").innerHTML = "Delete Orderdetail with id: " + detailid + "?";

        var button = document.createElement("button");
        button.innerHTML = "Delete";
        document.getElementById("demo").appendChild(button);
        button.addEventListener("click", function () {
            fetch('http://localhost:8080/W3/rest/orderdetail' + '/' + detailid, {
                method: 'DELETE',
                headers: {
        'Accept': 'application/json, text/plain, */*',
        'Authorization': "Bearer " + token,
        'Content-Type': 'application/json'
    }
            }).then(function () {
                window.location.replace("http://localhost:8080/W3/orders.html");
            });
        });
        return tbody.innerHTML = data2;


    });
}

function edit2(id) {
    document.getElementById("form").innerHTML = " ";
    document.getElementById("demo").innerHTML = "Edit quantity?";
    document.getElementById('form2').style.display = 'block';


    fetch('http://localhost:8080/W3/rest/orderdetail' + '/' + id, {
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
        var tbody = document.getElementById('orderdetails');
        var data2 = " ";
        data2 += '<tr>';
        data2 += '<th>' + 'OrderDetailID' + '</th>' +
                '<th>' + 'Quantity' + '</th>' +
                '<th>' + 'CheeseID' + '</th>' +
                '<th>' + 'CheeseName' + '</th>' +
                '<th>' + 'PPU' + '</th>';
        data2 += '</tr>';

        data2 += '<tr>';
        data2 += '<td>' + jsonData.orderdetailID + '</td>' + '<td>' + jsonData.quantity + '</td>' + '<td>' + jsonData.cheeseID.cheeseID + '</td>' +
                '<td>' + jsonData.cheeseID.name + '</td>' + '<td>' + jsonData.cheeseID.price + '</td>';
        data2 += '</tr>';

        return tbody.innerHTML = data2, document.getElementById('orderdetailid').value = jsonData.orderdetailID,
                document.getElementById('equantity').value = jsonData.quantity,
                document.getElementById('echeese').value = jsonData.cheeseID.cheeseID;
    });
}
;

function editor() {
    var aa = document.getElementById("orderdetailid").value;
    var bb = document.getElementById("equantity").value;
    var cc = document.getElementById("echeese").value;
    var dd = 1;
    var orderdetailedit = {orderdetailID: aa, quantity: bb, cheeseID: {"cheeseID": cc},
        ordersID: {"ordersID": dd}};
    fetch('http://localhost:8080/W3/rest/orderdetail', {
        method: 'PUT',
        body: JSON.stringify(orderdetailedit),
       headers: {
        'Accept': 'application/json, text/plain, */*',
        'Authorization': "Bearer " + token,
        'Content-Type': 'application/json'
    }
    }).then(function () {
        window.location.replace("http://localhost:8080/W3/orders.html");
    });
}
;

function gotomain() {
    document.getElementById("demo").innerHTML = "Go to the main menu to add an account!";
}
;