function getUrlVars() {
    let vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
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

document.querySelector('body main img').src = `./images/${proyect["img"]}`;
document.querySelector('body main h1').textContent = proyect["title"];

let contentContainer = document.querySelector('body div#content');
let documentFragment = document.createDocumentFragment();

for (const bloc of proyect["body"]) {

    let list = document.createElement("li");
    let title = document.createElement("h2");
    list.textContent = bloc["title"];
    title.appendChild(list);
    documentFragment.appendChild(title);

    let content = document.createElement("p");
    content.textContent = bloc["content"];
    documentFragment.appendChild(content);
    /* <h3>title h3</h3>
    <p>content</p> */
}

if (proyect["links"] != null) {
    let links = document.createDocumentFragment();
    for (const linkData of proyect["links"]) {
        // <a href="#" target="_blank">
        //     <span class="iconify" data-icon="ion:logo-apple-appstore"></span>
        // </a>
        let link = document.createElement("a");
        let span = document.createElement("span");
        span.className = 'iconify';
        let iconType = linkData['icon-type'];
        span.setAttribute("data-icon", `ion:${iconType}`);
        link.href = linkData['url'];
        link.target = '_blank'
        link.appendChild(span);
        links.appendChild(link);
    }
    document.getElementById('icons').appendChild(links);
}

contentContainer.appendChild(documentFragment);

let technologies = document.createDocumentFragment();
for (const technologi of proyect["Technologies"]) {
    let span = document.createElement("span");
    span.textContent = `#${technologi}`;
    technologies.appendChild(span);
}
document.querySelector('body blockquote').appendChild(technologies);