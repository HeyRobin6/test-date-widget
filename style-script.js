const fontBtn = document.querySelector(".font");
const modeBtn = document.querySelector(".mode");
const boxModeBtn = document.querySelector(".box-mode")

const box = document.querySelector(".widget-container")
let classMatch = false
let i = 0

const text = Array.from(document.getElementsByTagName('span'))
const btns = Array.from(document.getElementsByTagName('button'))
const fontArray = ["default", "serif", "mono"]

// Initiate settings:
//If no object on localStorage, create default object
if (!localStorage.getItem('userSettings')) {
    const settings = {
        font: 'default',
        mode: 'light-mode',
        boxMode: 'open'
    };

    const settingsJSON = JSON.stringify(settings);
    localStorage.setItem('userSettings', settingsJSON);
} 

//retrieve values from object (previoussly or recently set) and update classes 
let fontValue = retrieveFromStorage("font")
let boxValue = retrieveFromStorage("boxMode")
let modeValue = retrieveFromStorage("mode")
console.log(fontValue)
console.log(boxValue)
console.log(modeValue)

setClasses(fontValue, modeValue, boxValue)


boxModeBtn.addEventListener("click", () => {
    let currentValue = retrieveFromStorage("boxMode")
    // console.log(currentValue);
    if (currentValue=="open") {
        box.classList.remove("open")
        box.classList.add("boxed")
        updateStorage("boxMode", "boxed")
    } else {
        box.classList.remove("boxed")
        box.classList.add("open")
        updateStorage("boxMode", "open")
    }
})

modeBtn.addEventListener("click", () => {
    let currentValue = retrieveFromStorage("mode")
    if (currentValue=="light-mode") {
        document.body.classList.remove("light-mode")
        document.body.classList.add("dark-mode")
        updateStorage("mode", "dark-mode")
    } else {
        document.body.classList.remove("dark-mode")
        document.body.classList.add("light-mode")
        updateStorage("mode", "light-mode")
    }

})

fontBtn.addEventListener("click", () => {
    let currentValue = retrieveFromStorage("font")
    //console.log(currentValue);
    for (let i = 0; i < fontArray.length; i++) {
    // Check if the current element matches the currentValue
    if (fontArray[i] === currentValue) {
        // If a match is found, store its index and break out of the loop
        position = i;
        break;
    }
}
    let i = position;
    classMatch = false;
    //Try while there is no class that matches
    while (!classMatch) {
        //See if class matches
        if (box.classList.contains(`${fontArray[i]}`)) {
            //If it matches, change it to the next one
            box.classList.remove(`${fontArray[i]}`)
            //If the next one is higher than our amount, then go back to cero.
            i++
            if (i > 2) {
                i = 0
            }
            box.classList.add(`${fontArray[i]}`);
            classMatch = true;
            //If not try with the next one, should find it within those 3 options 
        } else {
            i++
            classMatch = false;
        }
    }
    updateStorage("font", `${fontArray[i]}`);

})

//-------

function updateStorage(property, value) {
    if (localStorage.getItem('userSettings')) {
        const savedSettingsJSON = localStorage.getItem('userSettings');
        const savedSettings = JSON.parse(savedSettingsJSON);
        savedSettings[property] = value;
        console.log(savedSettings);
        const updatedSettingsJSON = JSON.stringify(savedSettings);
        localStorage.setItem('userSettings', updatedSettingsJSON);
    } else {
        console.log("Error, please reload the page")
    }

}

function retrieveFromStorage(property) {
    if (localStorage.getItem('userSettings')) {
        const savedSettingsJSON = localStorage.getItem('userSettings');
        const savedSettings = JSON.parse(savedSettingsJSON);
        const value = savedSettings[property];
        return value;
    } else {
        console.log("Error, please reload the page")
    }
}

function setClasses(fontClass, modeClass, boxClass) {
    box.classList.add(`${fontClass}`);
    document.body.classList.add(`${modeClass}`);
    box.classList.add(`${boxClass}`);
}