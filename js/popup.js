/** * Created by Javier on 29/10/03. *///Global variables for the IP and port.//var ip = "localhost";//var port = "8084";//var ip = "192.168.190.55";    //Unicauca Internal IP//var port = "8085";            //Port for the Unicauca Internal IPvar ip = "190.90.112.7";      //Unicauca Real IPvar port = "8080";            //Port for the Unicauca Real IP//var ip = "186.84.211.46";       //Diego Real IP//var port = "8080";              //Port for the Diego Real IP//Url Global Variables for POST and GET requests.var postUrl = "http://" + ip + ":" + port + "/QuidderExServer/faces/index.xhtml";var getUrl = "http://" + ip + ":" + port + "/QuidderExServer/faces/index.xhtml";// This callback function is called when the content script has been// injected and returned its resultsfunction onPageInfo(o)  {    console.log("popup - onPageInfo");    //document.getElementById("currentLink").value = o.title;    document.getElementById("url").value = o.url;    document.getElementById("summary").innerText = o.summary;}// When the popup HTML has loadedwindow.addEventListener("load", function(evt) {    console.log("popup - addEventListener");    // Handle the click event with the addBookmark function    if(localStorage.getItem('pin') != null){        document.getElementById('save').addEventListener('click', function(){            addBookmark();        });    }    // Handle the click event with the initSingUp function    document.getElementById('submitsingup').addEventListener('click', function(){        initSingUp();    });    // Handle the click event when the user has not a PIN. This function triggers a Register page.    document.getElementById('getpin').addEventListener('click', function(){        var newURL = "http://" + ip + ":" + port + "/QuidderExServer/faces/Register.xhtml";        chrome.tabs.create({ url: newURL });    });    // Call the getPageInfo function in the background page, injecting content_script.js    // into the current HTML page and passing in our onPageInfo function as the callback    //chrome.extension.getBackgroundPage().getPageInfo(onPageInfo);});// POST - GET the data to and from the server using XMLHttpRequestfunction initSingUp() {    console.log("popup - initSingUp");    var xhrInit = new XMLHttpRequest();    // Non-asynchronous request works fine    xhrInit.open("POST", postUrl, false);    var user =  "&pin=" + document.getElementById("userID").value;    //This save the user pin on the localStorage    localStorage.setItem('pin', user);    xhrInit.setRequestHeader("Content-type", "application/x-www-form-urlencoded");    xhrInit.send(user);    var xhReqInit = new XMLHttpRequest();    xhReqInit.open("GET", getUrl, false);    // This async request used to work, but now doesn't for some reason...    // It works if you 'Inspect popup' and step through the code in the Chrome debugger,    // but as soon as you close the debugger and try the same thing, the call fails?!??    xhReqInit.onreadystatechange = function() {        // If the request completed, close the extension popup        console.log(xhReqInit.readyState);        if (xhReqInit.readyState == 4) {            console.log(xhReqInit.status);            if(xhReqInit.status == 202){                var serverResponse = xhReqInit.statusText;                console.log("Server response (202): " + xhReqInit.getResponseHeader("Acepted"));                alert(xhReqInit.getResponseHeader("Acepted"));                chrome.browserAction.setPopup({                    popup:"TaggingBox.html"                });                window.close();            }if(xhReqInit.status == 200){                alert(xhReqInit.getResponseHeader("Info"));                console.log("Server response (200): " + xhReqInit.statusText + " a header:  " + xhReqInit.getResponseHeader("Info"));                chrome.browserAction.setPopup({                    popup:"TaggingBox.html"                });                window.close();            }if(xhReqInit.status == 401){                console.log("Server response (401): " + xhReqInit.getResponseHeader("Warning"));                alert(xhReqInit.getResponseHeader("Warning"));                //console.log("status: " + xhReqInit.statusText);                if(localStorage.getItem('pin') != null){                    localStorage.removeItem("pin");                }            }        }    };    xhReqInit.send();    //window.close();    return false;}// POST - GET the data to and from the server using XMLHttpRequestfunction addBookmark() {    console.log("popup - addBookmark");    var xhr = new XMLHttpRequest();    // Non-asynchronous request works fine    xhr.open("POST", postUrl, false);    var params = localStorage.getItem('pin') + "&url=" + document.getElementById("url").value +        "&summary=" + document.getElementById("summary").value;    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");    xhr.send(params);    var xhReq = new XMLHttpRequest();    xhReq.open("GET", getUrl, false);    // This async request used to work, but now doesn't for some reason...    // It works if you 'Inspect popup' and step through the code in the Chrome debugger,    // but as soon as you close the debugger and try the same thing, the call fails?!??    xhReq.onreadystatechange = function() {        // If the request completed, close the extension popup        console.log(xhReq.readyState);        if (xhReq.readyState == 4) {            console.log(xhReq.status);            if (xhReq.status == 200){                var serverResponse = xhReq.statusText;                console.log(serverResponse);                console.log("Server response (200): " + xhReq.getResponseHeader("Info"));                alert(xhReq.getResponseHeader("Info"));                window.close();            }if(xhReq.status == 401){                alert("Server response (401): " + xhReq.getResponseHeader("Warning"));            }        }    };    xhReq.send();    //window.close();    return false;}