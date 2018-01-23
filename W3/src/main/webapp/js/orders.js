fetch('http://localhost:8080/W3/rest/orders')
        .then(function (response) {
            return response.json();
        }
        ).then(function (jsonData) {

    this.el = document.getElementById('orders');
    var data = " ";
    for (i = 0; i < jsonData.length; i++) {
        data += '<tr>';
        data += '<td>' + jsonData[i].ordersID + '</td>' + '<td>' + jsonData[i].currentdate + '</td>' + '<td>' + jsonData[i].totalprice + '</td>' +
                '<td>' + jsonData[i].enddate + '</td>';
        data += '<td><button onclick="view(' + jsonData[i].ordersID + ')">View</button></td>';
        data += '<td><button onclick="remove(' + jsonData[i].ordersID + ')">Delete</button></td>';
        data += '<td><button onclick="createdetail(' + jsonData[i].ordersID + ')">Add</button></td>';
        data += '</tr>';
    }
    return this.el.innerHTML = data;
});

function create() {
    var a = null;
    var b = 0;
    var c = null;
    var d = null;

    var order = {currentdate: a, totalprice: b, enddate: c, clientID: d};

    fetch('http://localhost:8080/W3/rest/orders', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            'Accept': 'application/json, text/plain, */*',
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
    fetch('http://localhost:8080/W3/rest/orders' + '/' + orderid)
            .then(function (response) {
                return response.json();
            }
            ).then(function (jsonData) {
        this.el = document.getElementById('orders');
        var data = " ";

        data += '<tr>';
        data += '<td>' + jsonData.ordersID + '</td>' + '<td>' + jsonData.currentdate + '</td>' + '<td>' + jsonData.totalprice + '</td>' +
                '<td>' + jsonData.enddate + '</td>' + '<td>' + "clientID: " + jsonData.clientID.clientID + '</td>';
        data += '</tr>';
        return this.el.innerHTML = data;
    });

    document.getElementById('form').style.display = 'block';
    


    fetch('http://localhost:8080/W3/rest/cheese')
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
    var h = document.getElementById("quantity").value;
    var y = document.getElementById("cheese").value;
    var z = document.getElementById("orderid").value;
    fetch('http://localhost:8080/W3/rest/orders' + '/' + document.getElementById("orderid").value)
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
    var a = h;
    var b = y;
    var c = z;
    var orderdetail = {quantity: a, cheeseID: {"cheeseID": b}, ordersID: {"ordersID": c}};

    fetch('http://localhost:8080/W3/rest/orderdetail', {
        method: 'POST',
        body: JSON.stringify(orderdetail),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }).then(function () {
        window.location.replace("http://localhost:8080/W3/orders.html");
    });


}
;

function remove(id) {
    fetch('http://localhost:8080/W3/rest/orders' + '/' + id)
            .then(function (response) {
                return response.json();
            }
            ).then(function (jsonData) {
        this.el = document.getElementById('orders');
        var data = " ";

        data += '<tr>';
        data += '<td>' + jsonData.ordersID + '</td>' + '<td>' + jsonData.currentdate + '</td>' + '<td>' + jsonData.totalprice + '</td>' +
                '<td>' + jsonData.enddate + '</td>' + '<td>' + "clientID: " + jsonData.clientID.clientID + '</td>';
        data += '</tr>';


        document.getElementById("demo").innerHTML = "Delete Order with id: " + id + "?";

        var button = document.createElement("button");
        button.innerHTML = "Delete";
        document.getElementById("demo").appendChild(button);
        button.addEventListener("click", function () {
            fetch('http://localhost:8080/W3/rest/orders' + '/' + id, {
                method: 'DELETE'
            }).then(function () {
                window.location.replace("http://localhost:8080/W3/orders.html");
            });
        });
        return this.el.innerHTML = data;


    });
}

function view(id) {
    fetch('http://localhost:8080/W3/rest/orders' + '/' + id)
            .then(function (response) {
                return response.json();
            }
            ).then(function (jsonData) {
        this.el = document.getElementById('orders');
        var data = " ";
        document.getElementById("demo").innerHTML = "Details Order number: " + jsonData.ordersID;
        document.getElementById("demo2").innerHTML = "OrderDetails";

        data += '<tr>';
        data += '<td>' + jsonData.ordersID + '</td>' + '<td>' + jsonData.currentdate + '</td>' + '<td>' + jsonData.totalprice + '</td>' +
                '<td>' + jsonData.enddate + '</td>' + '<td>' + "clientID: " + jsonData.clientID.clientID + '</td>';
        data += '</tr>';

        var tbody = document.getElementById('orderdetails');
        var data2 = " ";
        data2 += '<tr>';
        data2 += '<th>' + 'OrderDetailID' + '</th>' +
                '<th>' + 'Quantity' + '</th>' +
                '<th>' + 'CheeseID' + '</th>';
        '<th>' + 'CheeseName' + '</th>';
        '<th>' + 'PPU' + '</th>';
        data2 += '</tr>';
        for (i = 0; i < jsonData.orderdetailCollection.length; i++) {
            data2 += '<tr>';
            data2 += '<td>' + jsonData.orderdetailCollection[i].orderdetailID + '</td>' + '<td>' + jsonData.orderdetailCollection[i].quantity + '</td>' +
                    '<td>' + jsonData.orderdetailCollection[i].cheeseID.cheeseID + '</td>' + '<td>' + jsonData.orderdetailCollection[i].cheeseID.name + '</td>' +
                    '<td>' + jsonData.orderdetailCollection[i].cheeseID.price + '</td>';
            data2 += '<td><button onclick="edit2(' + jsonData.orderdetailCollection[i].orderdetailID + ')">Edit</button></td>';
            data2 += '<td><button onclick="remove2(' + jsonData.orderdetailCollection[i].orderdetailID + ')">Delete</button></td>';
            data2 += '</tr>';
        }
        return this.el.innerHTML = data, tbody.innerHTML = data2;

    });
}

function remove2(detailid) {
    fetch('http://localhost:8080/W3/rest/orderdetail' + '/' + detailid)
            .then(function (response) {
                return response.json();
            }
            ).then(function (jsonData) {

        var tbody = document.getElementById('orderdetails');
        var data2 = " ";
        data2 += '<tr>';
        data2 += '<th>' + 'OrderDetailID' + '</th>' +
                '<th>' + 'Quantity' + '</th>' +
                '<th>' + 'CheeseID' + '</th>';
        '<th>' + 'CheeseName' + '</th>';
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
                method: 'DELETE'
            }).then(function () {
                window.location.replace("http://localhost:8080/W3/orders.html");
            });
        });
        return tbody.innerHTML = data2;


    });
}

function gotomain() {
    document.getElementById("demo").innerHTML = "Go to the main menu to add an account!";
}
;