# What types of data are stored in Tracardi's Elasticsearch?

Tracardi stores various types of data in Elasticsearch, including entities, events, field update logs, general logs,
profiles, and sessions. Each data type has its own index for efficient organization and retrieval.

# How are indices named in Tracardi?

Tracardi indices typically follow a naming pattern, which includes:

* Prefix (e.g., 09x.8504a for test (sand-box) or prod-09x.8504a for production).
* Data Type (e.g., tracardi-entity, tracardi-event, tracardi-log, tracardi-profile, tracardi-session).
* Time Period (e.g., [year-month] for monthly partitions or [year-quarter] for quarterly partitions).

## Example

| Index                                            |
|--------------------------------------------------|
| 09x.8504a.tracardi-entity-2024-q4                |
| 09x.8504a.tracardi-session-2024-q4               |
| prod-09x.8504a.tracardi-event-2024-q4            |
| 09x.8504a.tracardi-profile-2024-q4               |
| prod-09x.8504a.tracardi-session-2024-q4          |
| 09x.8504a.tracardi-log-2024-11                   |
| 09x.8504a.tracardi-field-update-log-2024-11      |
| prod-09x.8504a.tracardi-entity-2024-q4           |
| prod-09x.8504a.tracardi-field-update-log-2024-11 |
| prod-09x.8504a.tracardi-profile-2024-q4          |
| prod-09x.8504a.tracardi-log-2024-11              |
| 09x.8504a.tracardi-event-2024-q4                 |

# What 09x means in index name?

09x is version of database schema. If schema in elasticsearch changes this will also change for example to 11x.

# What is 8504a in index name?

8504a or any other string is a tenant ID. Tracardi separates all big data for each tenant.

# What is the purpose of the prod prefix in index names?

The prod prefix identifies indices used specifically for production environments. For example,
prod-09x.8504a.tracardi-entity-2024-q1 would indicate an entity index in production for the first quarter of 2024.

# How is data partitioned in Tracardi's Elasticsearch setup?

Data in Tracardi can be partitioned by month or quarter. For example, events are often stored with monthly indices (
e.g., tracardi-event-2024-10 for October 2024), while profiles and sessions are typically quarterly (e.g.,
tracardi-profile-2024-q2 for the second quarter of 2024).

# How tracardi groups data from multiple indices (partitioned indices)

Tracardi uses Elasticsearch aliases to group partitioned data. Aliases serve as pointers to one or more indices,
allowing users to query, update, or manage several indices under a single, unified name. This can simplify data
management, especially in setups where data is periodically segmented (e.g., monthly or quarterly). Instead of querying
individual indices by their specific names, users can query an alias that encompasses multiple indices, allowing access
to a consolidated dataset.

For example, if there are quarterly indices named `prod-09x.8504a.tracardi-event-2024-q1`,
`prod-09x.8504a.tracardi-event-2024-q2`, and so on, an alias named `prod-09x.8504a.tracardi-event` could be created to include all of
these. Querying `prod-09x.8504a.tracardi-event` would then return data from all monthly indices included in the alias.

# What is the difference between entity, event, and profile indices?

Each index serves a distinct purpose:

* Entity indices store custom entities created within Tracardi workflows or processes.
* Event indices hold records of user interactions, such as visits and actions taken on a website.
* Profile indices contain customer profiles, which include aggregated data about individual users across sessions and
  events.
* etc.

# Why are there different log indices in Tracardi?

Tracardi uses separate log indices for different types of log data:

* Field Update Logs record changes made to fields in profiles or entities.
* General Logs store system logs that track various actions and operations, which can help in monitoring and
  troubleshooting.

# Can Tracardi indices be manually configured?

Yes, Tracardi allows configuration of data partitioning of indices through environment variables. This setup can
control the frequency of index creation (monthly or quarterly) for different data types, enabling efficient data
management. [More on partitioning](../configuration/partitioning.md).

# Are indices created automatically over time

Yes tracardi will create indices over time automatically. To understand better how indices are created see []