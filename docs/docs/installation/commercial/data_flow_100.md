## Data Collection and Processing in Tracardi v1.0.0

In version 1.0.0, Tracardi follows a structured four-stage data collection process involving both API handling and
background workers for optimal data flow and processing. Here’s a detailed overview:

!!! Note

    Before you begin learn the [pod naming convention](../../getting_started/codings/pod_naming_convention.md).


### 1. **Collection**

- **Component**: `tracardi-api` Docker (in Kubernetes, represented by `public-api` and `private-api` pods).
- **Function**: The collection stage begins with data acquisition through the Tracardi API. Data is ingested from
  multiple sources and organized into profiles, sessions, and events. Once processed, the data is queued to Apache
  Pulsar for subsequent handling.
- **Primary Output**: Profiles, sessions, and events are prepared and temporarily held in Apache Pulsar queues. Response
  is returned to API.

### 2. **Storage**

- **Component**: Background worker (in Kubernetes, represented by the `wk-pl-background` pod).
- **Function**: The storage stage manages the saving of profiles, sessions, and events to the database. This worker
  batches data to optimize database transactions, improving efficiency and ensuring consistency across data points.
- **Primary Output**: Persisted data in the database, structured for later access and analysis.

### 3. **Dispatch**

- **Component**: Background worker (also managed by the `wk-pl-background` pod).
- **Function**: At the dispatch stage, data is prepared and sent to external destinations as configured. This enables
  external systems to receive real-time updates from Tracardi, enhancing cross-platform integrations.
- **Primary Output**: Data sent to external systems based on configured destinations.

### 4. **Workflow**

- **Component**: Background worker (handled by the `wk-pl-background` pod).
- **Function**: This stage triggers and manages workflows based on incoming events and specific conditions defined
  within Tracardi. Workflow executions provide data-driven automation, such as segmentation and real-time analysis.
- **Primary Output**: Workflow actions executed based on incoming event data.

### Summary

In version 1.0.0, the API (`tracardi-api`) is responsible for initial data collection, while a single background
worker (`wk-pl-background`) oversees storage, dispatch, and workflow management tasks. This design centralizes
background processes, simplifying management and ensuring efficient handling of background jobs.

---

## Troubleshooting Common Issues

1. **Data Missing in Database Despite 200 API Response**
    - **Cause**: While the API successfully collects and queues data to Apache Pulsar, the background worker might
      encounter issues.
    - **Solution**: Check the `wk-pl-background` worker logs. Common issues include:
        - **Out of Memory**: If your deployment handles a high volume of data, consider increasing the memory limit for
          the background worker.
        - **Lost Connections**: Check connections to MySQL, Pulsar, and other essential services.
        - **License Expiration**: Expired license may cause worker to restart.

2. **Public API Fails with 500 Error, While Private API Functions**
    - **Cause**: An issue with the `public-api` component.
    - **Solution**: Review `public-api` logs for specific errors to diagnose the underlying issue.

3. **GUI Inaccessible, Private API Non-Responsive**
    - **Cause**: `private-api` may have issues impacting GUI connection.
    - **Solution**: Check `private-api` logs for errors and troubleshoot based on log outputs.

4. **Profile Auto-Merging Not Occurring**
    - **Cause**: The auto-profile merging function is not operational.
    - **Solution**: Check the auto-profile merging worker (`wk-apm` pod) for any log entries or errors.

5. **GUI Not Accessible**
    - **Cause**: An issue with the frontend deployment.
    - **Solution**: Inspect the `fe-rj-gui` deployment logs for error messages affecting GUI availability.

---

Also inspect logs in Tracardi GUI where all major issue can be reported. See Monitoring/Logs.