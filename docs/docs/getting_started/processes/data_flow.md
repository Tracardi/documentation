# Configuring data processing in tracardi

In Tracardi, the data flow is divided into four key stages: **collection**, **processing**, **storage**, and *
*orchestration**. By default, the `tracardi-api` component handles a significant portion of the data processing burden.
It collects incoming events, verifies their sources, and performs initial tasks such as event reshaping, mapping, and
other preprocessing operations. After this initial processing, the data is queued for further handling by background
workers, enabling distributed processing and parallel execution across multiple system components.

In the default configuration, while the API manages the core responsibilities of data collection and initial processing,
background workers handle the subsequent stages. Storage workers batch and persist processed data, such as profiles,
sessions, and events, into Elasticsearch for reliable and scalable storage. Orchestration tasks, including workflow
execution and external system integrations, are managed by dedicated workflow workers. These stages operate
independently, ensuring efficient parallel execution and enabling Tracardi to maintain scalability and fault tolerance
in handling high-volume data flows. The default design places the primary processing load on the API, ensuring
streamlined operations while distributing other tasks to specialized workers.

All jobs are processed by one queue and dedicated worker in parallel.

## Scaling the Default Configuration of Tracardi

The most effective way to scale the default configuration of Tracardi is by scaling its API layer. Since the API (
`tracardi-api`) handles significant data processing during collection, increasing the number of API pods allows the
system to handle a higher volume of incoming traffic and events. This approach ensures that the primary bottleneck—data
collection and initial processing—can accommodate the increased load efficiently.



---

### Troubleshooting Scaling Issues

#### No Increase in Throughput After Scaling

1. **No Increase in Throughput**:
    - **Check API Logs**: Verify that the scaled API pods are actively consuming traffic. If not, the problem may lie
      elsewhere in the setup.
    - **Load Balancer**: Ensure that your load balancer is properly configured and is directing traffic evenly across
      all API pods.
    - **Kubernetes Configuration**: Some Kubernetes installations may require a restart of event consumption services
      after increasing the number of API pods.

2. **Ingress Misconfiguration**:
    - Use an ingress controller to distribute traffic across the API pods. Confirm that the ingress is properly
      directing incoming requests to the scaled API pods.
    - Monitor ingress traffic flow to ensure it is routing traffic correctly.

#### Troubleshooting Event Data Piling Up in the Queue

If event data accumulates in the queue and is not consumed promptly, it indicates that the **Background Worker** (
`wk-pl-background` pod) is unable to process the events at the required pace. The background worker is responsible for
storing processed data, such as profiles, sessions, and events, in Elasticsearch. To resolve this issue, scale the
number of background worker replicas. Increasing the number of workers ensures parallel processing of queued events,
preventing data backlog.

To check if the data is piling up, use the Tracardi API endpoint `/queue/{namespace}/{topic}/backlog`. This endpoint
monitors the queue status in Apache Pulsar. For example, to check the backlog for the `system` namespace and the
`functions` topic, make a request to:

```
GET /queue/system/functions/backlog
```

The response will include details about the number of unprocessed messages (`count`) in each partition of the queue. A
high `count` indicates that data is not being consumed efficiently. For example:

```json
{
  "total": 50,
  "backlog": [
    {
      "partition": "persistent://tracardi/system/functions-partition-0",
      "subscription": "tracardi-function-subscription",
      "count": 25
    },
    {
      "partition": "persistent://tracardi/system/functions-partition-1",
      "subscription": "tracardi-function-subscription",
      "count": 25
    }
  ]
}
```

If the `count` values are consistently high, update the `worker.background.replicas` parameter in the Helm chart to
increase the number of background worker pods. For example:

```yaml
worker:
  background:
    replicas: 3  # Increase this number to handle higher workloads
```

After scaling the workers, monitor the backlog again. A properly scaled system will show a `count` close to zero,
indicating near real-time consumption of queued events. This ensures smooth data flow and prevents delays in storage.

## Consuming Payloads Directly into the Queue

Starting with version 1.1.0, Tracardi introduces the option to immediately consume tracker payloads into a queue. This
configuration delegates data processing to a dedicated worker (`wk-pl-collector`), isolating processing from the API and
enhancing scalability. To enable this feature, configure the Helm chart with `worker.collector.enabled: True`, which
will spin up the `wk-pl-collector` pod to handle queued data. If this worker is not enabled, queue data processing as
presented below will not work.

When the collector worker is running, you have new options for handling tracker payloads. The `/track` API endpoint now
supports direct queuing of data by including the `options.queue` property in the payload. For example:

```json
{
  "options": {
    "queue": true
  }
}
```

This directs the tracker payload to the queue instead of processing it immediately in the API. Note that when queuing is
enabled, the API response may return an HTTP status code of `201` (indicating successful queuing) instead of the usual
`200`. Ensure your application is prepared to handle both status codes. Below is an example of a complete tracker
payload configured for direct queuing in POST `/track` endpoint:

```json
{
  "source": {
    "id": "locust-test"
  },
  "profile": {
    "id": "profile-id"
  },
  "session": {
    "id": "session-id"
  },
  "events": [
    {
      "options": {
        "async": true
      },
      "type": "page-view",
      "properties": {
        "id": "string",
        "category": "string"
      }
    }
  ],
  "context": {},
  "options": {
    "queue": true
  }
}
```

While this configuration enables efficient queuing and distributed processing, it may introduce additional latency as
data goes through a longer pipeline. If the default API processing setup meets your performance needs, it should remain
your primary configuration. However, if higher scalability and event throughput are required, enabling the collector
worker offers a more robust solution.

---

### Troubleshooting Consumption via Direct Queuing

#### Issue: No Events in the System

If no events appear in the system when using direct queuing, follow these steps to troubleshoot:

1. **Check `wk-pl-collector` Logs**  
   Inspect the logs of the `wk-pl-collector` pod to identify any errors or issues. If you need more detailed
   information, increase the logging level by modifying the Helm chart configuration as follows:

   ```yaml
   worker:
     collector:
       enabled: true
       config:
         loggingLevel: "DEBUG"
   ```

   After applying this configuration, the logs may look like this:

   ```
   2024-10-24 07:09:50,870: DEBUG: Invoked com_tracardi.service.tracking.tracker_execution.execute_com_tracker_in_queue. Finished in 00:00.005: (defer.service.invokers:invokers.py:42)
   ```

   This message indicates that the data has been processed and forwarded to other workers.

2. **Check `wk-pl-background` Logs**  
   If the data is being processed by the collector but still not visible in the system, check the `wk-pl-background` pod
   logs to verify if the data has been stored. To enable detailed logs for this worker, update its logging level in the
   Helm chart:

   ```yaml
   worker:
     background:
       enabled: true
       config:
         loggingLevel: "DEBUG"
   ```

   Look for log messages such as these:

   ```
   2024-11-29 07:09:54,139: INFO: Profiles: Saved 2, Errors=0, ErrorIds=[], Time=0.0305478572845459, Context=8504a/True: (com_tracardi.workers.profile:profile.py:48)
   2024-11-29 07:09:54,184: DEBUG: Invoked com_tracardi.workers.profile.store_bulk_profiles_in_queue. Finished in 00:00.075: (defer.service.invokers:invokers.py:42)
   2024-11-29 07:09:54,194: INFO: Sessions: Saved 2, Errors=0, ErrorIds=[], Time=0.009190559387207031, Context=8504a/True: (com_tracardi.workers.session:session.py:36)
   2024-11-29 07:09:54,208: INFO: Events: Saved 2, Errors=0, ErrorIds=[], Time=0.013616323471069336, Context=8504a/True: (com_tracardi.workers.event:event.py:47)
   ```

   These log entries confirm the successful storage of profiles, sessions, and events, with performance metrics such as
   processing time and error counts.

3. **Verify the Data Flow**  
   If both the `wk-pl-collector` and `wk-pl-background` logs indicate proper functioning, but data is still missing,
   ensure there are no connectivity issues between components such as Pulsar, Elasticsearch, or MySQL.

