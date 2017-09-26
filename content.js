// content.js
//alert("Hello from your Chrome extension!")

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		if (request.message === "clicked_browser_action"){
			var urls = [];
			for (var i = 0; i < 5; i++){
				var firstHref = $("a[href^='http']").eq(i).attr("href");
				console.log(firstHref);
				urls.push(firstHref);
			}

			//console.log(urls[1]);
			// sending a message to background to open a new tab
			chrome.runtime.sendMessage({"message": "open_new_tab", "url": urls});
		}
	}
);



