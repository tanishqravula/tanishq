const divResult = document.getElementById("divResult");
const divResultPath = document.getElementById("divResultPath");

const btnUser = document.getElementById("btnUser");
btnUser.addEventListener("click",getUser);

var path = [];


async function getRepos(){
    while(path.length>0)path.pop();
    // clear(); 
    // clearPath();
    var username = document.getElementById("username").value;
    const url = "https://api.github.com/search/repositories?q=user:" + username +"+sort%3Aupdated";
    const headers = {
        "Authorization" : `Basic ${btoa(`c30baaa9c2b46d273bf0:718c040702fb459cb0189fe31fc90177e4f53a15`)}`
    } 
    const response = await fetch(url, {
        "method" : "GET",
        "headers" : headers
    });
    const result = await response.json();     
    result.items.forEach(i => {

        const heading = document.createElement("h5");
        heading.textContent = i.name;
        divResult.appendChild(heading);
        const para = document.createElement("p");
        para.textContent = i.description;
        divResult.appendChild(para);
        const forks = document.createElement("span");
        forks.textContent = "Forks: " + i.forks_count;
        forks.setAttribute("class","badge badge-dark mx-1");
        divResult.appendChild(forks);
        const watchers = document.createElement("span");
        watchers.textContent = "Watchers: " + i.watchers_count;
        watchers.setAttribute("class","badge badge-primary mx-1");
        divResult.appendChild(watchers);
        const stars = document.createElement("span");
        stars.textContent = "Stars: " + i.stargazers_count;
        stars.setAttribute("class","badge badge-success mx-1");
        divResult.appendChild(stars);


        const btnrep = document.createElement("button");
        btnrep.setAttribute("id", i.name);
        btnrep.setAttribute("class", "btn btn-primary");
        btnrep.addEventListener("click", () => {getrepoContent(btnrep.id);});
        btnrep.textContent = "View Repo";
        btnrep.style.float="right";
        divResult.appendChild(btnrep);
        divResult.appendChild(document.createElement("hr"));


    });
}

async function getrepoContent(reponame){
    clear(); 
    add(reponame);
    update_Path();
    
    var username = document.getElementById("username").value;
    const url = "https://api.github.com/repos/"+ username + "/" + reponame + "/contents";
    const headers = {
        "Authorization" : `Basic ${btoa(`c30baaa9c2b46d273bf0:718c040702fb459cb0189fe31fc90177e4f53a15`)}`
    } 
    const response = await fetch(url, {
        "method" : "GET",
        "headers" : headers
    });
    const result = await response.json(); 
    result.forEach(i=>{

        if(i.type == "file"){
            const sym = document.createElement("i");
            sym.setAttribute("class","fa fa-file");
            sym.style.paddingRight="5px";
            sym.style.color="#bae7ff";
            divResult.appendChild(sym);    
        }
        else{
            const sym = document.createElement("i");
            sym.setAttribute("class","fa fa-folder");
            sym.style.paddingRight="5px";
            sym.style.color="#47bfff";
            divResult.appendChild(sym);    
        }

        const btncontent = document.createElement("button");
        btncontent.textContent = i.name;    
        btncontent.setAttribute("id", i.name);
        btncontent.setAttribute("class", "fileBtn");
        btncontent.addEventListener("click", () => {
            if(i.type == "file")getFileContent(url + "/" + i.name, i.name);
            else getDirContent(url + "/" + i.name, i.name);
        });
        divResult.appendChild(btncontent);
        divResult.appendChild(document.createElement("br"));
    });
}

function remove(name){
    while(path[path.length-1]!=name){
        path.pop();
    }
}

function add(name){
    if(path[path.length-1]!=name)
        path.push(name);
}

function removePathButton(name, url){
    remove(name);
    getDirContent(url, name);
}


function update_Path(){
    clearPath();
    if(path.length == 0)return;
    var username = document.getElementById("username").value;
    const filePath = document.createElement("button");
    filePath.addEventListener("click", () => {remove(path[0]);clearPath();getrepoContent(path[0]);});
    filePath.textContent = path[0];
    divResultPath.appendChild(filePath);
    const gap = document.createElement("span");
    gap.textContent = " / ";
    divResultPath.appendChild(gap);
    var url = "https://api.github.com/repos/" + username + "/" + path[0] + "/contents";
    for(i=1;i<path.length;i++){
        url += "/" + path[i];
        const filePath = document.createElement("button");
        filePath.textContent = path[i];
        const thisURL = url;
        const thisName = path[i];
        filePath.addEventListener("click", ()=>{removePathButton(thisName, thisURL);});
        divResultPath.appendChild(filePath);
        const gap = document.createElement("span");
        gap.textContent = " / ";
        divResultPath.appendChild(gap);
    }
}


async function getDirContent(url, name){
    clear();
    add(name);
    update_Path();

    const headers = {
        "Authorization" : `Basic ${btoa(`c30baaa9c2b46d273bf0:718c040702fb459cb0189fe31fc90177e4f53a15`)}`
    } 
    const response = await fetch(url, {
        "method" : "GET",
        "headers" : headers
    });
    const result = await response.json(); 
    result.forEach(i=>{
        
        if(i.type == "file"){
            const sym = document.createElement("i");
            sym.setAttribute("class","fa fa-file");
            sym.style.paddingRight="5px";
            sym.style.color="#bae7ff";
            divResult.appendChild(sym);    
        }
        else{
            const sym = document.createElement("i");
            sym.setAttribute("class","fa fa-folder");
            sym.style.paddingRight="5px";
            sym.style.color="#47bfff";
            divResult.appendChild(sym);    
        }    

        const btncontent = document.createElement("button");
        btncontent.textContent = i.name;    
        btncontent.setAttribute("id", i.name);
        btncontent.setAttribute("class", "fileBtn");
        btncontent.addEventListener("click", () => {
            if(i.type == "file")getFileContent(url + "/" + i.name, i.name);
            else getDirContent(url + "/" + i.name, i.name);
        });
        divResult.appendChild(btncontent);
        divResult.appendChild(document.createElement("br"));
    });
}

async function getFileContent(url, name){
    clear(); 
    const filePath = document.createElement("span");
    filePath.textContent = name;
    divResultPath.appendChild(filePath);

    const headers = {
        "Authorization" : `Basic ${btoa(`c30baaa9c2b46d273bf0:718c040702fb459cb0189fe31fc90177e4f53a15`)}`
    } 
    const response = await fetch(url, {
        "method" : "GET",
        "headers" : headers
    });
    const result = await response.json();
    const filecontent = document.createElement("pre");
    if(url.substring(url.length-2,url.length) == "md"){
        console.log("md");
        filecontent.setAttribute("class", "prettyprint");
        filecontent.textContent = atob(result.content);
        divResult.appendChild(filecontent);
        divResult.appendChild(document.createElement("br"));
    }
    else{
        filecontent.setAttribute("class", "prettyprint");
        filecontent.textContent = atob(result.content);
        divResult.appendChild(filecontent);
        divResult.appendChild(document.createElement("br"));
    }
}

function clear() {
    while(divResult.firstChild)divResult.removeChild(divResult.firstChild);
}
function clearPath() {
    while(divResultPath.firstChild)divResultPath.removeChild(divResultPath.firstChild);
}


async function getUser(){

    clear(); 
    clearPath();

    var username = document.getElementById("username").value;
    var temp;
    const url = "https://api.github.com/users/" + username;
    const headers = {
        "Authorization" : `Basic ${btoa(`c30baaa9c2b46d273bf0:718c040702fb459cb0189fe31fc90177e4f53a15`)}`
    } 
    const response = await fetch(url, {
        "method" : "GET",
        "headers" : headers
    });
    const result = await response.json();    

    divResult.innerHTML = `<div class="card border-primary mb-3" style="max-width: 100rem;">
    <div class="card-header"><h3>${result.name}</h3></div>
    <div class="card-body">
      <div class="row">
      <div class="col-md-3">
        <img class="img-thumbnail avatar mt-5" src="${result.avatar_url}">
      </div>
      <div class="col-md-9">
        <span class="badge badge-dark">Public Repos: ${result.public_repos}</span>
        <span class="badge badge-primary">Public Gists: ${result.public_gists}</span>
        <span class="badge badge-success">Followers: ${result.followers}</span>
        <span class="badge badge-info">Following: ${result.following}</span>
        <br><br>
        <ul class="list-group">
          <li class="list-group-item">Company: ${result.company}</li>
          <li class="list-group-item">Website/blog: <a href="${result.blog}" target="_blank">${result.blog}</a></li>
          <li class="list-group-item">Location: ${result.location}</li>
          <li class="list-group-item">Member Since: ${result.created_at}</li>
        </ul>
        </div>
      </div>
    </div>
  </div>
  <h3 class="page-header">Repos</h3>`;

    getRepos();

}