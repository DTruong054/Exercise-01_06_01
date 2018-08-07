/*
    snoot.js
    Form Validation code for snoot.html

    Author: Daniel Truong
    Date: 8.6.18
*/

"use strict";

var twentyNine = document.createDocumentFragment();
var thirty = document.createDocumentFragment();
var thirtyOne = document.createDocumentFragment();

//Function to remove select list defaults
function removeSelectDefaults() {
    var emptyBoxes = document.getElementsByTagName("select");
    for (var i = 0; i < emptyBoxes.length; i++) {
        //Set to 1 or 0 to errase error
        emptyBoxes[i].selectedIndex = -1;
    }
}

//Function that would set up document fragments for days of the month

function setUpDays() {
    var dates = document.getElementById("delivDy").getElementsByTagName("option");
    twentyNine.appendChild(dates[28].cloneNode(true));
    thirty.appendChild(dates[28].cloneNode(true));
    thirty.appendChild(dates[29].cloneNode(true));
    thirtyOne.appendChild(dates[28].cloneNode(true));
    thirtyOne.appendChild(dates[29].cloneNode(true));
    thirtyOne.appendChild(dates[30].cloneNode(true));
}

//function to set up the list of days based on the selected months
function updateDays() {
    var deliveryDays = document.getElementById("delivDy");
    var dates = deliveryDays.getElementsByTagName("option");
    var deliveryMonth = document.getElementById("delivMo");
    var deliveryYear = document.getElementById("delivYr");
    var selectedMonth = deliveryMonth.options[deliveryMonth.selectedIndex].value;
    while (dates[28]) {
        deliveryDays.removeChild(dates[28]);
    }
}

//Function that sets up page on a load event
function setUpPage() {
    removeSelectDefaults();
    setUpDays();
    updateDays();
}


//Page load event handlers
if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setUpPage);
}