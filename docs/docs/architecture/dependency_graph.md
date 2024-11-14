# Tracardi Dependency Graph Documentation

Tracardi's architecture is structured around several key components, each interlinked to handle data collection,
processing, and system configuration efficiently. This document details these dependencies and outlines data flow among
them, enabling administrators and developers to understand Tracardi’s operational setup and manage configurations
effectively.

## Dependency Table

| Component                  | Dependencies                                                                                               | Purpose                                                                                           |
|----------------------------|------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| **GUI**                    | Private API                                                                                                | Allows administrators to configure Tracardi. Communicates with the Private API for backend tasks. |
| **Private API**            | Redis, Pulsar, Elasticsearch, MySQL                                                                        | Manages configuration, queuing, caching, and data management.                                     |
| **Public API (Collector)** | Redis, Pulsar, Elasticsearch, MySQL                                                                        | Manages data ingestion and configuration, queues incoming data for processing.                    |
| **System Worker**          | Redis, Pulsar, Elasticsearch, MySQL                                                                        | Manages general background tasks by default.                                                      |
| **Workflow Worker**        | Redis, Pulsar, Elasticsearch, MySQL                                                                        | Handles workflow-specific tasks, triggered by workflow-specific topics.                           |
| **Collector Worker**       | Redis, Pulsar, Elasticsearch, MySQL                                                                        | Dedicated to data collection tasks when configured separately.                                    |
| **APM Worker**             | Redis, Pulsar, Elasticsearch, MySQL                                                                        | Periodically merges profiles to consolidate user data.                                            |
| **Upgrade Worker**         | Redis, Pulsar, Elasticsearch, MySQL                                                                        | Manages data migration and version upgrades.                                                      |
| **Apache Pulsar**          | Topics: tracardi-1.1.x/system/functions, tracardi-1.1.x/system/workflows, tracardi-1.1.x/system/collectors | Queues and routes messages across distributed workers.                                            |
| **Redis**                  | -                                                                                                          | Caches frequently used data, maintains configuration, and handles lightweight task queuing.       |
| **Elasticsearch**          | -                                                                                                          | Stores events and profiles for fast search and retrieval.                                         |
| **MySQL**                  | -                                                                                                          | Holds metadata, system information, and configuration settings.                                   |

---

## Data Flow Between Workers and Queues

### Configured with All Workers

1. **Public API (Collector)** queues data in `tracardi-1.1.x/system/collectors`.
2. **Collector Worker** retrieves data from this topic and forwards it to:
    - `tracardi-1.1.x/system/functions` (default for general jobs).
    - `tracardi-1.1.x/system/workflows` for workflow-specific tasks, consumed by the Workflow Worker.

### Configured with Only Workflow Worker

- **Public API** queues data directly in `tracardi-1.1.x/system/functions`, processed by the System Worker. Workflow
  data flows into `tracardi-1.1.x/system/workflows`.

### Configured with Only System Worker

- **Public API** queues all data in `tracardi-1.1.x/system/functions`, with the System Worker processing all tasks.

## Tenant Data Management and Routing

- **Data Routing**: The Public API sends data to Pulsar, routing it according to the system configuration (to
  `tracardi-1.1.x/system/functions` or specific workflow topics).
- **Tenant Identification**: Tenant data is processed within shared topics, with identifiers included in each payload
  for separation.
- **Automated Configuration**: Tracardi’s Helm chart automates setup, including topic creation, worker deployment, and
  routing.

This architecture allows Tracardi to balance loads, optimize resources, and manage multiple tenants in a shared
namespace setup efficiently.