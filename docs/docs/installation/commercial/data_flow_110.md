## Data Collection and Processing in Tracardi v1.1.0

In version 1.1.0, Tracardi introduces a restructured data flow process to improve load distribution across a cluster.
Though the core Docker images remain the same, they are now deployable across multiple nodes, with dedicated workers for
each data processing stage. Here’s a breakdown of the updated data flow and processing in v1.1.0:

!!! Note

    Before you begin learn the [pod naming convention](../../getting_started/codings/pod_naming_convention.md).


### 1. **Collection**

- **Component**: `tracardi-api` Docker (represented by `public-api` and `private-api` pods in Kubernetes).
- **Function**: Data is collected through the API and stored immediately after the source is verified, unlike in v1.0.0,
  where initial processing was performed. This simplification enables efficient data queuing without delay.
- **Primary Output**: Data (profiles, sessions, and events) queued to Apache Pulsar after source verification, ready for
  processing by other designated workers.

### 2. **Processing**

- **Component**: Dedicated processing worker (`wk-pl-collector` pod).
- **Function**: Data processing occurs in a separate worker thread within the cluster, managed by the `wk-pl-collector`
  pod if configured (`worker.collector.enabled: True` in Helm chart). This enables scalability by isolating processing
  from API handling. If the `wk-pl-collector` pod is not enabled, processing defaults to the API. This may introduce some lag in data processing.
- **Primary Output**: Processed profiles, sessions, and events queued for storage, allowing for enhanced performance by
  offloading processing from the API.

### 3. **Storage**

- **Component**: Background worker (`wk-pl-background` pod).
- **Function**: Similar to v1.0.0, the `wk-pl-background` worker batches data and stores profiles, sessions, and events
  in the database for future access and analysis.
- **Primary Output**: Persisted data in the database, ensuring structured, reliable storage.

### 4. **Dispatch**

- **Component**: Background worker (`wk-pl-background` pod).
- **Function**: Data dispatch to external systems remains the responsibility of the background worker. This stage
  configures and sends data as needed for integration with external systems.
- **Primary Output**: Data sent to external destinations based on defined configurations, maintaining external system
  updates.

### 5. **Workflow Execution**

- **Component**: Dedicated workflow worker (`wk-pl-workflow` pod).
- **Function**: Workflow execution is managed by the `wk-pl-workflow` pod if enabled (`worker.workflow.enabled: True` in
  Helm chart). This dedicated worker handles workflow triggering based on events and conditions within Tracardi,
  enhancing the platform’s automation capabilities. If disabled, no pod is allocated for this process and workflow is disabled.
- **Primary Output**: Workflow actions executed, with isolated handling that enables distributed, scalable processing of
  workflow events.

### Summary

In Tracardi v1.1.0, the API (`tracardi-api`) handles initial data collection, while separate workers—`wk-pl-collector`
for processing and `wk-pl-workflow` for workflows—enable distributed background processing. This design improves
scalability and allows each stage to operate independently, enhancing performance and fault tolerance across the
Tracardi cluster.

---

## Troubleshooting Common Issues

1. **Data Missing in Database Despite 200 API Response**
    - **Cause**: While the API collects and verifies data, the background or collector worker might encounter issues,
      preventing storage.
    - **Solution**: Check logs for the `wk-pl-background` or `wk-pl-collector` worker:
        - **Out of Memory**: Increase the memory allocation if high data volumes are causing resource constraints.
        - **Lost Connections**: Verify connections to MySQL, Pulsar, and other essential services.
        - **License Expiration**: Expired licenses may cause worker restarts; confirm the license status.

2. **Public API Fails with 500 Error, While Private API Functions**
    - **Cause**: An issue with the `public-api` component.
    - **Solution**: Review `public-api` logs for specific error details to diagnose the issue.

3. **GUI Inaccessible, Private API Non-Responsive**
    - **Cause**: `private-api` might have issues affecting GUI connectivity.
    - **Solution**: Inspect `private-api` logs for error entries and troubleshoot accordingly.

4. **Profile Auto-Merging Not Occurring**
    - **Cause**: The auto-profile merging function is inactive.
    - **Solution**: Check logs for the auto-profile merging worker (e.g., `wk-apm` pod) to diagnose any issues.

5. **GUI Not Accessible**
    - **Cause**: A deployment issue with the frontend (`fe-rj-gui`).
    - **Solution**: Review logs for `fe-rj-gui` to identify errors affecting GUI accessibility.

6. **No workflow triggered**
    - **Cause**: The workflow pod is inactive.
    - **Solution**: Enable `worker.workflow.enabled: True` in helm chart. If enabled see the `wk-pl-workflow` for errors.
    - 
7. **Error: TOO_MANY_REQUESTS/12/disk usage exceeded flood-stage watermark, index has read-only-allow-delete block]**
    - **Cause**: There is too little space on disk.
    - **Solution**: Add disk or change elasticsearch settings: e.g `curl -X PUT -H "Content-Type: application/json" http://localhost:9200/_cluster/settings?pretty  -d' { "transient": { "cluster.routing.allocation.disk.watermark.low": "10gb", "cluster.routing.allocation.disk.watermark.high": "10mb", "cluster.routing.allocation.disk.watermark.flood_stage": "10mb", "cluster.info.update.interval": "1m"}}'`.

Additionally, refer to the Monitoring/Logs section in the Tracardi GUI for centralized logging of major issues across
all services.
