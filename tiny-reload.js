(function(window, undefined){
	"use strict";

	let _debug = false;
	let _timeout = 1000;

	function getHash(URL, callback){
		// Use the fetch API, and chain promises.
		fetch(URL)
			.then(response => response.ok?response.blob():undefined)
			.then(blob => {
				// Read the blob as an array.
				let reader = new FileReader();
				reader.addEventListener('loadend', _ => {
					callback(
						// Really simple hash: just sums all the int.
						new Uint8Array(reader.result).reduce((a,b) => a+b)
					);
				});
				reader.readAsArrayBuffer(blob);
			})
			.catch(error => {
				if (_debug) console.log('Error while getting the file', URL, ':', error);
			});
	}

	function watchURL(URL, previousHash = ''){
		getHash(URL, hash => {
			if (_debug) console.log('Watching', URL, hash, previousHash);
			// No hash, or the file didn't change, reload...
			if (previousHash == '' || hash == previousHash) {
				setTimeout( _ => watchURL(URL, hash), _timeout);
			} else { // Otherwise, reload the file.
				window.location = window.location;
			}
		});
	}

	/* Entrypoint, set the config and call watch URL for each URL.
	 * parameters:
	 *     URLs:    Array of URLs to watch.
	 *     timeout: How quickly to fetch the URLs, in ms.
	 *     debug:   Print the error messages.
	 */
	window.tinyReload = function(URLs, timeout=1000, debug=false){
		_timeout = timeout;
		_debug = debug;
		URLs.forEach(URL => watchURL(URL));
	};

})(window);
