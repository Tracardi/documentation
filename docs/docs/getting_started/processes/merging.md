# Merging

There are two types of merging processes.

* **[Automatic Profile Merging](apm.md)**: Automatic profile merging in Tracardi is a process designed to unify multiple
  profiles that represent the same user. Merging is a background process that looks for the profiles wth the same
  merging key,
  e.g. email.
* **[Identification Points](../definitions/identification_point.md)**: This a realtime process that merges profiles when
  a defined event was sent e.g. `Identification` and it contains data that can be used for mering. Identification Points
  are connected with the other process called [identify verification](identify_verification.md).

### Example of Profile Merging

1. **Initial Interaction**:
    - A user visits a website and signs up with the email address `user@example.com`. Tracardi creates `profile-id-123`
      for this user.

2. **Subsequent Interaction on a Different Device**:
    - The same user visits the website on a different device and signs up again with the same email
      address `user@example.com`. Tracardi creates a new `profile-id-456`.

3. **[Identification Point](../definitions/identification_point.md) Match**:
    - If the [Identification point](../definitions/identification_point.md) is created for a `sign up` event then
      Tracardi detects that both profiles have the same email address. It identifies this as a match and proceeds to
      merge `profile-id-456` into `profile-id-123`. Identification point deliver the information that can be used for
      merging (in this case e-mail). Please make ure that
      you [use verified data in identification points](identify_verification.md)
    - If there is no identification point for this event, two profiles with the same email will be detected with the
      [Automatic Profile Merging](apm.md) (APM) and the profile will be merged.

4. **Data Merging**:
    - The system combines the data from both profiles, updating `profile-id-123` with any new information
      from `profile-id-456` and retaining all historical data.Is updates events and sessions to link to the new merged
      profile.

5. **[Conflict Resolution](merging_strategy.md)**:
    - Conflicting data inf profiles is resolved using predefined set of merging strategies. For example there are 3
      different lastnames in the profile.

5. **Unified Profile**:
    - The final unified profile under `profile-id-123` now contains data from both interactions, providing a complete
      view of the user's behavior and attributes across both devices.

## Why my profile ID in the response from Tracardi is different from the one I have sent?

The profile ID you send in the tracker payload might be different in the response from Tracardi due to several reasons
related to identity resolution, merging profiles, or system updates. Here are the key reasons why this might happen:

1. **[Identity Resolution](identity_resolution.md)**:
    - Tracardi performs identity resolution to merge profiles with matching identifiers (like email or phone number). If
      the system detects that the profile you sent should be merged with an existing profile, it will return the ID of
      the merged profile.

2. **[Profile Merging](merging.md)**:
    - When Tracardi background processed identifies that two profile should be combined with an existing one, it creates
      a unified profile. As a result, the returned profile ID will reflect the consolidated profile rather than the one
      originally sent.

3. **Session-Based Profile Retrieval**:
    - If the session information provided in the payload is linked to a different profile, Tracardi might return the
      profile ID associated with that session. This ensures continuity in tracking user activities across sessions. This
      usually happens when the Profile ID is corrupted.

4. **New Profile Creation**:
    - In some cases, if the profile information sent in the payload does not match any existing profiles or the system
      is configured to automatically create new profile for not existing ones then a new profile will be created, and
      the response will include a newly generated profile ID.

5. **Data Consistency and Updates**:
    - Tracardi continuously updates and maintains profiles based on the latest interactions and data. If there have been
      changes or updates to the profile since the payload was sent, the response might reflect the most current profile
      ID.

### Example Scenarios

- **Scenario 1: Identity Resolution**
    - You send a payload with `profile-id-abc123` and an email. Tracardi identifies that this email already exists
      under `profile-id-def456`. The system merges the profiles and returns `profile-id-def456`.

- **Scenario 2: Session Linking**
    - You send a payload with a session ID `session-id-1` that was originally associated with `profile-id-xyz789`. The
      system returns `profile-id-xyz789` to maintain session continuity.

- **Scenario 3: New Profile Creation**
    - You send a payload with an unknown profile ID. Tracardi creates a new profile and returns the new profile ID
      generated for this interaction.

#### Profile ID maintenance

The above scenarios show that your client software should always save the newest returned profile ID. If the Profile ID
changes it is a sign that the client should update the local Profile ID.

### Configuring Auto Profile Merging in Tracardi Version > 1.1.0

In Tracardi version 1.1.x, **Selective Profile Merging** (APM) was introduced to allow more granular control over how
profiles are merged based on available data. This ensures flexibility in managing customer profiles by setting specific
conditions for when and how profile merging occurs.

#### Key Concepts

1. **[Identification Points](../definitions/identification_point.md)**: These are specific points where a profile can be
   marked for merging. This feature ensures
   that profiles with similar or matching data can be merged based on specific criteria.
2. **Identification Properties**: A set of profile attributes that are evaluated for merging. Profiles with matching
   values in these fields are merged.

---

### Configuration Steps

#### 1. Auto Profile Merging Based on Data Fields (Open-source)

You can configure Tracardi to merge profiles based on specific fields that hold identifying information such as email,
phone numbers, or other unique identifiers. This configuration is controlled by the environment variable
`IDENTIFICATION_EVENT_PROPERTY`.

##### Example:

```plaintext
IDENTIFICATION_EVENT_PROPERTY = data.identifier.pk,data.identifier.id,data.contact.email.business,data.contact.email.main,data.contact.email.private,data.contact.phone.business,data.contact.phone.main,data.contact.phone.mobile,data.contact.phone.whatsapp
```

In this configuration:

- **IDENTIFICATION_EVENT_PROPERTY** lists the fields that Tracardi will use to compare profiles and merge them if the
  same value is found.
- For example, if a profile contains `data.contact.email.main`, and another profile contains the same email, Tracardi
  will merge these profiles.

##### Use Case:

Imagine a user subscribes to a newsletter using their email address. If this email address is copied to the profile, it
will be used to identify and merge profiles if the email is found in other profiles.

##### Important Notes:

- Even if the email is incorrect or unverified, merging will still occur if the values match, so care should be taken
  with the data used for identification.

#### 2. Limiting Fields for Merging

If you want to limit the fields that are considered for merging, you can modify the `IDENTIFICATION_EVENT_PROPERTY`
variable to include only the fields you want to compare. Setting this variable to an **empty string** will disable
merging based on fields altogether.

```plaintext
IDENTIFICATION_EVENT_PROPERTY = ""
```

#### 3. Restricted Merging Based on Event Type (Commercial Version)

In the commercial version of Tracardi, you can restrict profile merging to specific event types. This allows you to
ensure that merging only occurs when certain trusted events are triggered, such as a verified user login or identity
confirmation.

For example:

- You can issue an "identify" event when a user successfully identifies themselves with a verified email.
- Tracardi will only merge profiles if the event type is "identify" and the data fields match.

##### Configuration:

Set the environment variable `IDENTIFICATION_POINT_TYPE` to `"restricted"`.

```plaintext
IDENTIFICATION_POINT_TYPE = "restricted"
```

This restricts merging to specific events, preventing accidental merging of profiles based on unverified or incorrect
data.

#### 4. Merging Anonymous Profiles After Identification (Broad Merging)

If you want to merge all profiles, including anonymous ones, that share the same merging key (e.g., an email), you can
configure Tracardi to do so. This is useful when you collect data from anonymous users without verifying it at first.
Once the user verifies their identity, for example by confirming their email, all profiles (including those with
unverified data, such as an email) will be merged into a single profile. This broadens the merging scope beyond
restricted identification points, allowing any matching profiles to be combined when verification occurs.

##### Configuration:

Set the environment variable `IDENTIFICATION_POINT_TYPE` to `"anonymous"`.

```plaintext
IDENTIFICATION_POINT_TYPE = "anonymous"
```

In this mode, when a user identifies themselves, Tracardi will merge all matching profiles, even if those profiles were
created anonymously.

---

### Summary of Configuration Options

- **IDENTIFICATION_EVENT_PROPERTY**: Defines which fields are considered for merging. Leave empty to disable field-based
  merging.
- **IDENTIFICATION_POINT_TYPE**:
    - `"restricted"`: Only merges profiles when specific event types (e.g., user identification) are triggered.
    - `"anonymous"`: Merges all matching profiles, even anonymous ones.

By configuring these environment variables, you can control the profile merging behavior in Tracardi to suit your
business needs, from broad merging based on any matching data to highly restricted, event-driven merging.

