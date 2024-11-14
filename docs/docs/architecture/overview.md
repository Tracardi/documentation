## Tracardi Components Overview

### Databases

- **Elasticsearch**: Stores high-volume data like events and profiles, enabling fast retrieval and indexed search.
- **MySQL**: Manages metadata, configuration settings, and system information.

### APIs

- **Public API (Collector)**: Ingests incoming data (e.g., events, user interactions).
- **Private API (Management)**: Allows administrators to manage configurations, tenant settings, and other system
  functions.
- **Tenant Management API**: Focused on tenant-specific configurations.

### GUI

- **Console Interface**: Provides administrative access to Tracardi for configuration tasks, communicating with the
  Private API.

### Background Workers in Tracardi

* System Worker (Functions Worker):
    * **Purpose**: The System Worker acts as a universal handler for background tasks, covering all system operations
      when no dedicated worker is configured.
    * **Functionality**:
        * Manages general-purpose jobs such as data storage operations, sending data to external destinations, and
          handling default system tasks.
        * Executes system maintenance functions, performs routine checks, and manages non-specialized tasks within the
          system.
        * Ensures continuity of essential system operations, enabling the system to function without interruptions in
          scenarios where specific workers are not assigned.

* Workflow Worker:
    * **Purpose**: Executes workflows defined within Tracardi’s workflow automation interface, a core part of Tracardi’s
      no-code automation capabilities.
    * **Functionality**:
      * Processes events and actions defined in user workflows, managing triggers, conditional logic, data
      manipulations, and API calls as configured in Tracardi's GUI.
      * Manages all logic processing associated with workflows, such as branching and executing plugins, transforming
      data, and triggering external services based on workflow conditions.
      * Supports asynchronous workflow executions, facilitating smooth data processing and automation across various
      customer data interactions.

* Collector Worker:
    * **Purpose**: Dedicated to acquiring and managing data from external sources, validating its origin, and publishing
      it to the internal processing pipeline.
    * **Functionality**:
        * Collects payloads from external API calls, verifies incoming data by checking the source_id, and ensures that
          only authenticated data sources contribute data to the system.
        * Publishes validated payloads to the designated message queue (or topic), making them accessible for processing
          and workflow automation.
        * Streamlines data ingestion, serving as an entry point for external data and ensuring data flow consistency and
          validation.

* APM (Automatic Profile Merging Worker):
    * **Purpose**: Manages profile unification by identifying and merging duplicate profiles based on defined criteria.
    * **Functionality**:
        * Periodically scans profiles for duplicate records, utilizing identification points to compare profiles from
          different data sources or sessions.
        * Automatically merges profiles, aggregating traits, history, and identifiers into a single, comprehensive
          profile.
        * Configurable to work asynchronously, the APM Worker applies merging strategies, adapting based on profile
          configuration and source-channel mappings, ensuring consistency and data quality.

* Upgrade Worker:
    * **Purpose**: Facilitates data migration and restructuring necessary during Tracardi version updates, ensuring
      compatibility with new or modified system configurations.
    * **Functionality**:
        * Executes data transformations required when upgrading to a newer Tracardi version, adapting records to align
          with updated schemas, fields, or database structures.
        * Handles cross-version compatibility adjustments, migrating both profile and event data, ensuring continuity in
          configurations and stored data across updates.
        * Operates during version upgrades to minimize manual intervention, leveraging automated migration scripts and system commands designed for smooth transitions between software versions.

### Queues

- **Apache Pulsar**: Handles message queuing and distributes jobs across workers, with topics for various tasks such as
  system functions, workflows, and collectors.

### Caches

- **Redis**: Caches frequently accessed data, manages global configuration, and queues lightweight tasks.


## Open-Source vs Commercial

The commercial version of Tracardi requires more services than the open-source one. Unlike the open-source version, the
commercial version relies on Apache Pulsar and includes additional features such as multitenancy controllers, new data
collection bridges, and enhanced profile management workers. In contrast, the open-source version does not depend on
Apache Pulsar and features an extended API, offering a different set of capabilities tailored to commercial use cases.