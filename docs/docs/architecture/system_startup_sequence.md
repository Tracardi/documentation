# System Startup Sequence

This documentation provides an overview of the system startup sequence, including dependency management and failure
handling.

## Overview

The system startup consists of initializing required components, verifying connections to dependencies, and preparing
the environment for operational readiness.

## 1. Startup Sequence

### Step 1: Initialization

The system instantiates all [required components](dependencies_pods.md), initiating is a two step process:

- Starting docker `tracardi/init`: Responsible for setting up the environment, including creating missing topics in Apache Pulsar,
  verifying namespaces, and preparing other essential configurations. Exits after set-up or if not set-up is needed.
- `tracardi/com-tracardi-api`: Launches the primary API functionality once the environment is prepared.

#### Initialization Log Example

```commandline
2024-11-12 15:21:12,148: INFO: Running Pulsar SetUp...
2024-11-12 15:21:12,245: INFO: Namespace tracardi-1.1.x/system TTL is set to 1209600
2024-11-12 15:21:12,278: INFO: Partitioned topic tracardi-1.1.x/system/functions EXISTS
...
2024-11-12 15:21:12,317: DEBUG: Pulsar tenants ['public', 'pulsar', ...]
2024-11-12 15:21:12,327: DEBUG: Pulsar namespaces ['tracardi-1.1.x/system']
```

This output indicates the creation or validation of topics and namespaces. If new topics or namespaces are required,
they are created. Old namespaces are retained to avoid interrupting message processing from prior versions.

### Step 2: Service Readiness Checks

1. **Dependency Connections**:
    - Verifies connectivity with all required dependencies, including Elasticsearch, Redis, MySQL, and Apache Pulsar.
    - If a dependency connection fails, the system retries up to 10 times before logging a failure message: "Application
      startup failed. Exiting."

#### Connection Error Example

```commandline
2024-11-14 12:16:56,899: WARNING: Could not connect to elasticsearch at ['http://localhost:9200']...
```

2. **Multi-Tenancy Check**:
    - If a TRACARDI license is present, it logs the multi-tenant status, enabling the system to support multiple tenant
      configurations.

### Step 3: License Display and Verification

1. Displays an ASCII banner indicating the application version.
2. Verifies the license type:
    - **Commercial License**: Shows license owner, expiration date, and enabled services.
    - **Default License**: Defaults to the MIT + Commons Clause license if no commercial license is detected.

### Step 4: Global Settings Broadcaster

The `GlobalSettingsBroadcaster` manages global settings across instances, initializing background listeners for
continuous synchronization.

### Step 5: Health Endpoint Readiness Signal

Sets the `health_endpoint.api_ready` status to `True`, marking the application as fully operational and ready to handle
API requests.

### Step 6: Preconfiguration Load

Preconfigured destinations, event sources, etc., are loaded.

#### Preconfiguration Load Example Log

```commandline
INFO: Preconfiguration file '/home/risto/PycharmProjects/.../destinations.json' loaded with 1 definitions
```

## 2. Post-Startup Behavior

Once the startup process is complete, the system can accept API calls. However, it may initially be in a "not installed"
state, meaning the database schema may not be fully configured, which can cause issues with API functionality.

### Example of "System Not Installed" Log Warning

```commandline
2024-11-14 12:35:47,896: WARNING: Incorrect Elastic Schema...
```

### Example of MySQL Connection Error

```json
{
  "detail": "(pymysql.err.OperationalError) (2013, 'Lost connection to MySQL server during query')"
}
```

## 3. GUI Installation Check

When accessing TRACARDI via the GUI, the `/install` endpoint verifies if the system schema is correctly installed. The
response indicates whether the schema, admin configuration, and form setup are valid.

### Example of Installation Check Response

```json
{
  "schema_ok": false,
  "admin_ok": false,
  "form_ok": false,
  "warning": null,
  "config": {
    "ENABLE_WORKFLOW": true,
    ...
  }
}
```

This check is essential for quickly diagnosing schema inconsistencies in the GUI, which can prompt the user to reinstall
the system.

### Installation Token Requirement

If the system reinstallation is required, installation token an  is necessary:

- **Non-multi-tenant**: Found in environment variables `INSTALLATION_TOKEN`.
- **Multi-tenant**: Retrieved from the TMS (Tenant Management System). Todo so log in to TMS API or TMS GUI if available and list all tenants and find the token for current tenant installation.

