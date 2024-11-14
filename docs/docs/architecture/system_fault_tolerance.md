# System Fault Tolerance

This section explains how Tracardi handles system failures and misconfigurations. It provides guidance on safe
maintenance actions and describes critical system components. Tracardi is designed to be resilient, allowing for certain
misconfigurations and data deletions while keeping the system functional.

## Data Deletion and System Resilience

Tracardi supports data deletion for specific cases, like data reinstallation or maintenance. Indices containing events,
logs, and entities can be safely removed when needed. For instance, if an index from a previous period (e.g., last month
or quarter) is deleted, only data from that period will be unavailable. Tracardi will keep working with remaining data.
This approach allows for an easy data retention policy without needing to restart the system.

## Key Components to Monitor

Ensure these core components are functional, as they are essential to Tracardi's operation (listed by importance):

- **Public API**: A failure in the Public API can halt Tracardi. Adding an external queue before the API can improve
  reliability.

- **Apache Pulsar**: Tracardi depends on Apache Pulsar for queueing. If other components fail but Pulsar stays active,
  data can still be held until the system recovers.

## Dependent Components

These components depend on the core components and should be monitored. However, minor issues may not immediately
disrupt Tracardi:

- **Redis**: Needed for profile caching. Without Redis, Tracardi cannot retrieve profiles, causing instability.

- **MySQL**: Failures in MySQL may go unnoticed initially because SQL queries are cached in each pod. A long-term
  failure can cause issues, especially after a pod restart when cached queries are cleared. Monitoring MySQL is
  recommended.

- **Elasticsearch**: A failure in Elasticsearch doesn’t cause data loss, as data is queued before reaching storage.

- **Workers**: Worker failures do not result in data loss because data is stored in the queue before processing.

- **Private API**: Used only for configuration, so a failure here does not stop Tracardi’s main functions.

- **TMS API**: All TMS API calls are cached within the Public API. As long as the Public API works, the TMS API will not
  be directly queried.

## Failure Prevention

To improve resilience, Tracardi’s components and dependencies can be scaled for redundancy. It’s recommended to maintain
at least three copies of each component to prevent single points of failure. More
on [system scaling](../configuration/scaling/installation_scaling.md)
