# How to resolve not working tracardi javascript?

#### Q1: **Why is my Tracardi JavaScript not working and no data is being collected?**

There are several possible reasons why your Tracardi JavaScript is not working. Follow these troubleshooting steps to
resolve the issue:

#### Q2: **How should I integrate the Tracardi JavaScript on my webpage?**

- **Ensure Correct Placement**: The JavaScript integration code should be placed either before the closing `</body>` tag
  or in the `<head>` tag.
- **Defined Order for Script Placement**:
    1. **Load Tracardi Script First**: Ensure that the script for loading and initializing Tracardi is placed first to
       fully initialize the tracking library.
    2. **Place Event Scripts After Initialization**: Event triggers (such as page views or clicks) should come after the
       Tracardi script to ensure that the library is available for tracking.

#### Q3: **What errors should I check for if the script is not working?**

- **Console Errors**: Use the browser’s developer console to check for JavaScript errors. These might include incorrect
  script references or other issues.

#### Q4: **What configuration settings should I check?**

- **Event Source Configuration**: Verify that your event source in the Tracardi dashboard. Check its ID in tracardi and on your website.

#### Q5: **Could there be network or CORS issues affecting the tracking?**

- **Network Blockage**: Ensure the Tracardi API endpoint is accessible and requests aren't blocked by firewalls or CORS
  issues.
- **HTTPS Requirements**: Ensure your API calls use HTTPS if your page is served over HTTPS to avoid mixed content
  errors.
- **Avoid Redirection Issues**: Ensure API calls are not being redirected due to protocol mismatches (e.g., HTTP to
  HTTPS).

#### Q6: **Could there be issues with the tracker payload schema?**

- **Tracker Payload Schema**: Check if the payload schema is correct when sending data through the API. This is usually
  not an issue if you're using the Tracardi JavaScript directly.

#### Q7: **Can ad-blockers affect the Tracardi JavaScript?**

- **Ad-blocking Software**: Ad-blockers or privacy tools might block the tracking script. Try disabling these tools to
  check if they are causing the issue.

#### Q8: **How do I debug the Tracardi setup if I don’t see any events?**

- **Event Logs**: Check the Tracardi dashboard for incoming events. If no events are recorded, the issue could be with
  integration or network settings.
- **Version Compatibility**: Ensure your JavaScript is compatible with the version of Tracardi you are using, especially
  if you have recently updated the system.

By following these steps, you can troubleshoot and identify the root cause of why your Tracardi JavaScript is not
collecting data.