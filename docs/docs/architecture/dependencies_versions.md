# Dependencies versions

The recommended versions of dependencies for running Tracardi are as follows:

1. **MySQL**: Tracardi generally requires MySQL version **8.0** as a metadata store. 

2. **Redis**: Redis **version 7.x** is typically recommended. 

3. **Apache Pulsar**: For message queuing, Tracardi is compatible with **Apache Pulsar version 3.0.2** or newer. Pulsar is used for high-throughput data ingestion and event handling.

4. **Elasticsearch**: Tracardi works best with **Elasticsearch version 7.x**. While Elasticsearch 8.x is working on our envs, 7.x is preferred for stability and compatibility.

Make sure to verify compatibility for your specific version of Tracardi, as dependency requirements can vary slightly between releases, especially with major updates.