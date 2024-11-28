# Troubleshooting Yellow Cluster State in Elasticsearch

A **yellow cluster state** in Elasticsearch indicates that the primary shards of all indices are active, but one or more
replica shards are unassigned. This means the data is available but lacks full redundancy, leaving the cluster less
resilient to node failures.

This guide provides steps to troubleshoot and resolve a yellow cluster state and includes the necessary `curl` commands
to monitor shard allocation and cluster health.

---

## Steps to Troubleshoot a Yellow Cluster State

### 1. **Check Cluster Health**

Start by verifying the cluster's health to confirm its state and identify unassigned shards.

```bash
curl -X GET "http://<your-elasticsearch-host>:9200/_cluster/health?pretty"
```

Look for:

- `status: yellow`
- `unassigned_shards`: The number of shards currently unassigned.
- `active_shards`: The total number of active shards.

---

### 2. **Check Shard Allocation**

Get detailed information about the allocation of shards, including their state and assigned nodes.

```bash
curl -X GET "http://<your-elasticsearch-host>:9200/_cat/shards?v"
```

Example output:

```
index            shard prirep state       docs  store ip         node
my-index         0     p      STARTED     1000  1.1mb 192.168.1.1 node-1
my-index         0     r      UNASSIGNED
my-index         1     p      STARTED     1200  1.3mb 192.168.1.2 node-2
my-index         1     r      UNASSIGNED
```

Key Points:

- **`p` (primary)** shards must be in the `STARTED` state.
- **`r` (replica)** shards in the `UNASSIGNED` state are causing the yellow status.

---

### 3. **Explain Unassigned Shards**

Diagnose why shards are unassigned using the `_cluster/allocation/explain` API.

```bash
curl -X POST "http://<your-elasticsearch-host>:9200/_cluster/allocation/explain?pretty" -H 'Content-Type: application/json' -d '
{
  "index": "my-index",
  "shard": 0,
  "primary": false
}'
```

The response will provide detailed reasons for the unassigned state, such as:

- Insufficient disk space.
- Node resource constraints.
- Shard allocation rules.

---

### 4. **Verify Disk Space**

Check if any node is running low on disk space, which can block replica assignment due to disk watermarks.

```bash
curl -X GET "http://<your-elasticsearch-host>:9200/_cat/nodes?v&h=name,disk.avail"
```

Example output:

```
name       disk.avail
node-1     10.2gb
node-2      1.8gb
node-3     50.5gb
```

If a node’s available disk space is below the high or flood-stage watermark, shard allocation will be blocked.

---

### 5. **Verify Shard Allocation Filters**

Check if shard allocation filters are preventing shards from being assigned to certain nodes.

```bash
curl -X GET "http://<your-elasticsearch-host>:9200/<index-name>/_settings?pretty"
```

Look for:

- `index.routing.allocation.include`
- `index.routing.allocation.exclude`
- `index.routing.allocation.require`

If these settings are too restrictive, update them to allow shards to be allocated to more nodes.

---

### 6. **Check Cluster Settings**

Ensure global cluster settings are not throttling shard allocation.

```bash
curl -X GET "http://<your-elasticsearch-host>:9200/_cluster/settings?pretty"
```

Key settings to look for:

- `cluster.routing.allocation.disk.watermark.low`, `high`, `flood_stage`
- `cluster.routing.allocation.node_concurrent_recoveries`
- `cluster.routing.allocation.cluster_concurrent_rebalance`

---

### 7. **Resolve the Issue**

#### Case 1: Disk Watermark Blocks

If a node’s disk space is below the threshold, adjust the disk watermark or free up space.

```bash
curl -X PUT "http://<your-elasticsearch-host>:9200/_cluster/settings" -H 'Content-Type: application/json' -d '
{
  "persistent": {
    "cluster.routing.allocation.disk.watermark.low": "85%",
    "cluster.routing.allocation.disk.watermark.high": "90%",
    "cluster.routing.allocation.disk.watermark.flood_stage": "95%"
  }
}'
```

---

#### Case 2: Increase Concurrent Recoveries

Increase the number of concurrent shard recoveries if shard allocation is throttled.

```bash
curl -X PUT "http://<your-elasticsearch-host>:9200/_cluster/settings" -H 'Content-Type: application/json' -d '
{
  "persistent": {
    "cluster.routing.allocation.node_concurrent_recoveries": 4,
    "cluster.routing.allocation.cluster_concurrent_rebalance": 3
  }
}'
```

---

#### Case 3: Update Allocation Filters

If shards are restricted by allocation filters, adjust the settings.

```bash
curl -X PUT "http://<your-elasticsearch-host>:9200/<index-name>/_settings" -H 'Content-Type: application/json' -d '
{
  "index": {
    "routing.allocation.include._name": "node-1,node-2,node-3"
  }
}'
```

---

### 8. **Monitor Recovery Progress**

Check ongoing shard recovery processes using the `_recovery` API.

```bash
curl -X GET "http://<your-elasticsearch-host>:9200/_cat/recovery?v"
```

Key fields:

- **`stage`**: Shows the current recovery stage (e.g., `INDEX` or `DONE`).
- **`recovered_percent`**: Indicates the progress of shard recovery.

---

### 9. **Verify Cluster State**

After resolving the issues, verify that the cluster state is now green.

```bash
curl -X GET "http://<your-elasticsearch-host>:9200/_cluster/health?pretty"
```

A **`status: green`** indicates that all primary and replica shards are assigned and active.

---

### Conclusion

A yellow cluster state in Elasticsearch indicates that the cluster is functional but lacks redundancy. By systematically
checking shard allocation, node resources, and cluster settings, you can identify and resolve the root cause. Use the
provided `curl` commands to monitor the cluster and ensure proper shard allocation for a robust and fault-tolerant
Elasticsearch deployment.