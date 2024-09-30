# Open-source env variables

| **Environment Variable**                 | **Description**                                                       |
|------------------------------------------|-----------------------------------------------------------------------|
| `_DEBUG_VERSION`                         | Application version. Default: `1.1.x`.                                |
| `TENANT_NAME`                            | Tenant name for the application. Default: `None`.                     |
| `EVENT_TO_PROFILE_COPY_CACHE_TTL`        | Cache TTL for event-to-profile copy. Default: `5`.                    |
| `SOURCE_CACHE_TTL`                       | Cache TTL for source data. Default: `5`.                              |
| `SESSION_CACHE_TTL`                      | Cache TTL for session data. Default: `5`.                             |
| `EVENT_VALIDATION_CACHE_TTL`             | Cache TTL for event validation data. Default: `15`.                   |
| `EVENT_METADATA_CACHE_TTL`               | Cache TTL for event metadata. Default: `15`.                          |
| `EVENT_DESTINATION_CACHE_TTL`            | Cache TTL for event destination. Default: `5`.                        |
| `PROFILE_DESTINATION_CACHE_TTL`          | Cache TTL for profile destination. Default: `5`.                      |
| `DATA_COMPLIANCE_CACHE_TTL`              | Cache TTL for data compliance. Default: `5`.                          |
| `TRIGGER_RULE_CACHE_TTL`                 | Cache TTL for trigger rules. Default: `15`.                           |
| `MYSQL_HOST`                             | MySQL host. Default: `localhost`.                                     |
| `MYSQL_USERNAME`                         | MySQL username. Default: `root`.                                      |
| `MYSQL_PASSWORD`                         | MySQL password. Default: `root`.                                      |
| `MYSQL_SCHEMA`                           | MySQL schema for async driver. Default: `mysql+aiomysql://`.          |
| `MYSQL_PORT`                             | MySQL port. Default: `3306`.                                          |
| `MYSQL_DATABASE`                         | MySQL database name. Default: `tracardi`.                             |
| `MYSQL_ECHO`                             | Enable MySQL echo. Default: `no`.                                     |
| `UNSET_CREDENTIALS`                      | Unset credentials after use. Default: `off`.                          |
| `ELASTIC_INDEX_REPLICAS`                 | Number of Elasticsearch index replicas. Default: `1`.                 |
| `ELASTIC_INDEX_SHARDS`                   | Number of Elasticsearch index shards. Default: `3`.                   |
| `ELASTIC_CONF_INDEX_SHARDS`              | Number of Elasticsearch configuration index shards. Default: `1`.     |
| `ELASTIC_SNIFF_ON_START`                 | Enable Elasticsearch sniffing on start. Default: `None`.              |
| `ELASTIC_SNIFF_ON_CONNECTION_FAIL`       | Enable Elasticsearch sniffing on connection fail. Default: `None`.    |
| `ELASTIC_SNIFFER_TIMEOUT`                | Timeout for Elasticsearch sniffing. Default: `None`.                  |
| `ELASTIC_CA_FILE`                        | Path to Elasticsearch CA file. Default: `None`.                       |
| `ELASTIC_API_KEY_ID`                     | Elasticsearch API key ID. Default: `None`.                            |
| `ELASTIC_API_KEY`                        | Elasticsearch API key. Default: `None`.                               |
| `ELASTIC_CLOUD_ID`                       | Elasticsearch cloud ID. Default: `None`.                              |
| `ELASTIC_MAX_CONN`                       | Maximum number of Elasticsearch connections. Default: `25`.           |
| `ELASTIC_HTTP_COMPRESS`                  | Enable HTTP compression for Elasticsearch. Default: `None`.           |
| `ELASTIC_VERIFY_CERTS`                   | Verify certificates for Elasticsearch. Default: `off`.                |
| `ELASTIC_HOST`                           | Elasticsearch host. Default: `http://localhost:9200`.                 |
| `ELASTIC_HTTP_AUTH_USERNAME`             | Elasticsearch HTTP authentication username. Default: `elastic`.       |
| `ELASTIC_HTTP_AUTH_PASSWORD`             | Elasticsearch HTTP authentication password. Default: `None`.          |
| `ELASTIC_SCHEME`                         | Elasticsearch scheme. Default: `http`.                                |
| `ELASTIC_QUERY_TIMEOUT`                  | Elasticsearch query timeout. Default: `12`.                           |
| `ELASTIC_LOGGING_LEVEL`                  | Elasticsearch logging level. Default: `ERROR`.                        |
| `REDIS_HOST`                             | Redis host. Default: `localhost`.                                     |
| `REDIS_PORT`                             | Redis port. Default: `6379`.                                          |
| `REDIS_PASSWORD`                         | Redis password. Default: `None`.                                      |
| `PRODUCTION`                             | Enable production mode. Default: `no`.                                |
| `TRACK_DEBUG`                            | Enable track debugging. Default: `no`.                                |
| `SAVE_LOGS`                              | Save logs. Default: `yes`.                                            |
| `ENABLE_EVENT_DESTINATIONS`              | Enable event destinations. Default: `no`.                             |
| `ENABLE_PROFILE_DESTINATIONS`            | Enable profile destinations. Default: `no`.                           |
| `ENABLE_WORKFLOW`                        | Enable workflows. Default: `yes`.                                     |
| `ENABLE_EVENT_VALIDATION`                | Enable event validation. Default: `yes`.                              |
| `ENABLE_EVENT_RESHAPING`                 | Enable event reshaping. Default: `yes`.                               |
| `ENABLE_EVENT_SOURCE_CHECK`              | Enable event source checking. Default: `yes`.                         |
| `ENABLE_IDENTIFICATION_POINT`            | Enable identification points. Default: `yes`.                         |
| `SYSTEM_EVENTS`                          | Enable system events. Default: `no`.                                  |
| `ENABLE_ERRORS_ON_RESPONSE`              | Enable errors on responses. Default: `yes`.                           |
| `ENABLE_FIELD_UPDATE_LOG`                | Enable field update logging. Default: `no`.                           |
| `DISALLOW_BOT_TRAFFIC`                   | Disallow bot traffic. Default: `yes`.                                 |
| `KEEP_PROFILE_IN_CACHE_FOR`              | Cache profile duration in seconds. Default: `3600`.                   |
| `KEEP_SESSION_IN_CACHE_FOR`              | Cache session duration in seconds. Default: `1800`.                   |
| `SKIP_ERRORS_ON_PROFILE_MAPPING`         | Skip errors on profile mapping. Default: `no`.                        |
| `NEW_COLLECTOR`                          | Use new event collector. Default: `yes`.                              |
| `SYNC_PROFILE_TRACKS_MAX_REPEATS`        | Maximum number of profile track sync retries. Default: `10`.          |
| `SYNC_PROFILE_TRACKS_WAIT`               | Wait time between profile track sync retries (seconds). Default: `1`. |
| `STORAGE_DRIVER`                         | Storage driver. Default: `elastic`.                                   |
| `LOGGING_LEVEL`                          | Application logging level. Default: `WARNING`.                        |
| `SERVER_LOGGING_LEVEL`                   | Server logging level. Default: `WARNING`.                             |
| `MULTI_TENANT`                           | Enable multi-tenant mode. Default: `no`.                              |
| `MULTI_TENANT_MANAGER_URL`               | URL for multi-tenant manager. Default: `None`.                        |
| `MULTI_TENANT_MANAGER_API_KEY`           | API key for multi-tenant manager. Default: `None`.                    |
| `EXPOSE_GUI_API`                         | Expose GUI API. Default: `yes`.                                       |
| `IMAGE_TAG`                              | Docker image tag. Default: `n/a`.                                     |
| `INSTALLATION_TOKEN`                     | Installation token. Default: `tracardi`.                              |
| `EVENT_PARTITIONING`                     | Event data partitioning frequency. Default: `quarter`.                |
| `PROFILE_PARTITIONING`                   | Profile data partitioning frequency. Default: `quarter`.              |
| `SESSION_PARTITIONING`                   | Session data partitioning frequency. Default: `quarter`.              |
| `ENTITY_PARTITIONING`                    | Entity data partitioning frequency. Default: `quarter`.               |
| `ITEM_PARTITIONING`                      | Item data partitioning frequency. Default: `year`.                    |
| `LOG_PARTITIONING`                       | Log data partitioning frequency. Default: `month`.                    |
| `DISPATCH_LOG_PARTITIONING`              | Dispatch log data partitioning frequency. Default: `month`.           |
| `CONSOLE_LOG_PARTITIONING`               | Console log data partitioning frequency. Default: `month`.            |
| `USER_LOG_PARTITIONING`                  | User log data partitioning frequency. Default: `year`.                |
| `FIELD_CHANGE_LOG_PARTITIONING`          | Field change log data partitioning frequency. Default: `month`.       |
| `AUTO_PROFILE_MERGING`                   | Auto profile merging token. Default: `s>a.d-kljsa87^5adh`.            |
| `APM`                                    | Enable Application Performance Monitoring (APM). Default: `yes`.      |
| `AUTOLOAD_PAGE_SIZE`                     | Page size for auto-load. Default: `25`.                               |
| `USE_X_FORWARDED_IP`                     | Use X-Forwarded-For header to get client IP. Default: `None`.         |
| `API_DOCS`                               | Enable API docs. Default: `yes`.                                      |
| `PERFORMANCE_TRACKING`                   | Enable performance tracking. Default: `None`.                         |
| `CONFIG`                                 | Path to configuration file. Default: `config.yaml`.                   |
| `INSTALLATION_TOKEN`                     | Installation token. Default: `tracardi`.                              |
