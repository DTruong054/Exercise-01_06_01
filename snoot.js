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
var formValidity = true;

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

    //Cover for no month selected
    if (deliveryMonth.selectedIndex === -1) {
        return;
    }

    var selectedMonth = deliveryMonth.options[deliveryMonth.selectedIndex].value;
    while (dates[28]) {
        deliveryDays.removeChild(dates[28]);
    }
    if (deliveryYear.selectedIndex === -1) {
        deliveryDays.selectedIndex = 0;
    }


    //If its Feburay and 2020 twentynine
    if (selectedMonth === "2" && deliveryMonth.options[deliveryMonth.selectedIndex].value === "2020") {
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

//Function to validate address - billing and delivery
function validateAddress(fieldsetId) {
    var inputElements = document.querySelectorAll("#" + fieldsetId + " input");
    var errorDiv = document.querySelectorAll("#" + fieldsetId + " .errorMessage")[0];
    var fieldsetValidity = true;
    var elementCount = inputElements.length;
    var currentElement;
    try {
        //Loop though the input field looking for blanks
        for (var i = 0; i < elementCount; i++) {
            currentElement = inputElements[i];
            if (currentElement.value === "") {
                //Blanks
                currentElement.style.background = "rgb(255,233,233)";
                fieldsetValidity = false;
            } else {
                //Non-blanks
                currentElement.style.background = "rgb(255,255,255)";
            }
        }
        //Validate select list field
        currentElement = document.querySelectorAll("#" + fieldsetId + " select")[0];
        if (currentElement.selectedIndex === -1) {
            currentElement.style.border = "1px solid red";
            fieldsetValidity = false;
        } else {
            currentElement.style.border = "";
        }
        if (!fieldsetValidity) {
            //Action for invald fieldset
            if (fieldsetId === "billingAddress") {
                throw "Please complete all billing address information.";
            } else {
                throw "Please complete all delivery address information.";
            }
        } else {
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
        }
    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;
    }
}

//Function to validate delivery date
function validateAddressDate(fieldsetId) {
    var selectElements = document.querySelectorAll("#deliveryDate" + " select");
    var errorDiv = document.querySelectorAll("#deliveryDate" + " .errorMessage")[0];
    var fieldsetValidity = true;
    var elementCount = selectElements.length;
    var currentElement;
    try {
        for (var i = 0; i < elementCount; i++) {
            currentElement = selectElements[i];
            if (currentElement.selectedIndex === -1) {
                //Blanks
                currentElement.style.border = "1px solid rgb(255,0,0)";
                fieldsetValidity = false;
            } else {
                //Non-blanks
                currentElement.style.border = "";
            }
        }
        if (!fieldsetValidity) {
            throw "Please specify a Delivery Date";
        } else {
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
        }
    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;
    }
}


function validatePayment(fieldsetId) {
    var errorDiv = document.querySelectorAll("#paymentInfo" + " .errorMessage")[0];
    var fieldsetValidity = true;
    var ccNumElement = document.getElementById("ccNum");
    var cvvElement = document.getElementById("cvv");
    var cards = document.getElementsByName("PaymentType");
    var selectElements = document.querySelectorAll("#paymentInfo" + " select");
    var elementCount = selectElements.length;
    var currentElement;
    try {
        //validate  radio buttons one must be on
        if (!cards[0].checked && !cards[1].checked && !cards[2].checked && !cards[3].checked) {
            for (var i = 0; i < cards.length; i++) {
                cards[i].style.outline = "1px solid rgb(255,0,0)";
            }
            fieldsetValidity = false;
        } else {
            for (var i = 0; i < cards.length; i++) {
                cards[i].style.outline = "";
            }
        }

        //Validate card numbers
        if (ccNumElement.value === "") {
            ccNumElement.style.background = "rgb(255,233,233)";
            formValidity = false;
        } else {
            ccNumElement.style.background = "rgb(255,255,255)"
        }

        //Validate experation date
        for (var i = 0; i < elementCount; i++) {
            currentElement = selectElements[i];
            if (currentElement.selectedIndex === -1) {
                //Blanks
                currentElement.style.border = "1px solid rgb(255,0,0)";
                fieldsetValidity = false;
            } else {
                //Non-blanks
                currentElement.style.border = "";
            }
        }

        //Validate cvv number
        if (cvvElement.value === "") {
            cvvElement.style.background = "rgb(255,233,233)";
            formValidity = false;
        } else {
            cvvElement.style.background = "rgb(255,255,255)"
        }

        //Loop though the input field looking for blanks
        if (!fieldsetValidity) {
            throw "Please complete all payment information";
        } else {
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
        }
    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;
    }
}

//Function to validate 
function validateMessage() {
    var msgBox = document.getElementById("customText");
    var errorDiv = document.querySelectorAll("#message" + " .errorMessage")[0];
    var fieldsetValidity = true;
    try {
        //validate checkbox and  text area customMessage
        if (document.getElementById("custom").checked && (msgBox.value === "" || msgBox.value === msgBox.placeholder)) {
            throw "Please enter your Custom Message Text.";
        } else {
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
            msgBox.style.background = "rgb(255,255,255)";
        }
    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        msgBox.style.background = "rgb(255,233,233)";
        formValidity = false;
    }
}

//Validate create account
function validateCreateAccount() {
    var errorDiv = document.querySelectorAll("#createAccount" + " .errorMessage")[0];
    var usernameElement = document.getElementById("username")
    var password1Element = document.getElementById("pass1");
    var password2lement = document.getElementById("pass2");
    var invColor = "rgb(255,233,233)";
    var passMisMatch = false;
    var fieldsetValidity = true;
    usernameElement.style.background = "rgb(255,255,255)";
    password1Element.style.background = "rgb(255,255,255)";
    password2lement.style.background = "rgb(255,255,255)";
    errorDiv.style.display = "none";
    errorDiv.innerHTML = "";
    try {
        //One or more fields as data
        if (usernameElement.value !== "" && password1Element.value !== "" && password2lement !== "") {
            if (password1Element.value !== password2lement.value) {
                //Veriy the passwords match
                throw "The passwords entered don't match, please re-enter.";
                fieldsetValidity = false;
                passMisMatch = true
            } else if (usernameElement.value === "" && password1Element.value === "" && password2lement.value === "") {
                fieldsetValidity = true;
                passMisMatch = false;
            }
        } else {
            fieldsetValidity = false;
            throw "Please complete all fields to create an account";
        }
    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        password1Element.style.background = invColor;
        password2lement.style.background = invColor;
        formValidity = false;
        if (passMisMatch) {
            usernameElement.style.background = "rgb(255,255,255)";
        } else {
            usernameElement.style.background = invColor;
        }
    }
}

//Function to validate entire form
function validateForm(evt) {
    if (evt.preventDefault) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }
    formValidity = true;

    validateAddress("billingAddress");
    validateAddress("deliveryAddress");
    validateAddressDate();
    validatePayment();
    validateMessage();
    validateCreateAccount();

    if (formValidity === true) {
        //Form is valid
        //Prevent form default behavior
        document.getElementById("errorText").innerHTML = "";
        document.getElementById("errorText").style.display = "none";
        document.getElementsByTagName("form")[0].submit();
    } else {
        document.getElementById("errorText").innerHTML = "Please fix the indicated problems and then resubmit your order";
        document.getElementById("errorText").style.display = "block";
        scroll(0, 0);
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

    var form = document.getElementsByTagName("form")[0];
    if (form.addEventListener) {
        form.addEventListener("submit", validateForm, false);
    } else if (form.attachEvent) {
        form.attachEvent("onsubmit", validateForm);
    }
}


//Page load event handlers
if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setUpPage);
}