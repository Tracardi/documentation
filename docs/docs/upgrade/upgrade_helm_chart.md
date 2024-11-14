# From version 1.0.x to 1.1.x

## Changes to pods

Changes to Installation Types:

- APIs have been updated from StatefulSets to Deployments to reflect their stateless nature, which is now applied in the Helm chart.
- The experimental "Fail-Over" feature, which was never used in production, has been removed.
- Load balancer configuration has been added.

## Changes to values file

Updates made to `values.yaml` file. This indicates new configurations that can be done.

## Non-breaking Changes

### Newly Added Changes

1. **Exposed Connection Pool Configuration** (`mysql.pool`): Added with defaults:
   - `size`: `5`
   - `maxOverflow`: `2`
   - `timeout`: `3`
   - `recycle`: `1800`

2. **Exposed Tenant Management Service (TMS) API** (`tmsApi.host` and `tmsApi.database`): Added with defaults:
   - `host`: `"be-tms-svc"`
   - `database`: `"tms"`

3. **Cluster-wide Configuration** (`config`): Enhanced with new properties and defaults:
   - `multiTenant.multi`: `"no"`

4. **Exposed System Events and Cache Settings**: Added with defaults:
   - `config.systemEvents.enabled`: `"yes"`
   - `config.cache.keepProfileInCacheFor`: `3600`
   - `config.cache.keepSessionInCacheFor`: `1800`

5. **APM, Experimental Features, and Additional Flags** (`config.apm`): Added with defaults:
   - `apm.identificationEventProperty`: `""`
   - `apm.tipType`: `""`
   - `apm.eventType`: `""`
   - `eff.enableLateProfileBinding`: `"no"`
   - `features.enableEventDestinations`: `"yes"`
   - `features.enableProfileDestinations`: `"yes"`
   - `features.enableAudiences`: `"yes"`
   - `features.enableWorkflow`: `"yes"`
   - `features.enableEventValidation`: `"yes"`
   - `features.enableEventReshaping`: `"yes"`
   - `features.enableEventMapping`: `"yes"`
   - `features.enableEventToProfileMapping`: `"yes"`
   - `features.enableDataCompliance`: `"yes"`
   - `features.enableEventSourceCheck`: `"yes"`
   - `features.enableIdentificationPoints`: `"yes"`

6. **Load Balancer Settings**: Added across services with a default:
   - `loadBalancer`: `false` (in `api.private.service`, `api.public.service`, `tms.service`, and `tmsGui.service`).

7. **Resource Limits and Requests**: Added with defaults for memory and CPU allocations:
   - `api.private.resources.limits.memory`: `1000Mi`
   - `api.private.resources.limits.cpu`: `500m`
   - `api.private.resources.requests.memory`: `100Mi`
   - `api.private.resources.requests.cpu`: `100m`
   - `api.public.resources.limits.memory`: `300Mi`
   - `api.public.resources.limits.cpu`: `500m`
   - `api.public.resources.requests.memory`: `100Mi`
   - `api.public.resources.requests.cpu`: `100m`
   - `worker.background.resources.limits.memory`: `500Mi`
   - `worker.background.resources.limits.cpu`: `1000m`
   - `worker.background.resources.requests.memory`: `300Mi`
   - `worker.background.resources.requests.cpu`: `300m`
   - `worker.collector.resources.limits.memory`: `500Mi`
   - `worker.collector.resources.limits.cpu`: `1000m`
   - `worker.collector.resources.requests.memory`: `300Mi`
   - `worker.collector.resources.requests.cpu`: `300m`

8. **Node Affinity Configuration Examples**: Added examples for affinity settings across services (e.g., `api.private.nodeAffinity`, `tmsGui.nodeAffinity`). More below.

9. **Exposed Worker Configuration** (`worker.background`): New settings with defaults:
   - `worker.background.enabled`: `true`
   - `worker.background.config.loggingLevel`: `"INFO"`
   - `worker.background.config.bulker.bufferInactivityTimeOut`: `10000`

10. **Collector and Workflow Configuration**: New configurations with defaults:
   - Collector settings (`worker.collector`):
     - `worker.collector.enabled`: `false`
     - `worker.collector.config.loggingLevel`: `"INFO"`
     - `worker.collector.config.bulker.bufferInactivityTimeOut`: `10000`
   - Workflow settings (`worker.workflow`):
     - `worker.workflow.enabled`: `false`
     - `worker.workflow.config.loggingLevel`: `"INFO"`
     - `worker.workflow.config.bulker.bufferInactivityTimeOut`: `10000`

---

### Updated Changes

1. **Version Tags**: Updated from `1.0.0` to `1.1.x` across services:
   - `api.image.tag`
   - `worker.background.image.tag`
   - `gui.image.tag`
   - `bridge.queue.image.tag`

---

### Removed Changes

1. **Telemetry and Digital Ocean Sections**: Marked as not used (commented out).
2. **Coping Worker Configuration**: Removed the configuration for `copingWorker`.
3. **Removed Fail-over**: Not used any more
   - `storage.failOver.enabled`: `false`
   - `storage.failOver.size`: `"1Gi"`

---

### Changes that need attention

- **Load Balancers Disabled by Default**: In the new Helm chart, load balancers are set to `false` by default. If you need to enable load balancers for any API, please modify your local `values.yaml` file.

- **Enabling Load Balancers**: To enable load balancers, update the `loadBalancer` setting to `true` in the following paths within your `values.yaml`:

  ```yaml
  api:
    private:
      service:
        loadBalancer: true
    public:
      service:
        loadBalancer: true

  tms:
    service:
      loadBalancer: true

  tmsGui:
    service:
      loadBalancer: true
  ```

Make these changes in each relevant section to ensure load balancers are activated where needed.