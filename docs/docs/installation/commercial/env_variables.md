# Commercial Tracardi Env Variables

| **Environment Variable**                           | **Description**                                                                                                       |
|----------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `PRIMARY_ID`                                       | Primary identifier for data. Default: `data.identifier.pk`.                                                           |
| `PRIMARY_ID_AS_HASH`                               | Whether to treat the primary identifier as a hash. Default: `no`.                                                     |
| `EVENT_POOL`                                       | Size of the event pool. Default: `0`.                                                                                 |
| `EVENT_POOL_INACTIVITY`                            | Timeout for event pool inactivity (in seconds). Default: `5`.                                                         |
| `ASYNC_STORE_BUFFER_TIMEOUT`                       | Timeout for async store buffer (in milliseconds). Default: `1000`.                                                    |
| `PULSAR_HOST`                                      | Pulsar host address. Default: `pulsar://localhost:6650`.                                                              |
| `PULSAR_API`                                       | Pulsar API endpoint. Default: `http://localhost:8080`.                                                                |
| `PULSAR_AUTH_TOKEN`                                | Authentication token for Pulsar. Default: `None`.                                                                     |
| `PULSAR_TOPIC_TYPE`                                | Pulsar topic type. Default: `persistent`.                                                                             |
| `PULSAR_TENANT`                                    | Pulsar tenant name. Default: `tracardi`.                                                                              |
| `PULSAR_CLUSTER`                                   | Pulsar cluster name. Default: `standalone`.                                                                           |
| `PULSAR_DISABLED`                                  | Whether Pulsar is disabled. Default: `no`.                                                                            |
| `PULSAR_SYSTEM_NAMESPACE`                          | Pulsar system namespace. Default: `system`.                                                                           |
| `PULSAR_FUNCTION_TOPIC`                            | Pulsar function topic. Default: `functions`.                                                                          |
| `PULSAR_COLLECTOR_POOL`                            | Size of the Pulsar collector pool. Default: `1000`.                                                                   |
| `PULSAR_SERIALIZER`                                | Serializer format for Pulsar messages. Default: `json`.                                                               |
| `MAXMIND_HOST`                                     | MaxMind host. Default: `geolite.info`.                                                                                |
| `MAXMIND_LICENSE_KEY`                              | License key for MaxMind. Default: `None`.                                                                             |
| `MAXMIND_ACCOUNT_ID`                               | MaxMind account ID. Default: `0`.                                                                                     |
| `AUDIENCE_ESTIMATION_MAX_CARDINALITY_COUNT`        | Maximum cardinality count for audience estimation. Default: `100000`.                                                 |
