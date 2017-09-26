//background.js

// Called when the user clicks on the browser action

chrome.browserAction.onClicked.addListener(function(tab) {
	// Send a message to the active tab
	chrome.tabs.query({active:true, currentWindow: true}, function(tabs)
		{
			var activeTab = tabs[0]; 
			chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
		});
});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.message === "open_new_tab" ) {
			var urls = request.url;
			//console.log(urls);
			var question = "Do you want to open the following links from this page?" + "\n" + urls.join('\n')
			var go = confirm(question);
			if (go === true){
				for (var i = 0; i < urls.length; i++){
					chrome.tabs.create({"url": request.url[i]});
				}	
				alert("tab created!");
			}
			//alert(urls.join('\n'));
		}
	}
);