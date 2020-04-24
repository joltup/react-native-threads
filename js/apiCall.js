import Thread from './Thread';

const callApi = (url, requestObj) => {
    return new Promise((resolve, reject) => {
        // start a new react native JS process
        const thread = new Thread('./method.js');
        // send a message, strings only
        thread.postMessage(JSON.stringify({ url, requestObj }));
        // listen for messages
        thread.onmessage = (response) => {
            const result = JSON.parse(response);
            resolve(result);
            // stop the JS process
            thread.terminate();
        };
    });
};
