# Session

A session refers to a specific period of time during which a user interacts with a website or application. This concept
is essential for analyzing user engagement, understanding user journeys, and providing personalized experiences.

When a user visits a website or application integrated with Tracardi, a unique session ID is assigned to them. This ID
is typically stored in a cookie on the user's device, or in device memory. The session ID enables Tracardi to recognize
and associate the user's actions and events within a specific session.

The Tracardi system calculates visits based on the continuity of the session ID. If the session ID remains the same, it
suggests that the user is still actively engaging with the website or application. Consequently, Tracardi considers this
as part of the same visit. However, if the user closes their browser, or when the session expires, the session ID gets
deleted. A new session begins when the user revisits the site.

Through tracking sessions, Tracardi can offer insights into various aspects of user behavior. For instance, it can
calculate session duration, page views per session, entry and exit points, and conversion rates.

For example, suppose there is a website integrated with Tracardi. When a user visits this site, a session begins, and
the user gets a unique session ID, stored in a cookie on their device. The activities that the user conducts on the
website, like viewing different pages, adding items to the cart, purchasing an item, etc., are tracked under this
session ID. If the user closes the site and comes back later, a new session with a new ID starts.

This session tracking aids in understanding the user behavior during each visit, providing a personalized user
experience, and so forth. 

### Session Object Documentation

The Session object captures details about a user session, including metadata, profile information, device details, application data, and more. Below is a description of its structure and data fields with examples presented in a tabular format.

#### Structure and Fields

| **Field**      | **Type**      | **Description**                                                                                           | **Example**                                          |
|----------------|---------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| id             | String        | Unique identifier for the session.                                                                         | `"3dbd1ac1-6a28-463a-a3c6-05593760831a"`             |

#### Metadata

| **Field**             | **Type**      | **Description**                                      | **Example**                                          |
|-----------------------|---------------|------------------------------------------------------|------------------------------------------------------|
| metadata              | Object        | Metadata about the session.                          |                                                      |
| ├── time              | Object        | Timestamps and time-related details.                 |                                                      |
| │   ├── insert        | Date        | Timestamp when the session was inserted (at origin). | `"2024-05-30T07:44:23.243135Z"`                      |
| │   ├── create        | Date (nullable) | Timestamp when the session was created.              | `null`                                               |
| │   ├── update        | Date (nullable) | Timestamp when the session was last updated.         | `null`                                               |
| │   ├── timestamp     | Float         | Unix timestamp of the session.                       | `1717055063.243177`                                  |
| │   ├── duration      | Integer       | Duration of the session in seconds.                  | `0`                                                  |
| │   ├── weekday       | Integer       | Weekday of the session (0 = Sunday, 6 = Saturday).   | `3`                                                  |
| ├── channel           | String        | Channel through which the session was initiated.     | `""`                                                 |
| ├── aux               | Object        | Additional metadata.                                 | `{}`                                                 |
| ├── status            | String        | Status of the session.                               | `"active"`                                           |

#### Operation (internal use only)

| **Field**      | **Type**      | **Description**                                                                                           | **Example**                                          |
|----------------|---------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| operation      | Object        | Operation-related details.                                                                                |                                                      |
| ├── new        | Boolean       | Indicates if the session is new.                                                                          | `false`                                              |
| ├── update     | Boolean       | Indicates if the session was updated.                                                                     | `false`                                              |
| ├── segment    | Boolean       | Indicates if the session is segmented.                                                                    | `false`                                              |
| ├── merge      | Array         | List of merged sessions.                                                                                  | `[]`                                                 |

#### Profile

| **Field**      | **Type**      | **Description**                                                                                           | **Example**                                          |
|----------------|---------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| profile        | Object        | Profile details associated with the session.                                                              |                                                      |
| ├── id         | String        | Profile ID.                                                                                               | `"4e63bb5b-8ec4-498f-ba63-8af1aedeb691"`             |
| ├── primary_id | String (nullable) | Primary profile ID, if any.                                                                               | `null`                                               |
| ├── metadata   | Object (nullable) | Profile metadata.                                                                                         | `null`                                               |

#### Device

| **Field**      | **Type**      | **Description**                                                                                           | **Example**                                          |
|----------------|---------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| device         | Object        | Details about the device used in the session.                                                             |                                                      |
| ├── name       | String        | Device name.                                                                                              | `"Other"`                                            |
| ├── brand      | String (nullable) | Device brand.                                                                                             | `null`                                               |
| ├── model      | String (nullable) | Device model.                                                                                             | `null`                                               |
| ├── type       | String (nullable) | Device type.                                                                                              | `null`                                               |
| ├── touch      | Boolean       | Indicates if the device is touch-enabled.                                                                  | `false`                                              |
| ├── ip         | String (nullable) | Device IP address.                                                                                        | `null`                                               |
| ├── resolution | String (nullable) | Device screen resolution.                                                                                 | `null`                                               |
| ├── geo        | Object        | Geographic information of the device.                                                                     |                                                      |
| │   ├── country | Object        | Country information.                                                                                      |                                                      |
| │   │   ├── name  | String (nullable) | Country name.                                                                                             | `null`                                               |
| │   │   ├── code  | String (nullable) | Country code.                                                                                             | `null`                                               |
| │   ├── city     | String (nullable) | City.                                                                                                    | `null`                                               |
| │   ├── county   | String (nullable) | County.                                                                                                  | `null`                                               |
| │   ├── postal   | String (nullable) | Postal code.                                                                                             | `null`                                               |
| │   ├── latitude | String (nullable) | Latitude.                                                                                                | `null`                                               |
| │   ├── longitude| String (nullable) | Longitude.                                                                                               | `null`                                               |
| │   ├── location | String (nullable) | Specific location information.                                                                           | `null`                                               |
| ├── color_depth | String (nullable) | Color depth of the device screen.                                                                         | `null`                                               |
| ├── orientation | String (nullable) | Screen orientation of the device.                                                                         | `null`                                               |

#### Operating System

| **Field**      | **Type**      | **Description**                                                                                           | **Example**                                          |
|----------------|---------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| os             | Object        | Operating system details.                                                                                 |                                                      |
| ├── name       | String        | Name of the operating system.                                                                             | `"Other"`                                            |
| ├── version    | String        | Version of the operating system.                                                                          | `""`                                                 |

#### Application

| **Field**      | **Type**      | **Description**                                                                                           | **Example**                                          |
|----------------|---------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| app            | Object        | Application details.                                                                                      |                                                      |
| ├── type       | String        | Type of application.                                                                                      | `"browser"`                                          |
| ├── name       | String        | Name of the application.                                                                                  | `"insomnia"`                                         |
| ├── version    | String        | Version of the application.                                                                               | `"8.6.0"`                                            |
| ├── language   | String (nullable) | Language used in the application.                                                                         | `null`                                               |
| ├── bot        | Boolean       | Indicates if the application is a bot.                                                                     | `false`                                              |
| ├── resolution | String (nullable) | Application screen resolution.                                                                            | `null`                                               |

#### UTM Parameters

| **Field**      | **Type**      | **Description**                                                                                           | **Example**                                          |
|----------------|---------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| utm            | Object        | UTM parameters for tracking marketing campaigns.                                                         |                                                      |
| ├── source     | String (nullable) | UTM source.                                                                                               | `null`                                               |
| ├── medium     | String (nullable) | UTM medium.                                                                                               | `null`                                               |
| ├── campaign   | String (nullable) | UTM campaign.                                                                                             | `null`                                               |
| ├── term       | String (nullable) | UTM term.                                                                                                 | `null`                                               |
| ├── content    | String (nullable) | UTM content.                                                                                              | `null`                                               |

#### Context

| **Field**      | **Type**      | **Description**                                                                                           | **Example**                                          |
|----------------|---------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| context        | Object        | Contextual information for the session.                                                                   |                                                      |
| ├── ip         | String        | IP address of the session.                                                                                | `"127.0.0.1"`                                        |

#### Properties

| **Field**      | **Type**      | **Description**                                                                                           | **Example**                                          |
|----------------|---------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| properties     | Object        | Custom properties associated with the session.                                                            | `{}`                                                 |

#### Traits

| **Field**      | **Type**      | **Description**                                                                                           | **Example**                                          |
|----------------|---------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| traits         | Object        | Custom traits associated with the session.                                                                | `{}`                                                 |

#### Auxiliary Data

| **Field**      | **Type**      | **Description**                                                                                           | **Example**                                          |
|----------------|---------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| aux            | Object        | Additional auxiliary data related to the session.                                                         | `{}`                                                 |

