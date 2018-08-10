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

//Function to validate address - billing and delivery
function validateAddress(fieldsetId) {
    var inputElements = document.querySelectorAll("#" + fieldsetId + " input");
    var errorDiv = document.querySelectorAll("#" + fieldsetId + " .errorMessage")[0];
    var fieldsetValidity = true;
    var elementCount = inputElements.length;
    var currentElement;
    try {
        alert("I am executing the try clause");
    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;
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

    if (formValidity === true) {
        //Form is valid
        //Prevent form default behavior
        document.getElementById("errorText").innerHTML = "";
        document.getElementById("errorText").style.display = "none";
        document.getElementsByTagName("form")[0].submit();
    } else {
        document.getElementById("errorText").innerHTML = "Please fix the indicated problems and then resubmit your order";
        document.getElementById("errorText").style.display = "block";
        scroll(0,0);
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

//Once upon a time there was a person who loved to slay monsters. He would always love to go out and kill monsters. That was something he really loves. He would always ignore his parent when they say he could not go and slay monsters. He was called Alain and with his trusty partner called Enclair he would kill every monster that got in his way. He would never have lost to a demon or a monster. Then one day a demon lord would have shown up in his village. The demon lord had a great power and would grant the hero any wish. The hero Alain has a choice to either keep adventuring with the girl he loves Enclair or go with the demon lord and have him grant his wish. Alain would regret whatever he chooses next. Even if he went with is love he won't get his wish, but if he goes with the demonlord he would lose his love Enclair. This was a really hard decsion for the hero Alain. After a night of fully resting he would choose Enclair and to slay the demon lord. He was not afraid of the demonlord. he asked for the help of his whole entire village. The villages would team up together with the hero Alain and try to take down teh demonlord. This however was a terrible idea since that demon lord was one of the 72 demon pillers of solomon. His name was Alcuder. He was a demon of simpathy. He defeated all the villagers and gave Alain a choice, either save Enclair or the rest of the village. He said "Give me a moment to talk with the elders and Enclair." Enclair wants Alain to save the village but she doesn't know that she is very important person not to just the hero but she is important to the whole village as well. She doesn't know her origens but Alain knows hers. He needs to tell the elders about Enclair and what he should choose.After a hour the hero came back to the demon lord and announced he wanted to save Enclair. The demon lord was shocked at his decision. He though he would surely save the Village, but insted he saved "that girl". Alcuder was baffled but held his end of the bargin. He would have slaughtered the village, and only Alain and Enclair was left. Enclair didn't know why Alain choose her and she was enraged. Her "family" has died and everyone of her friends has died. Alain would then suggest that they would go and hunt down that demon lord for revenge. Enclair however wanted to leave all this and just wanted to crawl into a corner and die. Alain would then go to the nearby village and buy her favorite foods. This was something that Enclair thought was sweet, but still hated Alain for what he did to the village. She wanted he life to be useful for once, but she only caused more angusih. She wanted to create a world where she and her love Robert has lived. However Robert has died in the village. She doesn't know that Alain loves her though. She only thinks of him as a freind. After they both had ate, they went on an adventure together. They would start their adventure in a place called Albion. In Albion they would be stopped by the guard caption Shannalottee. She would ask why are they in Albion, and what are their plans. Enclair replied "We are here because we started our adventure and we need some supplies." Alain said "We heard Albion has some great equipment for some starters like us". Shannalottee let them into the city. They decided to split up to gain what they had needed. Albion went to the blacksmith while Enclair went to the alchemy store. Alain would buy some leather armor and a short sword. Enclair would buy some potions and buy some daggers. She would also learn some healing spells. Once they where both done with their shopping they would meet up. They would then go to the guild hall and claim their money that the Elders left them. Enclair was still enraged t the demon lord for killing her beloved and her "family" Alain asks Enclair "What was the problem? Are you still sad about what I had done to the village?". Enclair just shok her head. She just looked at how calm Alain is and was wondering why he felt no saddness about what had just happened. Both of them where about to leave the city untill they got stopped once again by the guard captian Shannalottee. Shannalottee said "Where do you theves think your going?". Alain and Enclair was confused on why they were stopped. 