# Helm-Based Production Installation

Helm is a package manager for Kubernetes that makes deploying applications easier and more consistent. It uses
charts—predefined templates—to install and configure apps.

For Tracardi, Helm simplifies the setup by managing all required components (like Redis or Elasticsearch) with a single
command. It ensures everything is correctly configured, versioned, and easy to update or roll back—perfect for running
Tracardi in Kubernetes.

## Remark

Before you begin installing Tracardi, decide whether to install the dependencies inside or outside the Kubernetes (k8s)
cluster. If you choose to install them inside the cluster this guide may assist you with the setup:

* [Elasticsearch K8S Helm Chart installation](../../dependencies/helm/elasticsearch.md)
* [Redis K8S Helm Chart  installation](../../dependencies/helm/redis.md)
* [Apache Pulsar docker K8S Helm Chart installation](../../dependencies/helm/pulsar.md)
* [Mysql K8S Helm Chart  installation](../../dependencies/helm/mysql.md)

Otherwise, refer to the Dependencies Installation Manuals for detailed instructions.

## TLDR

For impatient devops:

* **[Tracardi Commercial Installation (Quick Start Guide)](tldr.md)**

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