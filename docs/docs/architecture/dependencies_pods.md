# System Elements in K8s

This document describes the system elements and configurations within a Kubernetes (K8s) environment for Tracardi.

## System Elements

* **Dependencies** - Review the [dependency graph](dependency_graph.md) for details on system dependencies.
* **API Services** - API to configure Tracardi
* **Workers** - Internal system workers
* **GUI Interfaces** - System consoles for managing Tracardi

## APIs

!!! Note 

    Refer to [pod naming convention](../getting_started/codings/pod_naming_convention.md) for details on naming conventions for K8s pods.

!!! Note 

    For an understanding of each component's role and integration, see the [dependency graph](dependency_graph.md).

### API Components

* **Collector API**:
    - Purpose: Collects incoming data for processing and validation.
    - Deployment: This API uses a private endpoint and will appear in the K8s installation as the `be-fa-public` deployment.
    
* **GUI API (Private API)**:
    - Purpose: Handles internal system management functions, facilitating data operations and configurations within the system.
    - Deployment: Visible in K8s as the `be-fa-private` deployment.
    
* **TMS API**:
    - Purpose: Manages system configurations and settings, providing an API layer for Tracardi’s internal management functions.
    - Deployment: This API is represented as `be-tms-fa` in K8s.

## Workers

### Background Workers

* **System Worker**:
    - Purpose: Serves as the primary worker for system tasks and background processes, managing data storage, sending data to destinations, and handling any default system jobs. When no specific worker is configured for a task, the System Worker acts as the fallback.
    - Deployment: `wk-pl-background` in K8s.
  
* **Workflow Worker**:
    - Purpose: Processes Tracardi’s no-code automation workflows, executing tasks such as event processing, data manipulation, and conditional workflows.
    - Deployment: Visible as `wk-pl-workflow` in K8s.
  
* **Collector Worker**:
    - Purpose: Manages direct data ingestion, validating source data, and publishing it to the Tracardi queue for processing.
    - Deployment: Visible as `wk-pl-collector` in K8s.

## GUI

### GUI Interfaces

* **Tracardi GUI**:
    - Purpose: Provides a user interface for configuring and managing the Tracardi system, available for general operational functions.
    - Deployment: Appears as `fe-rj-gui` in K8s.

* **TMS GUI**:
    - Purpose: A specific console for managing TMS-related configurations and settings in Tracardi.
    - Deployment: Available in K8s as `fe-rj-tem-gui`.

