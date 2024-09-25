# My tracardi javascript is not working on my page. No data collected. What could be the reason?

If your Tracardi JavaScript is not working and no data is being collected from your webpage, several potential issues
could be causing the problem. Below is a detailed breakdown of the most common causes and how to troubleshoot them
effectively.

### 1. **JavaScript Integration Issues**

One of the most common reasons for Tracardi JavaScript not working is an issue with how the script is integrated into
your webpage.

#### **Ensure Correct Placement**

Make sure that the JavaScript integration code is placed correctly on your webpage:

- Typically, the code should be placed **before the closing `</body>` tag** or within the `<head>` tag if you prefer to
  load it earlier. Incorrect placement can prevent the script from loading properly and tracking events.

#### **Defined Order for Script Placement**

##### 1. **Loading the Tracardi Script First**

- The main Tracardi script (which loads and initializes the Tracardi library) should always be loaded **first**. This
  script is responsible for establishing a connection to Tracardi’s API or your tracking server.
- Loading it first ensures that the tracking library is fully initialized before any events are triggered. Without this
  initialization, no events will be tracked or recorded.

##### 2. **Event Triggers After Initialization**

- After the Tracardi script has been loaded, you can add your event tracking scripts (e.g., tracking page views, clicks,
  or form submissions). These event scripts should always be placed **after** the Tracardi script to ensure that the
  library is initialized before events are sent.
- If event scripts are placed before the Tracardi script, they will fail to trigger since the tracking library won't be
  loaded yet.

Example of an event tracking script:

   ```html

<script>
    tracardi.event('page-view', {
       title: document.title,
       url: window.location.href
    });
</script>
   ```

#### **General Placement Recommendations**

- **Load Tracardi in `<head>` or before `</body>`**: The Tracardi tracking script should either be placed in
  the `<head>` tag (for early loading) or just before the closing `</body>` tag (after the page content loads). Placing
  it in the `<head>` ensures it’s available sooner, but be mindful of potential delays in other page resources. Using
  the `async` attribute can prevent blocking.

- **Event Scripts Must Follow the Tracardi Library**: Always ensure that custom event scripts are placed after the
  Tracardi library is loaded to avoid undefined function errors.

### 2. **Incorrect Configuration**

Another common issue can arise from incorrect configurations in Tracardi.

#### **Event Source Configuration**

Verify that the event source in Tracardi is correctly configured:

- Check the **REST API event source** configuration in the Tracardi dashboard. Ensure that it's ID is the same as
  defined in Tracardi.
- See the response from the API. Check browser network tab  (accessible via developer tools, usually by pressing F12).
  FI API responds 'Invalid source' check the source ID.

### 3. **Network or CORS Issues**

Sometimes, network-related issues or browser security policies (such as CORS) can prevent the Tracardi JavaScript from
working.

#### **Network Blockage**

- Use the browser’s **network tab** (accessible via developer tools, usually by pressing F12) to see if requests to the
  Tracardi API are being blocked. Ensure the requests are not blocked by firewalls or security settings.

#### **Check API Responses**

- Monitor the network tab to check the responses from the Tracardi API when the JavaScript attempts to trigger events.
  Look for any **4xx** or **5xx** error codes, which could indicate issues with authentication, misconfigured endpoints,
  or server problems.

#### **Ensure HTTPS Protocol on HTTPS Pages**

- Ensure that you are using the **HTTPS protocol** if your website is served over HTTPS. Mixed content issues (where an
  HTTP request is made from an HTTPS page) may result in the browser blocking the API call altogether.

#### **Avoid Redirection Issues**

- Some browsers block API requests if they are being redirected from HTTP to HTTPS. Make sure that your Tracardi API
  calls are using the correct protocol (HTTPS) and are not being redirected.

### 4. **Tracker Payload Schema**

If you are manually setting the payload schema (e.g., when using the API directly), make sure that the schema is correct
and matches Tracardi's expectations. Incorrect schemas can result in data not being recorded. However, if you're using
Tracardi's JavaScript directly, this issue is less likely to occur.

### 5. **Ad-blockers or Script Blocking**

#### **Ad-blocking Software**

- Sometimes, ad-blockers or privacy extensions (such as those found in browsers like Brave, or through third-party tools
  like uBlock Origin) can block tracking scripts. If users have these tools enabled, the Tracardi JavaScript may not
  run. Disable these tools temporarily to see if they are causing the issue.

### 6. **Debugging Tracardi Setup**

#### **View Event Logs in Tracardi**

- Check the event logs in the Tracardi dashboard to see if any events have been recorded. If no events are visible, this
  indicates an issue with the integration or network setup.

#### **Version Compatibility**

- If you have recently updated Tracardi, ensure that your JavaScript code is compatible with the new version. Tracardi
  frequently introduces changes (such as refactoring of the collector), which may require updates to how the JavaScript
  is integrated. Ensure that your tracking code follows the latest documentation.

### Conclusion

By following these steps, you should be able to diagnose and resolve why your Tracardi JavaScript is not collecting
data. Begin by ensuring that your JavaScript is correctly integrated and placed, then verify your configurations and
network accessibility. Checking for browser-based blocking and debugging via the Tracardi dashboard will also help
identify the root cause.