/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
console.log("entró: " + localStorage.getItem('pin'));

if((localStorage.getItem('pin') == null) || (localStorage.getItem('pin') == '')){
    console.log("pin is: " + localStorage.getItem('pin'));
    chrome.browserAction.setPopup({
        popup:"QuidderExSignUp.html"
    });
} else {
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