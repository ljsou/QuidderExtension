/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

console.log("entró: " + localStorage.getItem('pin') + ". .");

if(localStorage.getItem('pin') == null){
    console.log("pin is null");
    chrome.browserAction.setPopup({
        popup:"QuidderExSignUp.html"
    });
}if(localStorage.getItem('pin') == ''){
    console.log("pin is '.'");
    chrome.browserAction.setPopup({
        popup:"QuidderExSignUp.html"
    });
}if(localStorage.getItem('pin') != '') {
    console.log("pin is not null");
    chrome.browserAction.setPopup({
        popup:"TaggingBox.html"
    });
}

chrome.tabs.query({active: true, windowId: chrome.windows.WINDOW_ID_CURRENT}, function(tabs) {
    console.log("tab query");
    var url = tabs[0].url;
    console.log("url: " + url);
    document.getElementById('url').innerHTML = url;
    $('#url').val(url);
})