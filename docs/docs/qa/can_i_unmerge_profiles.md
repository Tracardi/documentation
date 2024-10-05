# Can I unmerge profiles?

No, it is not possible to undo merges in Tracardi. There are two main reasons for this:

1. It would make collecting and managing large amounts of data even more complex.

2. Even if unmerging was possible, it would be difficult to determine which merges were incorrect in an automated system
   without manual review.

To prevent incorrect merging, it's crucial to validate data (like email addresses) before sending it to Tracardi.
Tracardi offers two merging options:

1. Auto Profile Merging (APM): Merges profiles based on mapped data regardless of event type. This doesn't provide
   control over data validity.

2. Identification Points (commercial feature): Allows you to define specific conditions for merging profiles, giving you
   more control over when merges occur.

Tracardi itself isn't responsible for verifying data correctness. This validation should be done by the system
integrated with Tracardi. However, using Identification Points, you can configure Tracardi to only merge profiles based
on events with verified identification data.

# Why tracardi does not provide profile unmerging?

The inability to undo merges in Tracardi stems from several complex technical and practical challenges:

* **Data Integrity**: Once profiles are merged, the combined data becomes the new "truth" in the system. Unmerging would
  require keeping track of the exact state of each profile before the merge, which would significantly increase storage
  requirements and system complexity.
* **Cascading Effects**: Merges often trigger other actions or decisions within the system. Undoing a merge could
  potentially
  invalidate numerous subsequent actions, leading to data inconsistencies across the platform.
* **Time-based Issues**: In real-time systems like Tracardi, other processes may have already used the merged data.
  Retroactively changing this data could lead to inconsistencies in historical analytics or actions taken based on the
  merged profile.
* **Performance Impacts**: Maintaining the ability to undo merges would require additional processing power and storage
  for
  each merge operation, potentially slowing down the system significantly.
  Complexity of Partial Unmerging: In cases where only some data points were incorrectly merged, determining which
  specific pieces of information to "unmerge" while keeping correct data intact would be extremely complex and
  error-prone.
* **Audit Trail Complications**: Undoing merges would complicate the audit trail of profile changes, making it difficult
  to
  maintain a clear history of how profile data evolved over time.
  Scalability Issues: As the system grows and handles more profiles and merges, the complexity of managing potential
  unmerges would increase exponentially, potentially impacting the overall scalability of the platform.

These challenges make implementing an "undo merge" feature impractical in most cases. Instead, the focus is on
preventing incorrect merges through proper data validation and careful configuration of merging rules.

# How to Use Tracardi Identification Points (TIP)

## Step 1: Define a Custom Event for Identification

1. Think of the data structure for the new event that will be used for identification. For example:
    - `email` (string)

## Step 2: Configure Your System to Send Verified Data

1. In your external system (e.g., your website or app):
    - Implement a verification process for user data.
    - Only trigger the `verified-user-identification` event when data is confirmed accurate.
2. Ensure your system sends this event to Tracardi only with verified data.

## Step 3: Define Tracardi Identification Points (TIP)

1. Go to the Identification Points section in Tracardi.
2. Create a new Identification Point:
    - Name: "Verified User Merge"
    - Source: Select the source from which the verified event will come.
    - Event Type: "Verified User Identification" (the custom event you created)

3. Define data matching rules:
    - Field: `email`
        - Match Type: Exact match
        - Profile Field: `profile@data.email.main`

By following these steps, you ensure that profile merging only occurs when you receive verified, high-quality
identification data through a specific, controlled event. This approach significantly reduces the risk of incorrect
merges while maintaining data integrity.