# How Tracardi Resolves Location

Tracardi resolves location based on the IP address of the user. The process of location resolution in Tracardi can be
broken down into two main methods: client-side resolution and server-side resolution.

## Client-Side Resolution

When an event is sent from JavaScript on the client side, Tracardi uses the IP address present in the request header to
determine the user's location. This method relies on the IP information provided directly by the user's browser.
Tracardi connects form the browser to the location resolution service and saves the location in browser local storage.

## Server-Side Resolution

If the MaxMind service is configured, Tracardi can also resolve the location on the server side. This method is
triggered only if the location was not resolved on the client side. To enable this, the
following environment variables must be set:

```plaintext
MAXMIND_ACCOUNT_ID=xxx
MAXMIND_LICENSE_KEY=yyy
```

Replace `xxx` with your MaxMind account ID and `yyy` with your MaxMind license key.

### Steps for Server-Side Resolution

1. **Configuration**:
    - Ensure that the MaxMind account ID and license key are set as environment variables.
    - This connects Tracardi to the MaxMind GeoIP service, which provides accurate location data based on IP addresses.

2. **Location Assignment**:
    - When an event is processed, Tracardi uses the IP address from the event to query the MaxMind service.
    - The service returns the geographical location associated with that IP address.
    - Location is saved within session, profile and event if possible.

### Handling Location Data in Sessions and Profiles

- **Session Location**:
    - The location of a session is set when the session starts. This initial location is based on the first event of the
      session.

- **Profile Location**:
    - The profile's last known location is updated with each new event that occurs within the same session. This means
      that the most recent event's location information is always stored in the user's profile.

