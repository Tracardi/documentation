# Helm-Based Production Installation

## Remark

Before you begin installing Tracardi, decide whether to install the dependencies inside or outside the Kubernetes (k8s)
cluster. If you choose to install them inside the cluster this guide may assist you with the setup:

* [Elasticsearch K8S Helm Chart installation](../../dependencies/helm/elasticsearch.md)
* [Redis K8S Helm Chart  installation](../../dependencies/helm/redis.md)
* [Apache Pulsar doK8S Helm Chart cker installation](../../dependencies/helm/pulsar.md)
* [Mysql K8S Helm Chart  installation](../../dependencies/helm/mysql.md)

Otherwise, refer to the Dependencies Installation Manuals for detailed instructions.

For commercial installation using helm charts, follow these steps:

* **[Installation via Helm Chart version 0.8.2](helm_082.md)**
* **[Installation via Helm Chart version 0.9.0](helm_090.md)**
* **[Installation via Helm Chart version 1.0.0](helm_100.md)**
* **[Installation via Helm Chart version 1.1.0](helm_110.md)**

# What you need to know to troubleshoot the installation

* [Data Collection and Processing in Tracardi v1.0.0](../data_flow_100.md)
* [Data Collection and Processing in Tracardi v1.1.0](../data_flow_110.md)

# Best practices

* [Best practices in Helm Chart installation](best_practices.md)