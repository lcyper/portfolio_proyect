function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
let proyectIndex = getUrlVars()["index"];


function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

let responseText = httpGet('./proyects.json');
let proyectsList = JSON.parse(responseText);
let proyect = proyectsList[proyectIndex];

document.querySelector('body header img').src = `./images/${proyect["img"]}`;
document.querySelector('body header h1').textContent = proyect["title"];

let contentContainer = document.querySelector('body div#content');
let documentFragment = document.createDocumentFragment();

for (const bloc of proyect["body"]) {

    let title = document.createElement("h3");
    title.textContent = bloc["title"];
    documentFragment.appendChild(title);

    let content = document.createElement("p");
    content.textContent = bloc["content"];
    documentFragment.appendChild(content);
    /* <h3>title h3</h3>
    <p>content</p> */
}
contentContainer.appendChild(documentFragment);

let technologies = "";
for (const technologi of proyect["Technologies"]) {
    technologies += `#${technologi} `;
}
document.querySelector('body blockquote p:last-child').textContent = technologies;