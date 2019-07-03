let filterInput = document.getElementById("search");
filterInput.addEventListener("keyup", filterNames);

readTextFile("https://gist.githubusercontent.com/sminez/571bd7bafb1b88630b85c85a0cd66e3a/raw/68fe21504be4654b739a577a482d91587524f683/ippsec-details.txt");


function readTextFile(file)
{
  let rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function (){
    if(rawFile.readyState === 4){
      if(rawFile.status === 200 || rawFile.status == 0){
        var allText = rawFile.responseText;

        let array = allText.split('\n')

        let currentBox = "";
        let currentLink = ""
        for (let index = 0; index < array.length; index++) {
          let element = array[index];
          if(element.indexOf("HackTheBox - ") > -1){
            currentBox = element.split("HackTheBox - ")[1];
          }
          if(element.indexOf("https://www.youtube.com/watch?v=") > -1){
            currentLink = element.split("&list=")[0];
          }
          if(element.indexOf(" - ") > -1 && element.split(" - ")[0] != "HackTheBox"){
            let ul = document.getElementById("timestamps");

            let li = document.createElement("li");
            li.innerHTML = "<li class=\"timestamp\"><p><a href=\"" + currentLink + "\">" + currentBox + "</a> - <a href=\"" + currentLink + ";t=" + timeToSeconds(element.split(" - ")[0]) +"\">" + element.split(" - ")[0].trim() + "</a></br> " + element.split(" - ")[1] + "</p></li>";

            ul.appendChild(li);
          }
          console.log(currentLink + element);
        }
      }
    }
  }
  rawFile.send(null);
}

function timeToSeconds(time){
  let minAndSec = time.split(":");
  let seconds = parseInt(minAndSec[0] * 60) + parseInt(minAndSec[1]);
  if(seconds == NaN){
    return 0;
  }else{
    return seconds;
  }
}

function filterNames(){
  let filterValue = document.getElementById("search").value.toUpperCase();

  let ul = document.getElementById("timestamps");
  let li = ul.querySelectorAll("li.timestamp");

  for (let index = 0; index < li.length; index++) {
    let element = li[index];
    let innerText = element.innerHTML.toUpperCase();
    innerText = innerText.trim().split("</A>")[2];
    if(innerText.indexOf(filterValue) > -1){
      element.style.display = "";
    } else {
      element.style.display = "none";
    }
  }
}