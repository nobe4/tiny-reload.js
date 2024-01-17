(function (window, undefined) {
  "use strict";

  function getHash(URL) {
    return new Promise((resolve, reject) => {
      fetch(URL)
        .then((response) => (response.ok ? response.blob() : undefined))
        .then((b) => new Response(b).arrayBuffer())
        // Ref: https://stackoverflow.com/a/7616484
        .then((a) =>
          resolve(new Uint8Array(a).reduce((a, b) => ((a << 5) - a + b) | 0)),
        )
        .catch(reject);
    });
  }

  function watchURL(URL, timeout, debug, previousHash = "") {
    if (debug) console.log("Watching", URL, previousHash);

    getHash(URL)
      .then((hash) => {
        if (previousHash === "" || hash === previousHash) {
          setTimeout(() => watchURL(URL, timeout, debug, hash), timeout);
        } else {
          window.location = window.location;
        }
      })
      .catch((error) => {
        if (debug) console.log("Error while getting the file", URL, ":", error);
      });
  }

  /* Entrypoint, set the config and call watch URL for each URL.
   * parameters:
   *     URLs:    Array of URLs to watch.
   *     timeout: How quickly to fetch the URLs, in ms.
   *     debug:   Print the error messages.
   */
  window.tinyReload = function (urls, timeout = 1000, debug = false) {
    urls.forEach((u) => watchURL(u, timeout, debug));
  };
})(window);
