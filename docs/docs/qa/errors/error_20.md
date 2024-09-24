# Why do I get a CORS error in Chrome when collecting data using the HTTP protocol, and how can I fix it?

### Answer:

CORS (Cross-Origin Resource Sharing) errors occur in Chrome because some browsers are more restrictive regarding
preflight OPTIONS requests. When collecting data via HTTP, if a service enforces HTTPS, it needs to redirect to the
HTTPS version of the Tracardi API. Some browsers, like Chrome, do not allow AJAX calls to be redirected, which results
in a CORS error.

#### How to fix this:

1. **Ensure HTTPS is used directly**: Avoid the HTTP to HTTPS redirect by directly sending requests to the HTTPS version
   of the API. This eliminates the need for a browser to handle the redirect, preventing the CORS issue from occurring.

2. **Use the same protocol**: Ensure the website collecting the data and the API are both served over HTTPS to avoid
   mixed-content issues and CORS problems due to protocol differences.

