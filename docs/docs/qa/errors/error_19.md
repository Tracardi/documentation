# Referrer Policy: Ignoring the less restricted referrer policy “no-referrer-when-downgrade” for the cross-site request: https://mydomain.com/track

The message you're seeing in the console log is related to the **Referrer Policy** of the browser. The **Referrer Policy
** controls what information is sent in the `Referer` header when navigating between pages or making HTTP requests.

Here’s a breakdown of the key parts of the message:

1. **Referrer Policy**: This is the browser setting that specifies how much information about the current page (the "
   referrer") is sent when making requests (like when you click a link or load resources from another site).

2. **Ignoring the less restricted referrer policy**: This part means the browser is overriding a less secure or less
   restrictive policy that it deems inappropriate for the request being made.

3. **“no-referrer-when-downgrade”**: This is the specific policy in question. It means that the browser should send
   the `Referer` header (which can include the URL of the current page) unless the request is being made to a less
   secure context (e.g., from HTTPS to HTTP).

4. **Cross-site request**: This indicates that the request is being made from one domain (your site) to another domain (
   in this case, `mydomain.com`). Cross-site requests have stricter rules due to potential security risks.

In your case, the browser is ignoring the `no-referrer-when-downgrade` policy for security reasons, likely because it
involves a **cross-site request**, which could introduce security risks if too much information about the referring page
is shared.

### Solutions:

- You can change the **Referrer Policy** in your HTTP headers or meta tags to a more restrictive policy, such
  as `strict-origin-when-cross-origin` or `no-referrer`, to avoid sending referrer information in cross-site requests.
- Ensure that the domains involved in the requests are using secure HTTPS protocols.

- Connect tracardi to some subdomain of your website domain, if you domain is abc.com create a subdomain
  tracardi.abc.com and point it to tracardi API. This way there will be no cross-site requests.