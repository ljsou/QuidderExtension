/**
 * Created by Javier on 29/10/03.
 */

// This script is only injected when the popup form is loaded
// (see popup.js), so we don't need to worry about waiting for page load

// Object to hold information about the current page
var pageInfo = {
    //"title": document.title,
    "url": window.location.href,
    "summary": window.getSelection().toString()
};

console.log("content_script - pageInfo: " + pageInfo);

// Send the information back to the extension
chrome.extension.sendMessage(pageInfo);
