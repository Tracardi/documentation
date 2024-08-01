# Javascript integrations

Tracardi provides a JavaScript snippet that allows seamless integration of any webpage with Tracardi for tracking and
personalization purposes. Follow the steps below to connect and configure the JavaScript snippet on your web page.

## Step 1: Connecting the JavaScript Snippet

To use the Tracardi JavaScript snippet, you need to paste it in the header of your web page. Here's an example of the snippet:

```html linenums="1"

<script>

        !function(e){"object"==typeof exports&&"undefine...  // (1)

        const options = {
            tracker: {
                url: {
                    script: 'http://192.168.1.103:8686/tracker', 
                    api: 'http://192.168.1.103:8686'
                },
                source: {
                    id: "<your-event-source-id-HERE>" // (2)
                }
            }
        }
</script>
```
1. Compiled javascript code must be the first line in the script.
2. You `event source id` should be copied here. Event source can be found in Inbound traffic in Tracardi GUI.

## Step 2: Sending events via Javascript

Events are defined in a separate script. Below you may find an example of such script.

```javascript title="Example" linenums="1"
window.tracker.track("purchase-order", {"product": "Sun glasses - Badoo", "price": 13.45})
window.tracker.track("interest", {"Eletronics": ["Mobile phones", "Accessories"]})
window.tracker.track("page-view",{});
```

Events consist of an event type. Event type is any string that describes what happened. In our example we have 3
events: "purchase-order", "interest", "page-view".

!!! Caution

  The code with events must be placed after the configuration code. Otherwise, it will now work.

### Event type

Event type is a crucial aspect of defining events in Tracardi. It refers to the name that distinguishes events from each
other. For example, a purchase order event provides information about an order, while a page view event signifies a
viewed page.

Defining an appropriate event type is essential to ensure proper categorization and processing of events within
Tracardi. It allows you to effectively organize and analyze event data based on their type, which can aid in gaining
valuable insights and generating meaningful reports. 

#### Importance of Event Type

Event type serves as a unique identifier for events and helps differentiate them from one another. It enables you to
effectively manage and process events, as different events may require different handling or processing logic based on
their type.

When defining an event in Tracardi, you need to specify an event type that accurately represents the nature of the
event. For instance, if you are tracking purchase orders, you can define the event type as "purchase-order". Similarly,
if you are tracking page views, you can define the event type as "page-view".

### Events properties

In Tracardi, each event can have additional data that provides detailed information about the event. For example,
consider the event "interest" which sends data in the format {"Electronics": ["Mobile phones", "Accessories"]}.

Tracardi collects all events with their respective data and sends them as a single request to the Tracardi tracker
endpoint. This request is made when the web page is fully loaded, ensuring that all events and their associated data are
captured accurately.


## Step 3: Refreshing the Page and Verifying the Response

After refreshing your web page with the JavaScript code, you may notice a response from Tracardi indicating "Access
denied. Invalid source." This is because the event source ID was not defined in the __tracker.source.id__ section of the
snippet.

```
Headers:
Status: 401 Unauthorized

Body:
{"detail": "Access denied. Invalid source."}
```

To resolve this, create an event source in Tracardi and replace the string <your-resource-id-HERE> with the actual event source ID from Tracardi, as shown below:

```html linenums="1"
<script>
        !function(e){"object"==typeof exports&&"undefined"!=ty... // (3)
        
        const options = {
            tracker: {
                url: {
                    script: 'http://192.168.1.103:8686/tracker', // (2)
                    api: 'http://192.168.1.103:8686'
                },
                source: {
                    id: "ee2db027-46cf-4034-a759-79f1c930f80d" // (1)
                }
            }
        }

</script>
```

1. Correct `event source id`.
2. Replace IP with the IP of Tracardi API. Please mind the port and correct it as well
3. The code here is truncated for the purpose of more readable documentation.

Please notice that there is also the URL of Tracardi backend server. Please replace the IP e.g. `192.168.1.103` with the
address of your Tracardi server.

## Step 4: Extending with Auto Events and Triggers (optional)

Auto events and triggers provide a streamlined approach to managing event handling in web pages. This documentation outlines the benefits of using auto events, describes how they are configured, and provides guidance on integrating triggers with HTML elements.

At a high level, the primary benefit of using auto events is the centralization of event and trigger definitions. Instead of scattering event handling logic throughout the page, auto events allow for the consolidation of these definitions in one place. This results in improved code organization, readability, and maintainability.

### Key Concepts

1. **Auto Events** - these events are triggered automatically upon page load.
2. **Auto Triggers** - these triggers are activated in response to user interactions with the page.

### Configuration

Auto events and triggers are configured using a structured format.

Following is an example configuration:

```

        const options = {
            tracker: {
                url: {
                    script: 'http://192.168.1.103:8686/tracker', 
                    api: 'http://192.168.1.103:8686'
                },
                source: {
                    id: "<your-event-source-id-HERE>"
                },
                auto: { // (1)
                        events: [
                                ["increase-interest", {"interest": "laptops", "value": 1}],
                                ["increase-interest", {"interest": "systems", "value": 2}],
                                ["page-view", {"category": "laptops"}]
                        ],
                        triggers: [
                                {tag:"product", trigger:'onVisible', data: {event: 'image-viewed'}},
                                {tag:"title", trigger:'onTextSelect', data: {event: 'text-selected'}
                        ]
                }

        }
```

Note:
* (1) - Optional auto object extends the track options.
  
### Usage with Triggers and HTML Elements
In addition to configuring auto events and triggers in your JavaScript code, you can integrate them with HTML elements using the data-tracardi-tag attribute.

This allows you to specify which elements on the page should trigger events based on user interactions.

#### Steps to Implement:

#### 1 - Define Triggers:

Configure auto triggers in your JavaScript code as described in the previous section.

#### 2 - Add data-tracardi-tag Attribute:

Identify the HTML elements on your page that should trigger events based on user interactions.

Add the data-tracardi-tag attribute to these elements and assign a value corresponding to the desired trigger tag defined in your JavaScript configuration.

For example:

```
<div data-tracardi-tag="product"> <!-- Content of the div --> </div>
```

#### 3 - Trigger Events:

When the specified user interaction or condition associated with the trigger occurs on the tagged HTML element, the corresponding event defined in your JavaScript configuration will be triggered.

#### Notes:

1. The value assigned to the data-tracardi-tag attribute should match the tag property specified in your auto trigger configuration.
2. You can customize the data-tracardi-tag value based on your application's specific requirements and naming conventions.
3. By integrating triggers with HTML elements using the data-tracardi-tag attribute, you can easily specify which elements should activate events based on user interactions, enabling flexible and targeted event tracking on your web pages.

