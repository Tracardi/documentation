# Profile

A profile refers to a detailed record or representation of a person. The profile contains information about personal
characteristics, interests, and activities. The information is obtained and updated based on incoming events and data
imported from external systems.

For instance, Tracardi may collect data from a customer's interaction with a website or other service. These
interactions are captured as events, which are assigned to a corresponding profile. This allows Tracardi to maintain a
detailed picture of the customer throughout their interaction with the service.

Profile information includes both public and private data. The public data may include actions taken by the user on a
website, while the private data may include personal information.

In order to aggregate the collected data in the profile, Tracardi uses a graphical editor. An administrator using
Tracardi can use this editor to define the method by which data from events is attached to the profile. This ensures
that the right data is in the right place and that the profile remains up-to-date and accurate.

## Profile Object Documentation

The Profile object stores detailed information about a user's profile, including metadata, identifiers, contact details, preferences, and more. Below is a description of its structure and data fields with examples presented in a tabular format.

#### Structure and Fields

| **Field**      | **Type**      | **Description**                                                                                           | **Example**                                          |
|----------------|---------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| id             | String        | Unique identifier for the profile.                                                                         | `"4e63bb5b-8ec4-498f-ba63-8af1aedeb691"`             |
| primary_id     | String (nullable) | Primary identifier for the profile, if any.                                                                | `null`                                               |

#### Metadata

| **Field**            | **Type**      | **Description**                                    | **Example**                                          |
|----------------------|---------------|----------------------------------------------------|------------------------------------------------------|
| metadata             | Object        | Metadata about the profile.                        |                                                      |
| ├── time             | Object        | Timestamps and visit details.                      |                                                      |
| │   ├── insert       | Date        | Timestamp when the profile was inserted (origin).  | `"2024-05-30T07:44:23.246262+00:00"`                 |
| │   ├── create       | Date        | Timestamp when the profile was created.            | `"2024-05-30T07:44:23.246262+00:00"`                 |
| │   ├── update       | Date        | Timestamp when the profile was last updated.       | `"2024-05-30T07:44:28.291207+00:00"`                 |
| │   ├── segmentation | Date (nullable) | Custom segmentation data.                          | `null`                                               |
| │   ├── visit        | Object        | Visit details.                                     |                                                      |
| │   │   ├── last     | String (nullable) | Last visit timestamp.                              | `null`                                               |
| │   │   ├── current  | String        | Current visit timestamp.                           | `"2024-05-30T07:44:23.255056+00:00"`                 |
| │   │   ├── count    | Integer       | Number of visits.                                  | `1`                                                  |
| │   │   ├── tz       | String (nullable) | Time zone.                                         | `null`                                               |
| ├── aux              | Object        | Additional metadata.                               | `{}`                                                 |
| ├── status           | String (nullable) | Profile status.                                    | `null`                                               |
| ├── fields           | Object        | Timestamps of field's updates.                     |                                                      |
| │   ├── field-name1  | Array         | Array with change timestamp and a secondary value. | `[1717055063.2550735, null]`                         |
| │   ├── field-name2  | Array         | Array with change timestamp and a secondary value. | `[1717055063.255081, null]`                          |
| ├── system           | Object        | System-related metadata.                           |                                                      |
| │   ├── integrations | Object        | Integration details.                               | `{}`                                                 |
| │   ├── aux          | Object        | Additional system metadata.                        | `{}`                                                 |

#### Identifiers

| **Field**      | **Type**      | **Description**                                             | **Example**                                          |
|----------------|---------------|-------------------------------------------------------------|------------------------------------------------------|
| ids            | Array         | List of identifiers for the profile from different devices. | `["4e63bb5b-8ec4-498f-ba63-8af1aedeb691"]`           |

#### Statistics

| **Field**      | **Type**      | **Description**                                                                                           | **Example**                                          |
|----------------|---------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| stats          | Object        | Statistical data related to the profile.                                                                  |                                                      |
| ├── visits     | Integer       | Number of visits.                                                                                        | `0`                                                  |
| ├── views      | Integer       | Number of views.                                                                                         | `0`                                                  |
| ├── counters   | Object        | Custom counters.                                                                                         | `{}`                                                 |

#### Traits

| **Field**      | **Type**      | **Description**                                                                                           | **Example**                                          |
|----------------|---------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| traits         | Object        | Custom traits associated with the profile.                                                                | `{}`                                                 |

#### Segments

| **Field**      | **Type**      | **Description**                              | **Example**                                          |
|----------------|---------------|----------------------------------------------|------------------------------------------------------|
| segments       | Array         | List of segment tags the profile belongs to. | `[]`                                                 |

#### Interests

| **Field**      | **Type**      | **Description**                                                                                           | **Example**                                          |
|----------------|---------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| interests      | Object        | Interests associated with the profile.                                                                    | `{}`                                                 |

#### Consents

| **Field**      | **Type**      | **Description**                                                                                           | **Example**                                          |
|----------------|---------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| consents       | Object        | Consents given by the profile.                                                                            | `{}`                                                 |

#### Active Status

| **Field**      | **Type**      | **Description**                                                                                           | **Example**                                          |
|----------------|---------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| active         | Boolean       | Indicates if the profile is active.                                                                        | `true`                                               |

#### Auxiliary Data

| **Field**      | **Type**      | **Description**                                                                                           | **Example**                                          |
|----------------|---------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| aux            | Object        | Auxiliary data associated with the profile.                                                               | `{"geo": {}}`                                        |

#### Data

| **Field**      | **Type**      | **Description**                                                                                           | **Example**                                          |
|----------------|---------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| data           | Object        | Main data about the profile.                                                                              |                                                      |
| ├── anonymous  | Boolean       | Indicates if the profile is anonymous.                                                                    | `true`                                               |
| ├── pii        | Object        | Personally identifiable information (PII).                                                                |                                                      |
| │   ├── firstname   | String (nullable) | First name.                                                                                             | `null`                                               |
| │   ├── lastname    | String (nullable) | Last name.                                                                                              | `null`                                               |
| │   ├── display_name| String (nullable) | Display name.                                                                                           | `null`                                               |
| │   ├── birthday    | String (nullable) | Birthday.                                                                                               | `null`                                               |
| │   ├── language    | Object        | Language preferences.                                                                                   |                                                      |
| │   │   ├── native  | String (nullable) | Native language.                                                                                        | `null`                                               |
| │   │   ├── spoken  | String (nullable) | Spoken languages.                                                                                       | `null`                                               |
| │   ├── gender      | String (nullable) | Gender.                                                                                                 | `null`                                               |
| │   ├── education   | Object        | Education details.                                                                                      |                                                      |
| │   │   ├── level   | String (nullable) | Education level.                                                                                        | `null`                                               |
| │   ├── civil       | Object        | Civil status.                                                                                           |                                                      |
| │   │   ├── status  | String (nullable) | Civil status (e.g., single, married).                                                                   | `null`                                               |
| │   ├── attributes  | Object        | Physical attributes.                                                                                    |                                                      |
| │   │   ├── height  | String (nullable) | Height.                                                                                                 | `null`                                               |
| │   │   ├── weight  | String (nullable) | Weight.                                                                                                 | `null`                                               |
| │   │   ├── shoe_number | String (nullable) | Shoe number.                                                                                            | `null`                                               |

#### Contact Information

| **Field**      | **Type**      | **Description**                                                                                           | **Example**                                          |
|----------------|---------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| contact        | Object        | Contact details of the profile.                                                                           |                                                      |
| ├── email      | Object        | Email addresses.                                                                                          |                                                      |
| │   ├── main   | String (nullable) | Main email address.                                                                                       | `null`                                               |
| │   ├── private| String (nullable) | Private email address.                                                                                    | `null`                                               |
| │   ├── business| String (nullable) | Business email address.                                                                                   | `null`                                               |
| ├── phone      | Object        | Phone numbers.                                                                                           |                                                      |
| │   ├── main   | String (nullable) | Main phone number.                                                                                        | `null`                                               |
| │   ├── business| String (nullable) | Business phone number.                                                                                    | `null`                                               |
| │   ├── mobile | String (nullable) | Mobile phone number.                                                                                       | `null`                                               |
| │   ├── whatsapp| String (nullable) | WhatsApp number.                                                                                          | `null`                                               |
| ├── app        | Object        | Messaging app contact details.                                                                           |                                                      |


| │   ├── whatsapp | String (nullable) | WhatsApp contact.                                                                                        | `null`                                               |
| │   ├── discord  | String (nullable) | Discord contact.                                                                                         | `null`                                               |
| │   ├── slack    | String (nullable) | Slack contact.                                                                                           | `null`                                               |
| │   ├── twitter  | String (nullable) | Twitter contact.                                                                                         | `null`                                               |
| │   ├── telegram | String (nullable) | Telegram contact.                                                                                        | `null`                                               |
| │   ├── wechat   | String (nullable) | WeChat contact.                                                                                          | `null`                                               |
| │   ├── viber    | String (nullable) | Viber contact.                                                                                           | `null`                                               |
| │   ├── signal   | String (nullable) | Signal contact.                                                                                          | `null`                                               |
| │   ├── other    | Object        | Other messaging app contacts.                                                                             | `{}`                                                 |
| ├── address     | Object        | Address details.                                                                                        |                                                      |
| │   ├── town     | String (nullable) | Town.                                                                                                    | `null`                                               |
| │   ├── county   | String (nullable) | County.                                                                                                  | `null`                                               |
| │   ├── country  | String (nullable) | Country.                                                                                                 | `null`                                               |
| │   ├── postcode | String (nullable) | Postcode.                                                                                                | `null`                                               |
| │   ├── street   | String (nullable) | Street.                                                                                                  | `null`                                               |
| │   ├── other    | String (nullable) | Other address details.                                                                                   | `null`                                               |
| ├── confirmations | Array         | List of confirmation details.                                                                             | `[]`                                                 |

#### Identifiers

| **Field**      | **Type**      | **Description**                                                                                           | **Example**                                          |
|----------------|---------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| identifier     | Object        | Various identifiers related to the profile.                                                               |                                                      |
| ├── id         | String (nullable) | General identifier.                                                                                        | `null`                                               |
| ├── pk         | String (nullable) | Primary key.                                                                                               | `null`                                               |
| ├── badge      | String (nullable) | Badge number.                                                                                              | `null`                                               |
| ├── passport   | String (nullable) | Passport number.                                                                                           | `null`                                               |
| ├── credit_card| String (nullable) | Credit card number.                                                                                        | `null`                                               |
| ├── token      | String (nullable) | Token identifier.                                                                                          | `null`                                               |
| ├── coupons    | String (nullable) | Coupons related to the profile.                                                                            | `null`                                               |

#### Devices

| **Field**      | **Type**          | **Description**                                                                                           | **Example**                                          |
|----------------|-------------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| devices        | Object            | Information about the devices associated with the profile.                                                |                                                      |
| ├── push       | Array             | List of push notification devices.                                                                         | `[]`                                                 |
| ├── other      | Array             | Other devices.                                                                                            | `[]`                                                 |
| ├── last       | Object            | Information about the last used device.                                                                   |                                                      |
| │   ├── geo    | Object            | Geographic information related to the last used device.                                                   |                                                      |
| │   │   ├── country | Object            | Country information.                                                                                      |                                                      |
| │   │   │   ├── name  | String (nullable) | Country name.                                                                                             | `null`                                               |
| │   │   │   ├── code  | String (nullable) | Country code.                                                                                             | `null`                                               |
| │   │   ├── city     | String (nullable) | City.                                                                                                    | `null`                                               |
| │   │   ├── county   | String (nullable) | County.                                                                                                  | `null`                                               |
| │   │   ├── postal   | String (nullable) | Postal code.                                                                                             | `null`                                               |
| │   │   ├── latitude | Number (nullable) | Latitude.                                                                                                | `null`                                               |
| │   │   ├── longitude| Number (nullable) | Longitude.                                                                                               | `null`                                               |
| │   │   ├── location | String (nullable) | Specific location information.                                                                           | `null`                                               |

#### Media

| **Field**      | **Type**      | **Description**                                                                                           | **Example**                                          |
|----------------|---------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| media          | Object        | Media-related information about the profile.                                                              |                                                      |
| ├── image      | String (nullable) | Profile image URL.                                                                                        | `null`                                               |
| ├── webpage    | String (nullable) | Webpage URL.                                                                                              | `null`                                               |
| ├── social     | Object        | Social media handles.                                                                                     |                                                      |
| │   ├── twitter | String (nullable) | Twitter handle.                                                                                           | `null`                                               |
| │   ├── facebook| String (nullable) | Facebook handle.                                                                                          | `null`                                               |
| │   ├── youtube | String (nullable) | YouTube handle.                                                                                           | `null`                                               |
| │   ├── instagram| String (nullable) | Instagram handle.                                                                                         | `null`                                               |
| │   ├── tiktok  | String (nullable) | TikTok handle.                                                                                            | `null`                                               |
| │   ├── linkedin| String (nullable) | LinkedIn handle.                                                                                          | `null`                                               |
| │   ├── reddit  | String (nullable) | Reddit handle.                                                                                            | `null`                                               |
| │   ├── other   | Object        | Other social media handles.                                                                               | `{}`                                                 |

#### Preferences

| **Field**      | **Type**      | **Description**                                                                                           | **Example**                                          |
|----------------|---------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| preferences    | Object        | User preferences.                                                                                        |                                                      |
| ├── purchases  | Array         | List of preferred purchases.                                                                              | `[]`                                                 |
| ├── colors     | Array         | List of preferred colors.                                                                                 | `[]`                                                 |
| ├── sizes      | Array         | List of preferred sizes.                                                                                  | `[]`                                                 |
| ├── devices    | Array         | List of preferred devices.                                                                                | `[]`                                                 |
| ├── channels   | Array         | List of preferred communication channels.                                                                 | `[]`                                                 |
| ├── payments   | Array         | List of preferred payment methods.                                                                        | `[]`                                                 |
| ├── brands     | Array         | List of preferred brands.                                                                                 | `[]`                                                 |
| ├── fragrances | Array         | List of preferred fragrances.                                                                             | `[]`                                                 |
| ├── services   | Array         | List of preferred services.                                                                               | `[]`                                                 |
| ├── other      | Array         | List of other preferences.                                                                                | `[]`                                                 |

#### Job Information

| **Field**      | **Type**      | **Description**                                                                                           | **Example**                                          |
|----------------|---------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| job            | Object        | Job-related information.                                                                                  |                                                      |
| ├── position   | String (nullable) | Job position.                                                                                              | `null`                                               |
| ├── salary     | String (nullable) | Salary.                                                                                                   | `null`                                               |
| ├── type       | String (nullable) | Job type.                                                                                                 | `null`                                               |
| ├── company    | Object        | Company details.                                                                                          |                                                      |
| │   ├── name   | String (nullable) | Company name.                                                                                             | `null`                                               |
| │   ├── size   | String (nullable) | Company size.                                                                                             | `null`                                               |
| │   ├── segment| String (nullable) | Company segment.                                                                                          | `null`                                               |
| │   ├── country| String (nullable) | Company country.                                                                                          | `null`                                               |
| ├── department | String (nullable) | Department.                                                                                               | `null`                                               |

#### Loyalty

| **Field**      | **Type**          | **Description**                                                                                           | **Example**                                          |
|----------------|-------------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| loyalty        | Object            | Loyalty-related information.                                                                              |                                                      |
| ├── codes      | Array             | List of loyalty codes.                                                                                    | `[]`                                                 |
| ├── card       | Object            | Loyalty card details.                                                                                     |                                                      |
| │   ├── id     | String (nullable) | Loyalty card ID.                                                                                           | `null`                                               |
| │   ├── name   | String (nullable) | Loyalty card name.                                                                                         | `null`                                               |
| │   ├── issuer | String (nullable) | Loyalty card issuer.                                                                                       | `null`                                               |
| │   ├── expires| Date (nullable)   | Loyalty card expiration date.                                                                              | `null`                                               |
| │   ├── points | Integer           | Loyalty points.                                                                                           | `0`                                                  |

