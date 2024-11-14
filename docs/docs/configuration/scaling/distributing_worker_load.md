# Distributing Worker Load on Different Servers

This documentation provides guidance on using Helm charts to distribute workloads across designated nodes in Kubernetes
by leveraging node affinity settings.

In Kubernetes, **affinity** is a mechanism that allows you to specify rules for scheduling pods on particular nodes
based on custom requirements, such as node labels, to optimize resource allocation and performance.

## Configuration

Each worker and API component has its own dedicated **affinity** section in the `values.yaml` file, allowing you to
define custom affinity rules for scheduling. These sections specify node preferences and requirements, enabling you to
control the distribution of workloads across different nodes based on specific criteria such as node labels, zone, or
instance type.

By configuring affinity settings within each component’s section, you can ensure that workers, API instances, and other
services are distributed effectively to meet resource and performance needs.

For example:

- The `api.private.nodeAffinity` and `api.public.nodeAffinity` sections control node placement for private and public
  API instances.
- The `worker.background.nodeAffinity`, `worker.collector.nodeAffinity`, and `worker.workflow.nodeAffinity` sections
  allow you to set rules for various worker types.

These configurations make it possible to tailor pod deployment based on node characteristics, helping optimize workload
management across the Kubernetes cluster.

### Affinity-Related Configuration Examples

These are examples for node affinity configuration.

1. **API Private Node Affinity** (`api.private.nodeAffinity`):
   ```yaml
    # Example of nodeAffinity
    api:
      private:
        nodeAffinity:
          required:
            - key: node-type
              operator: In
              values:
                - compute
          preferred:
            - weight: 100
              key: zone
              operator: In
              values:
                - us-east-1a
            - weight: 50
              key: instance-type
              operator: In
              values:
                - c5.xlarge
   ```

2. **API Public Node Affinity** (`api.public.nodeAffinity`):
   ```yaml
    api:
      public:
        nodeAffinity:
          required:
            - key: node-type
              operator: In
              values:
                - compute
          preferred:
            - weight: 100
              key: zone
              operator: In
              values:
                - us-east-1a
            - weight: 50
              key: instance-type
              operator: In
              values:
                - c5.xlarge
   ```

3. **TMS Node Affinity** (`tms.nodeAffinity`):
   ```yaml
    tms:
      nodeAffinity:
        ...the same as above
   ```

4. **TMS GUI Node Affinity** (`tmsGui.nodeAffinity`):
   ```yaml
    tmsGui:
      nodeAffinity:
        ...the same as above
   ```

5. **Worker Background Node Affinity** (`worker.background.nodeAffinity`):
   ```yaml
    worker:
      background:
        ...the same as above

6. **Worker Collector Node Affinity** (`worker.collector.nodeAffinity`):
   ```yaml
    worker:
      collector:
        ...the same as above
   ```

7. **Worker Workflow Node Affinity** (`worker.workflow.nodeAffinity`):
   ```yaml
    worker:
      workflow:
        ...the same as above
   ```

8. **APM Profile Node Affinity** (`apm.profile.nodeAffinity`):
   ```yaml
    apm:
      profile:
        ...the same as above
   ```

9. **Upgrade Worker Node Affinity** (`upgrade.nodeAffinity`):
   ```yaml
    upgrade:
      nodeAffinity:
        ...the same as above
   ```

10. **Queue Bridge Node Affinity** (`bridge.queue.nodeAffinity`):
    ```yaml
     bridge:
       queue:
         ...the same as above
    ```