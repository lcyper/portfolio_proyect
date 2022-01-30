


function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

let responseText = httpGet('./proyects/proyects.json');
let proyectsList = JSON.parse(responseText);
let sectionHtml = document.querySelector('section.project-covers');
let documentFragment = document.createDocumentFragment();

for (const proyect of proyectsList) {
    /* <a class="project-cover" href="">
 <div class="cover-image">
 --img--
 </div>
 <!-- <div class="details-wrap">
 <div class="details">
 
 </div>
 </div> -->
 </a> */

    let a = document.createElement("a");
    a.className = "project-cover";
    a.href = `./proyects/${proyect['folder']}index.html`;

    let div = document.createElement("div");
    div.className = "cover-image";

    let img = document.createElement("img");
    img.src = `./proyects/${proyect['folder']}index.jpg`;

    div.appendChild(img);
    a.appendChild(div);

    // details
    let details = document.createElement("div");
    details.className = "details";
    let title = document.createElement("p");
    title.textContent = `- ${proyect['title']} -`;
    details.appendChild(title);

    a.appendChild(details);
    documentFragment.appendChild(a);


}
sectionHtml.appendChild(documentFragment);