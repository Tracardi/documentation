# How profile resolution works in tracardi?

The Tracardi profile resolution process is a mechanism used to ensure that the data associated with a user is correctly
and consistently merged into a single profile. This process is crucial for creating unified customer profiles, even when
data comes from various sources or channels. Here's how the profile resolution process works:

1. Event Ingestion:

   When an event is sent to Tracardi, it typically contains some identifying information, such as a profile ID.
   If an event contains a profile ID, Tracardi attempts to match this profile ID with an existing profile in its
   database.

2. Profile Identification:

   If a matching profile ID is found, the event data is linked to that existing profile.
   If no profile ID is provided or if the profile ID does not match any existing profiles, Tracardi tries to identify
   the profile using other identification points, such as an email address, phone number, or other unique identifiers
   that might be part of the event data. This is only possible for some event types like "profile-update", etc. Not all
   event will have PII data therefore including profile ID in event is so crucial.

3. Profile Creation:

   If Tracardi cannot find a matching profile based on the provided identification points, it creates a new profile and
   assigns it a unique profile ID. This profile ID is returned on the response of Tracardi API. System Expects that this
   ID will be attached to each next event associated with this profile. This new profile will start accumulating data
   from events associated with it.

4. Profile Merging:

   Tracardi includes a profile merging mechanism that can automatically combine profiles that share common identifiers (
   such as the same email address).
   When the event type "identification" is send to the system two or more profiles represent the same individual (based
   on matching identification points), it merges them into a single profile. The merged profile retains all relevant
   data, and any old profile IDs
   are added to the profile.ids field for historical reference.
   This merging process ensures that the system maintains a single, unified profile for each individual, even if the
   data comes from different sessions, devices, or channels.

5. Profile Resolution and Updates:

   Each time an event is processed, Tracardi performs a resolution check to determine if the incoming event data should
   update an existing profile or create a new one.

6. Session Handling:

   Tracardi also manages sessions associated with each profile. A new session ID may be generated when a user interacts
   with the system after a period of inactivity, but the session is still linked to the same profile.

7. Historical Data and Profile Continuity:

   The system stores all historical profile IDs in the profile.ids field to ensure continuity and a complete history of
   the user's interactions. When profiles are merged, IDs from all devices are preserved so that if an old profile ID
   from another device is used to identify the profile, the system can correctly recognize it and return the new profile
   ID. These old profile IDs remain in the system, allowing for accurate identification across devices even when older
   IDs are used.
