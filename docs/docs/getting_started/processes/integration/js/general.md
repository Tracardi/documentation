# Processing events from browser


In Tracardi, browser events are processed in two main stages: the browser stage (split into Stage 1 and Stage 2) and
server processing. Here’s a breakdown of each stage:

### Browser Stage 1: Page Load and Initial Event Collection

1. **Page Rendering:** During the first stage, when the page is loading, the browser reads and renders all elements. At
   this point, the page is not yet visible to the user.

2. **Event Collection:** As the browser parses the page, it collects events using the command:
   ```javascript
   window.tracker.track(<event-type>, <properties>, {})
   ```
   If there are multiple events on the page, they are stored in memory but not yet sent to Tracardi.

3. **Batch Sending:** Once the page loading is completed, the collected events are sent all at once to Tracardi through
   a single API call. This batching helps reduce the number of network requests and enhances performance.

4. **JavaScript Snippet:** Tracardi uses a JavaScript snippet embedded within the web page to gather these events. This
   snippet tracks user interactions and transmits them to the Tracardi server asynchronously.

5. **Limitation:** The default behavior in this stage means events are not fired in a specific order, and real-time
   event transmission (e.g., clicks or mouse hovers) requires a different approach, handled in Stage 2.

### Browser Stage 2: Real-Time Event Collection

1. **Dynamic Events:** After the page has loaded, sending an event using:
   ```javascript
   window.tracker.track(<event-type>, <properties>, {})
   ```
   no longer automatically triggers an event. The trigger in Stage 1 was the page load itself, so now, events such as
   clicks, scrolls, or mouseovers must use the "fire: true" option to ensure they are sent immediately:
   ```javascript
   window.tracker.track(<event-type>, <properties>, {"fire": true})
   ```

2. **Immediate Firing:** Setting `"fire": true` in the track command ensures that events are dispatched immediately
   without waiting for the page to reload.

### Server Processing of Events

1. **Open Source vs. Commercial:** The processing of events on the server differs between the open-source and commercial
   versions of Tracardi:
    - **Open Source:** Processes all event stages one after another synchronously.
    - **Commercial Version:** Processes all stages in parallel. The workflow processing is detached from the collection
      process, which means no responses are sent back to the browser by default.

2. **Synchronous Processing (Optional):** By default, the commercial version processes events asynchronously. However,
   if you need a synchronous response (e.g., to return data or a widget to the browser), you can use:
   ```javascript
   window.tracker.track(<event-type>, <properties>, {"async": false})
   ```
   This setting requires the server to complete event processing before responding.

This comprehensive structure allows Tracardi to efficiently collect, process, and respond to browser events, offering
flexibility for both initial data collection and real-time user interactions.