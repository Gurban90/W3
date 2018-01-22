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
                '<th>' + 'Cheese' + '</th>';
        data2 += '</tr>';
        for (i = 0; i < jsonData.orderdetailCollection.length; i++) {
            data2 += '<tr>';
            data2 += '<td>' + jsonData.orderdetailCollection[i].orderdetailID + '</td>' + '<td>' + jsonData.orderdetailCollection[i].quantity + '</td>' +
                    '<td>' + jsonData.orderdetailCollection[i].cheeseID.cheeseID + '</td>';
            data2 += '<td><button onclick="view2(' + jsonData.orderdetailCollection[i].orderdetailID + ')">View</button></td>';
            data2 += '<td><button onclick="edit2(' + jsonData.orderdetailCollection[i].orderdetailID + ')">Edit</button></td>';
            data2 += '<td><button onclick="remove2(' + jsonData.orderdetailCollection[i].orderdetailID + ')">Delete</button></td>';
            data2 += '</tr>';
        }

        return this.el.innerHTML = data, tbody.innerHTML = data2;

    });
}

function gotomain() {
    document.getElementById("demo").innerHTML = "Go to the main menu to add an account!";
}
;