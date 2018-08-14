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
function validateAddress() {
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
        } else{
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
function validateAddressDate() {
    var selectElements = document.querySelectorAll("#deliveryDate" + " select");
    var errorDiv = document.querySelectorAll("#deliveryDate" + " .errorMessage")[0];
    var fieldsetValidity = true;
    var elementCount = selectElements.length;
    var currentElement;
    try {
        //Loop though the input field looking for blanks
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
            throw "Please specify a Delivery Date"
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


function validateAddressDate() {
    var errorDiv = document.querySelectorAll("#deliveryDate" + " .errorMessage")[0];
    var fieldsetValidity = true;
    var ccNumElement = document.getElementById("ccNum");
    var cvvElement = document.getElementById("cvv");
    var cards = document.getElementsByName("PaymentType");
    var selectElements = document.querySelectorAll("#paymentInfo" + " select");
    var elementCount = selectElements.length;
    var currentElement;
    //Todo Start here Tomorrow.
    try {
        //Loop though the input field looking for blanks
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
            throw "Please specify a Delivery Date"
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

//Shannalottee would go on to apoligize to the two and saying that they looked very suspisous, and would need to take them info custody. The hero Raul and his partner Sinclair would then go to the guard barraks. Tey where questioned on why they were in the city. Rual would say "I was here to gain armor to kill the demon lord.". After this statement, Pvt. Bekker was shocked. He was visited by a demon lord as well. However he did not speak up to this. He found his new goal as to help the Hero Raul and his love Sinclair. Bekker would distract the Cpt. Shannalottee saying that a building was on fire and they had to stop it. Shanalottee woudl rush out to seek some help for the fire. The hero Rual would use this opertunity to escape with Sinclar, he woudl knock out Bekker and run. Sinclair thought that was mean of Rual and would like him to apoligize. H esai dhe just knocked him out so they could escape. Sinclair said "You can't be someone who is mean but seeks revenge, if you do anger out of anger you would only cause more anger." This was something that annoyed Rykker. He was doing everything for Sinclair. Rykker wanted only to plaese and make Sinclair's life easier. After they had ran away the city guards had realized this and was chasing them. They eventually broke into a man's house called Perce. He was a mentally unstable man and thought that Sinclair was his daughter. Rykker thought that this was a offensive thing to say. He said "I don't know what is wrong with you senile old man. You still have the chair that you where sitting on." The old man thought that something was wrong and that his daughter had died a long time ago. He relized that he was probaibly getting buglarized. He quickly grabbed his bowl and started to attck Sinclair and Rykker. Sinclair tried to stop Rykker from attacking the old man. Rykker was starting to irritated and just shot the old man with his gun. Shannalottee would enter the house before the shot was fired off and saw her uncle die. She was furious. She tried and killed Rykker. Rykker was trying to tell her that Perice was the one that attacked first. He wanted to defend himself but Sinclair said it was him. He had to attack Shannalotte and try to knock her out. he was not trying to kill someone as young as her. Sinclair was getting mad that someone was getting angrey because of her. She for some reason could not be angrey at something that was her. Sinclair was thinking about leaving Rykker because of how angry he was. She decided to stay and keep him in check. Rykker could not knock out shannalottee since they both had the same skill sets. Sinclair interupted the duel and kocked out shanalottee. 

//Bael our hero now continues on his journey with his friend Vivien. Vivien is still mad about what has happened with Roche the guard captain, but she forgives him. They have escaped the guards and the town. They have moved for about 22 clicks to due east and meet a sage by the name of FileEditSection. He was a sorcerer, he practested some water majic. He was really respected and was someone who should be feared. He was old though and greated the heroes Beal and Vivien with a happy simile. They were happy to see a nice face. Viven said: "Hello, my name is Vivian and this is..." "Beal." interupted Bael. FileEditSection said: "Yo waz up mi boiz". Bael said: "What is wrong with you old man". "Nuning". Viven was confused on who this man was and why he was speaking in such a way. Bael thought of switching the topic. "SO what are you doing here?" Bael said strangely. FileEditSection replied: "OOF, yo boi here is takin a chill diggity dog." (Earthquake noices). Vivien: "What was that??????" FileEditSection: Ahh twat, yuu dinint no no load sondz. Bael was confused on what the sage even said. Bael and Viven think that this man was strange. They decided to just leave the old cope behind. FieldEditSelection stopped them with a water gun attack. They both dodged. Field select would then use Hydro Pump. This knocked out Viven and this enraged Alex he used punish. This was not very effecttive against  FileEditSection. He was not ready to give up on catching the wild FileEditSection. This person was not gonna fit in the pokeTrap. FileEditSeclection was not gonna be his first pokemon. This person was not gonna become a fighting slave that just fight after being issued orders. This person fought to his last breath but finally got captured by a pokeTrap. Alex rushed to the PokeCenter and healed up Vivien and his new pokemon FileEditSelect. After they had left the pokecenter the ran into Gary Oates. Xing was shocked that his logn time rivel was here. "Gary Linebacker". You dare show your face here. What is wrong with you. HOw did you find me. 

//Gary was happy that he finally got to face rivle again. Rizer was pissed just to see gary's face again. They started to battle with their pokemon. Rizer summoned Selica. Gay summoned Johnson. Selica used splash. This had no effect on johnson. Johnson used leer. Silica started to scream stalker. The Police was summoned though accord. The police started useing pyromancies at Johnson. Police used forbidden sun and hit Johnson. Police: "Praise the sun". Gay started shotting lighting outta his eyes, and hit police. This did not hit police as he spammed his roll button. This was lucky since Gay was a great Pvper. He was known to kill everyone. This was not gonna stop Darnic and Silica. They ran back into the pokemon center and healed themselves. Then used a escape rope and teleported out side and ran from Gay. Gary was pissed and went on a rampage. He use bodyslam and destroyed the village. "You Died" Shown up on the police. Darnic ran as fast as he could untill his legs turned into wheels. This shocked Beladona because she did not kno wthat Darnic can just transform into a vehical. They drove all the way to Almozes, a camp of MECHS. They saw a person that was a blacksmith. She was the one that created all the MECHS.