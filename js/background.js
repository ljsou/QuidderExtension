/**
 * Created by Javier on 29/10/03.
 */

// Array to hold callback functions
var callbacks = [];

// This function is called onload in the popup code
function getPageInfo(callback) {
    console.log("background - getPageInfo");
    // Add the callback to the queue
    callbacks.push(callback);
    // Inject the content script into the current page
    chrome.tabs.executeScript(null, { file: "content_script.js" });
};

// Perform the callback when a request is received from the content script
chrome.extension.onMessage.addListener(function(request)  {
    console.log("background - chrome.extension.onMessage.addListener");
    // Get the first callback in the callbacks array
    // and remove it from the array
    var callback = callbacks.shift();
    // Call the callback function
    callback(request);
});
