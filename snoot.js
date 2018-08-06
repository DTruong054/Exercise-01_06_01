/*
    snoot.js
    Form Validation code for snoot.html

    Author: Daniel Truong
    Date: 8.6.18
*/

"use strict";

//Function to remove select list defaults
function removeSelectDefaults() {
    var emptyBoxes = document.getElementsByTagName("select");
    alert("select lists: " + emptyBoxes.length);
}

//Page load event handlers
if (window.addEventListener) {
    window.addEventListener("load", removeSelectDefaults, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", removeSelectDefaults)
}