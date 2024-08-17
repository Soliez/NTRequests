async function main() {

    const globalVarName = prompt("Enter the name of the global variable containing the selected request(s): ");

    const globalVar = window[globalVarName];

    if (!globalVar) {
        console.error(`Global variable '${globalVarName}' not found.`);
        return;
    }

    async function enumerateRequest(request) {
        // Copy URL
        function copyURL(request) {
            return request.url();
        }

        // Copy as cURL
        function copyAsCurl(request) {
            return request.asCurlCommand();
        }

        // Copy as PowerShell
        function copyAsPowerShell(request) {
            return request.asCurlCommand().replace('curl', 'Invoke-WebRequest');
        }

        // Copy as fetch
        function copyAsFetch(request) {
            return request.asFetchCommand();
        }

        // Copy as fetch (Node.js)
        function copyAsNodeFetch(request) {
            return request.asNodeFetchCommand();
        }

        // Copy response
        async function copyResponse(request) {
            const response = await request.getContent(); // Changed to getContent() to get the body of the response
            return response;
        }

        // Enumerate Request Details
        const result = {
            url: copyURL(request),
            curl: copyAsCurl(request),
            powershell: copyAsPowerShell(request),
            fetch: copyAsFetch(request),
            nodeFetch: copyAsNodeFetch(request),
            response: await copyResponse(request),
        };

        return result;
    }

    async function enumerateAllRequests(requests) {
        
        // Copy all URLs
        function copyAllUrls(requests) {
            return requests.map(request => request.url());
        }
        
        // Copy all as cURL
        function copyAllAsCurl(requests) {
            return requests.map(request => request.asCurlCommand());
        }
        
        // Copy all as PowerShell
        function copyAllAsPowerShell(requests) {
            return requests.map(request => request.asCurlCommand().replace('curl', 'Invoke-WebRequest'));
        }
        
        // Copy all as fetch
        function copyAllAsFetch(requests) {
            return requests.map(request => request.asFetchCommand());
        }
        
        // Copy all as fetch (Node.js)
        function copyAllAsNodeFetch(requests) {
            return requests.map(request => request.asNodeFetchCommand());
        }
        
        // Copy all as HAR
        function copyAllAsHAR(requests) {
            return JSON.stringify({
                log: {
                    version: '1.2',
                    creator: { name: 'Arc Browser', version: '1.0' },
                    entries: requests.map(request => request.toHar())
                }
            });
        }

        // Enumerate Request Details
        const result = {
            allUrls: copyAllUrls(requests), // Changed request to requests
            allAsCurl: copyAllAsCurl(requests),
            allAsPowershell: copyAllAsPowerShell(requests),
            allAsFetch: copyAllAsFetch(requests),
            allAsNodeFetch: copyAllAsNodeFetch(requests),
            allAsHAR: copyAllAsHAR(requests)
        };

        return result;
    }

    const request = globalVar;

    let requestDetails;
    if (Array.isArray(request)) {
        requestDetails = await enumerateAllRequests(request);
    } else {
        requestDetails = await enumerateRequest(request);
    }

    console.log(requestDetails);
    return requestDetails;
}