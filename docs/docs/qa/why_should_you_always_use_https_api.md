# Why should you always use HTTPS as tracardi endpoint.

Using HTTPS as the endpoint for your Tracardi API is essential for several reasons:

1. **Avoiding CORS Errors During Preflight Requests:**
   When making cross-origin requests in modern web browsers, the browser first performs a **preflight request** using
   the `OPTIONS` method to check if the actual request is safe to send. If the preflight request results in a **307
   redirect** (which occurs when a temporary redirect is made), certain browsers like Chrome will block the request if
   the redirect involves switching between `http` and `https` protocols. This is due to security concerns.

   Specifically, a **CORS error** can occur when a preflight request is redirected to another domain, especially when
   switching from `http` to `https`. Chrome, in particular, is very strict with its CORS policy and will block this
   redirection, resulting in **no data being collected** from the Tracardi API.

2. **Preventing 307 Redirect Issues:**
   A **307 redirect** in a preflight call can happen if your Tracardi API is hosted on an `http` endpoint and the
   browser tries to redirect it to an `https` endpoint. This can confuse the browser’s CORS handling, causing it to
   block the request. Browsers like Chrome do not allow redirects during preflight `OPTIONS` requests, leading to the
   API call being completely blocked.

   By using **HTTPS** as the endpoint, you avoid the need for such redirects, ensuring that all preflight requests and
   actual API calls are successfully completed. This leads to smoother, uninterrupted data flow and API communication.

3. **Security Considerations:**
   Apart from avoiding CORS issues, using HTTPS ensures that your data is encrypted during transit. This means that any
   sensitive data, such as user information or analytics data, is securely transferred between your client and the
   Tracardi API, reducing the risk of interception by malicious actors.

4. **Browser Compatibility and Best Practices:**
   Modern browsers like Chrome, Firefox, and Safari increasingly prioritize security and privacy. Using HTTPS aligns
   with best practices recommended by browsers, ensuring that your application remains compatible with browser updates
   and prevents potential issues with blocked requests due to insecure endpoints.

**Summary:**

By always using **HTTPS** for Tracardi API endpoints, you avoid CORS-related issues, especially those caused by 307
redirects in preflight requests. Chrome’s strict policies on redirect handling can prevent data from being collected if
an insecure `http` endpoint is used. To ensure smooth operation, proper data collection, and secure communication,
always opt for HTTPS.