# Understanding Data Partitioning in Tracardi

Data partitioning is a database management technique where large datasets are divided into segments, or partitions,
which can be managed and accessed independently. This strategy is especially useful in Tracardi for handling large-scale
data, improving performance, and simplifying management tasks.
Benefits of Data Partitioning in Tracardi

## Tracardi partitions its data into time-based indices, such as monthly or quarterly partitions, which enhances system efficiency in multiple ways:

* **Improved Performance**: Smaller indices are faster to read from and write to, optimizing system performance.
* **Easier Data Management**: Time-based partitions simplify archiving, where older data can be moved to slower, more
  cost-effective storage.
* **Efficient Deletion**: Deleting old data becomes easier when it is contained within specific time-based partitions.

## Tracardi applies this partitioning to several key data types:

* **Events**: Capturing user actions and interactions.
* **Profiles**: Storing user information, such as demographics and preferences.
* **Sessions**: Documenting individual user sessions on a platform.
* **Logs**: System logs for monitoring and debugging purposes.

## How Tracardi Uses Aliases for Partitioned Data

To unify these partitions for seamless access, Tracardi employs Elasticsearch aliases. An alias allows the GUI to access
data from all relevant indices as if it were stored in a single, consolidated index. For example, session data across
multiple quarters can be accessed through an alias such as prod-09x.8504a.tracardi-session, enabling Tracardi’s GUI to
display data across partitions without manual index selection.
Alias Naming Convention in Tracardi

Tracardi follows a specific naming convention for its aliases:

```commandline
<environment>.<db_version>.<tenant.tracardi>-<type-of-data>
```

* **Environment**: Typically prod for production.
* **db_version**: The database version, found in the GUI by clicking on the Tracardi logo (distinct from the system
  version).
* **Tenant**: The tenant identifier, also visible in the GUI.
* **Type of Data**: Specifies data type, such as session, event, etc.

For instance, an alias for all production session data could be:

```commandline
prod-09x.8504a.tracardi-session
```

# Troubleshooting: Data Not Visible in GUI After a Quarter

If data becomes inaccessible in the GUI at the beginning of a new month or quarter, it might indicate an issue with the
automatic alias update. Although uncommon, this problem can arise if updates are incomplete or not configured correctly.
Follow these steps to resolve the issue:

### Manually Adding a New Index to an Alias

Verify the Current Alias Configuration
Use the following curl command to list all aliases and their associated indices, checking if the new index is included:

```commandline
curl -X GET "http://localhost:9200/_cat/aliases?v"
```

If the new quarterly or monthly index (e.g., prod-09x.8504a.tracardi-session-2024-q4) is missing from the alias, proceed
to the next step.

### Add the New Index to the Alias

Manually add the missing index to the alias using the curl command below. Adjust db_version and tenant values based on
your setup:

```commandline
curl -X POST "http://localhost:9200/_aliases" -H "Content-Type: application/json" -d' {
      "actions": [
        {
          "add": {
            "index": "prod-09x.8504a.tracardi-session-2024-q4",
            "alias": "prod-09x.8504a.tracardi-session"
          }
        }
      ]
    }
    '
```

### Confirm the Alias Update

Verify the alias update with the following command to ensure the new index has been added:

```commandline
curl -X GET "http://localhost:9200/_cat/aliases?v"
```

#### Example output

| Alias                                    | Index                                             | Filter | Routing.Index | Routing.Search | Is_Write_Index |
|------------------------------------------|---------------------------------------------------|--------|---------------|----------------|----------------|
| 09x.8504a.tracardi-entity                | 09x.8504a.tracardi-entity-2024-q4                 | -      | -             | -              | -              |
| 09x.8504a.tracardi-session               | 09x.8504a.tracardi-session-2024-q4                | -      | -             | -              | -              |
| prod-09x.8504a.tracardi-event            | prod-09x.8504a.tracardi-event-2024-q4             | -      | -             | -              | -              |
| 09x.8504a.tracardi-profile               | 09x.8504a.tracardi-profile-2024-q4                | -      | -             | -              | -              |
| prod-09x.8504a.tracardi-session          | prod-09x.8504a.tracardi-session-2024-q4           | -      | -             | -              | -              |
| 09x.8504a.tracardi-log                   | 09x.8504a.tracardi-log-2024-11                    | -      | -             | -              | -              |
| 09x.8504a.tracardi-field-update-log      | 09x.8504a.tracardi-field-update-log-2024-11       | -      | -             | -              | -              |
| prod-09x.8504a.tracardi-entity           | prod-09x.8504a.tracardi-entity-2024-q4            | -      | -             | -              | -              |
| prod-09x.8504a.tracardi-field-update-log | prod-09x.8504a.tracardi-field-update-log-2024-11  | -      | -             | -              | -              |
| prod-09x.8504a.tracardi-profile          | prod-09x.8504a.tracardi-profile-2024-q4           | -      | -             | -              | -              |
| prod-09x.8504a.tracardi-log              | prod-09x.8504a.tracardi-log-2024-11               | -      | -             | -              | -              |
| 09x.8504a.tracardi-event                 | 09x.8504a.tracardi-event-2024-q4                  | -      | -             | -              | -              |

After verifying, refresh the Tracardi GUI to ensure the new data is visible.

### Routine Maintenance Tips

* Check Aliases Regularly: After updates or the beginning of new time partitions, it’s beneficial to verify alias
  configurations to ensure the GUI displays all relevant data partitions.
* Automate Alias Verification: For organizations managing multiple tenants or high data volume, consider automating
  alias checks to minimize potential downtime in data access.

This troubleshooting process should restore data visibility in the GUI by ensuring that all necessary indices are
correctly included in their respective aliases.