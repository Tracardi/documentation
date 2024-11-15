# Troubleshooting

This section describes ways to solve issue during installation and system maintenance.

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

## Troubleshooting Maintenance Issues

## Excessive number of database connections 

## Lost MYSQL connection

## Deleted indices

## Lost MYSQL connection

...

## Lost Redis connection

...

## Lost Elasticsearch connection

...

## Lost Apache Pulsar connection

...

## Inconsistent schema in Elasticsearch

...

## Inconsistent schema in MySQL

...

## Excessive number of database connections 