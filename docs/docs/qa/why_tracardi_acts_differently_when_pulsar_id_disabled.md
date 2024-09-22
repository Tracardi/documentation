# Why tracardi acts differently when I have pulsar disabled and enabled with PULSAR_DISABLED env variable?

Tracardi behaves differently when Pulsar is enabled versus when it is disabled due to the role Pulsar plays in managing
event streams and background tasks in the system. Here's how it affects the behavior:

1. **Event Streaming and Message Queuing**: Pulsar is used to handle high-throughput, low-latency message streams,
   including event streaming and background workflows. When Pulsar is enabled, Tracardi can offload tasks to the
   messaging system, ensuring asynchronous processing of events, which improves scalability and performance.

2. **Workflow Asynchrony**: Tracardi workflows are designed to benefit from asynchronous processing when Pulsar is
   enabled. With Pulsar active, workflows can handle tasks asynchronously, allowing more complex tasks to be handled
   without blocking other operations. This results in faster responses for events processed in real-time, especially
   when heavy background tasks are involved.

3. **Distributed Systems and Scaling**: Pulsar enables Tracardi to scale horizontally by distributing the load across
   multiple nodes. When Pulsar is disabled, Tracardi falls back to synchronous processing or in-memory queues, which may
   be less efficient, especially in high-load scenarios.

4. **Handling of Background Tasks**: With Pulsar enabled, background workers can handle large queues of tasks
   effectively by leveraging Pulsar's capabilities. When it’s disabled, tasks that would otherwise be queued for
   background processing may be executed synchronously, potentially slowing down real-time event processing.


5. **Configuration Inconsistency**: Another reason for the different behavior between Tracardi when Pulsar is enabled or
   disabled could be due to **configuration consistency between Tracardi API and Tracardi Worker**. Tracardi API and
   Worker are separate Docker containers, and **both need to be configured identically** for the system to function
   correctly, especially when it comes to integrations like Pulsar.

   If you are using Helm charts for installation, they automatically track changes and apply those changes consistently
   to both the API and Worker configurations. This ensures that the same settings, such as Pulsar's host, port, and
   authentication tokens, are applied to both components. However, if you are managing the installation manually, you
   must ensure that **any configuration changes, particularly related to Pulsar**, are applied manually to both the API and
   Worker. Inconsistent configurations can lead to one component (e.g., the API) being able to communicate with Pulsar
   while the Worker cannot, resulting in unexpected behaviors, including failures in event handling or background task
   processing.

   This manual setup requires attention to configuration files such as environment variables for
   Pulsar's `host`, `port`, and authentication, which need to be replicated exactly between both Docker containers.

   If you skip this step or have a mismatch between the API and Worker, Tracardi will behave inconsistently, especially
   when handling events or background workflows that rely on Pulsar.