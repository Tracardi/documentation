# Parametrized URL (Cross-domain profile linking)

A parameterized link in Tracardi is a URL that contains specific parameters designed to track and identify user
interactions and collect data effectively. These parameters help in associating the link click with a specific user
profile, session, or other relevant information.

## Key Concepts of Parameterized Links

1. **Profile ID (`__tr_pid`):** This parameter carries the unique identifier of a user profile. When a user clicks the
   link, the profile ID is used to associate the interaction with the correct profile in Tracardi.
2. **Source ID (`__tr_src`):** This parameter identifies the source of the event. It is used to understand where the
   traffic is coming from (e.g., a specific campaign, email, or ad).
3. **Session ID (`__tr_sid`):** This parameter can be used to maintain session continuity and link interactions within
   the same session.

## Creating a Parameterized Link

To create a parameterized link, you need to append the necessary parameters to your URL. Here’s a step-by-step guide:

### Step 1: Construct the Parameterized Link

Include the profile ID, source ID, and optionally, the session ID in your URL.

**Example URL:**

```html
http://example.com/landing-page?__tr_pid=<profile-id>&__tr_src=<source-id>&__tr_sid=<session-id>
```

- Replace `<profile-id>` with the actual profile ID.
- Replace `<source-id>` with the actual source ID.
- Replace `<session-id>` with the actual session ID (if necessary).

**Example:**

```html
http://example.com/landing-page?__tr_pid=12345&__tr_src=email_campaign&__tr_sid=67890
```

!!! Tip

   If tracardi javascript snippet is placed on the source and destination page adding parameters can be automated. 
   See [Append profile ID to external links](../js/index.md#append-profile-id-to-external-links-tagging-links).

### Step 2: Use the Parameterized Link in Your Campaigns

Embed this URL in your marketing campaigns, such as email newsletters, ads, or social media posts. When users click on
these links, Tracardi will track their interactions using the provided parameters.

### Step 3: Add JavaScript Snippet on the Web Page

Ensure that Tracardi is configured to recognize and process these parameters:

1. **Include JavaScript Integration on the target web page:**
    - Embed the Tracardi tracking script on your landing page. This script will capture the parameters and associate the
      interaction with the correct profile and session.


!!! Note

   The destination web site that the params will be sent must have the Tracardi javascript snipped installed and it must be configured
   to accept incoming parameters.

   This is the example of such configuration.

   ```javascript title="Example configuration of destination web site, e.g example.com" linenums="1" hl_lines="10-12"
   var options = {
        tracker: {
            url: {
                script: '//mydomain.com/tracker',
                api: '//mydomain.com'
            },
            source: {
                id: "some-source-id"
            },
            context: {
                tracardiPass: true
               }
        }
   }
   ```

## Example Use Case

Let’s say you’re running an email campaign and want to track user interactions:

1. **E-mail Content:**
    - Include a parameterized link in your email:
   ```html
   <a href="http://example.com/landing-page?__tr_pid=abc123&__tr_src=email_campaign">Click here</a>
   ```

2. **Landing Page:**
    - Ensure the Tracardi JavaScript snippet is included on the landing page to capture the parameters.

3. **Data Collection:**
    - When users click the link, their profile ID and source ID are captured, and interactions are tracked in Tracardi.

### Merging

If the system already has a profile saved in the browser's local storage, it will try to merge the previous history of events on that page with the new profile ID and its history. If the user is visiting your page for
the first time, there shouldn't be any merging.

Remember that if a session number is provided, the event will be associated with the corresponding profile. If only a
profile ID is given, a new session will be created for that profile.