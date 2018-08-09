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
    if (deliveryYear.selectedIndex === -1) {
        deliveryDays.selectedIndex = 0;
    }


    //If its Feburay and 2020 twentynine
    if (selectedMonth === "2" && deliveryYear.options[deliveryYear.selectedIndex].value === "2020") {
        deliveryDays.appendChild(twentyNine.cloneNode(true));
    }
    //Else if its a 30 day month thiry
    else if (selectedMonth === "4" || selectedMonth === "6" || selectedMonth === "9" || selectedMonth === "11") {
        deliveryDays.appendChild(thirty.cloneNode(true));
    }
    //Else if 31 day month thiryone
    else if (selectedMonth === "1" || selectedMonth === "3" || selectedMonth === "5" || selectedMonth === "7" || selectedMonth === "8" || selectedMonth === "10" || selectedMonth === "12") {
        deliveryDays.appendChild(thirtyOne.cloneNode(true));
    }
}

//Function to inspect custom check box on message change
function autoCheckCustom() {
    var messageBox = document.getElementById("customText");

    if (messageBox.value !== "" && messageBox.value !== messageBox.placeholder) {
        //Text area has a message, check the box 
        document.getElementById("custom").checked = "checked"
    } else {
        //Text area has not message, uncheck the box  
        document.getElementById("custom").checked = "";     
    }
}

//Function to copy billing to delivery address
function copyBillingAddress() {
    var billingInputElements = document.querySelectorAll("#billingAddress input");
    var deliveryInputElements = document.querySelectorAll("#deliveryAddress input");
    if (document.getElementById("sameAddr").checked) {
        //Duplicate addresses - check box is checked, do a copy
        for (var i = 0; i < billingInputElements.length; i++) {
            deliveryInputElements[i + 1].value = billingInputElements[i].value;
        }
        document.querySelector("#deliveryAddress select").value;
        document.querySelector("#billingAddress select").value;
    } else {
        //Duplicate addresses - check box is unchecked, erase
        for (var i = 0; i < billingInputElements.length; i++) {
            deliveryInputElements[i + 1].value = "";
        }
        document.querySelector("#deliveryAddress select").selectedIndex = -1;
    }
}


//Function that sets up page on a load event
function setUpPage() {
    removeSelectDefaults();
    setUpDays();
    createEventListener();
}

//Function to create  our event handlers
function createEventListener() {
    var deliveryMonth = document.getElementById("delivMo");
    if (deliveryMonth.addEventListener) {
        deliveryMonth.addEventListener("change", updateDays, false);
    } else if (deliveryMonth.attachEvent) {
        deliveryMonth.attachEvent("onchange", updateDays);
    }

    var deliveryYear = document.getElementById("delivYr");
    if (deliveryYear.addEventListener) {
        deliveryYear.addEventListener("change", updateDays, false);
    } else if (deliveryYear.attachEvent) {
        deliveryYear.attachEvent("onchange", updateDays);
    }

    var messageBox = document.getElementById("customText");
    if (messageBox.addEventListener) {
        messageBox.addEventListener("change", autoCheckCustom, false);
    } else if (messageBox.attachEvent) {
        messageBox.attachEvent("onchange", autoCheckCustom);
    }

    var same = document.getElementById("sameAddr");
    if (same.addEventListener) {
        same.addEventListener("change", copyBillingAddress, false);
    } else if (same.attachEvent) {
        same.attachEvent("onchange", copyBillingAddress);
    }
}


//Page load event handlers
if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setUpPage);
}