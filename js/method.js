import self from './self';

// listen for messages
self.onmessage = (message) => {
    const { url, requestObj } = JSON.parse(message);
    // All core API will be called from here
    fetch(url, requestObj)
        .then((response) => {
            // send a message, strings only
            self.postMessage(response.toString());
        })
        .catch((error) => {
            self.postMessage(error.toString());
        });
};
