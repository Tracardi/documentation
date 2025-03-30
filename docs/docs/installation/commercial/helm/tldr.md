# Tracardi Commercial Installation (Quick Start Guide)

This guide will help you perform a fast commercial installation of Tracardi on a Kubernetes (K8s) cluster.

---

## Prerequisites

Before proceeding, ensure you have the following:

- A **DockerHub access token** (provided by the Tracardi vendor)
- A **gzipped Helm chart** (`.tgz`) of the Tracardi application

---

## Installing Dependencies

We recommend that your team installs dependencies manually to better understand the system configuration and behavior. However, if you want to get up and running quickly, you can request pre-packaged `.zip` files from the vendor—one for each dependency. These include short installation scripts for deploying each component into your K8s cluster.

Once you receive the packages:

1. Unzip the files
2. Follow the instructions provided in each dependency’s guide:

   * [Elasticsearch Helm Chart Installation](../../dependencies/helm/elasticsearch.md)
   * [Redis Helm Chart Installation](../../dependencies/helm/redis.md)
   * [Apache Pulsar Helm Chart Installation](../../dependencies/helm/pulsar.md)
   * [MySQL Helm Chart Installation](../../dependencies/helm/mysql.md)

---

## Configuration File

After installing the dependencies, create a YAML configuration file (e.g., `values.yaml`) for your installation. Below is a list of values that **must be replaced** with your own infrastructure and credentials:

### Values to Replace

| Path                          | Description                                                                 |
|-------------------------------|-----------------------------------------------------------------------------|
| `elastic.host`                | Hostname of your Elasticsearch service                                     |
| `redis.host`                  | Hostname of your Redis instance                                            |
| `pulsar.host`                 | Internal Pulsar service address (binary protocol)                          |
| `pulsar.api`                  | Internal Pulsar HTTP API endpoint                                          |
| `mysql.host`                  | Hostname of your MySQL service (e.g., Percona cluster)                     |
| `tmsApi.host`                 | Hostname of your internal TMS API service                                  |
| `secrets.installation.token` | Token provided by Tracardi vendor for installation                         |
| `secrets.dockerHub`           | DockerHub organization/repo name (usually `tracardi-dockerhub`)            |
| `secrets.license.licenseKey` | Your Tracardi license key (commercial)                                     |
| `secrets.tms.secretKey`      | TMS internal secret key for secure communication                           |
| `secrets.tms.apiKey`         | API key used for authenticating with TMS                                   |
| `secrets.redis.password`     | Password for connecting to Redis                                           |
| `secrets.pulsar.token`       | Pulsar access token                                                        |
| `secrets.mysql.username`     | MySQL username (e.g., `root`)                                              |
| `secrets.mysql.password`     | MySQL user password                                                        |
| `config.primaryId`           | Primary profile ID prefix, often based on domain or project (e.g., `emm-`) |

> ⚠️ **Note:** If your services are running outside the Kubernetes cluster, update hostnames accordingly to point to the external services.

### Example `values.yaml`

```yaml
# Dependencies
elastic:   
  host: elastic-std-svc.elastic-standalone.svc.cluster.local
  schema: http
  authenticate: true

redis:
  host: redis-master.redis.svc.cluster.local
  schema: "redis://"
  authenticate: true

pulsar:
  host: pulsar-proxy.pulsar.svc.cluster.local:6650
  api: http://pulsar-proxy.pulsar.svc.cluster.local:80
  schema: "pulsar://"
  authenticate: true

mysql:
  host: percona-db-pxc-db-haproxy.percona.svc.cluster.local
  schema: "mysql+aiomysql://"
  database: "tracardi"

tmsApi:
  host: be-fa-tms-svc.tracardi-com-090.svc.cluster.local

# Secrets
secrets:
  installation:
    token: "XXXX"
  dockerHub: "tracardi-dockerhub"
  license:
    licenseKey: "XXXX"
  tms:
    secretKey: "XXXX"
    apiKey: "XXXX"
  redis:
    password: "XXXX"
  pulsar:
    token: "XXXX"
  mysql:
    username: "root"
    password: "XXXX"

# Networking
digitalOcean:
  loadBalancer: true

# Configuration
config:
  multiTenant:
    multi: "yes"
  primaryId: "emm-"  # Set this only once during installation.

# Images and Versions
api:
  image:
    tag: 1.1.6
  private:
    replicas: 1
    service:
      port: 8686
  public:
    replicas: 1
    service:
      port: 8585

gui:
  image:
    tag: 1.1.6
  console:
    service:
      port: 8787
    config:
      mode: "no-deployment"
      allowUpdatesOnProduction: "true"

tms:
  image:
    tag: 1.1.6
  docker:
    replicas: 1
    service:
      port: 8383

# Workers
worker:
  background:
    enabled: true
    image:
      tag: 1.1.6
    replicas: 1

  apm:
    image:
      tag: 1.1.6
    profile:
      enabled: true
      replicas: 1

  upgrade:
    image:
      tag: 1.1.6
    docker:
      enabled: true
      replicas: 1
```

---

## Installing the Tracardi Helm Chart

Once your `values.yaml` file is ready and you’ve received the Helm chart archive (`tracardi-chart-1.1.6.tgz`), follow these steps:

### 1. Create or Use a Namespace

Create a dedicated namespace if it doesn’t exist yet:

```bash
kubectl create namespace tracardi
```

### 2. Run Helm Install Command

Use the following command to deploy the chart:

```bash
helm install tracardi \
  ./tracardi-chart-1.1.6.tgz \
  -f values.yaml \
  --namespace tracardi
```

### To Upgrade Later

If you update `values.yaml` or receive a new version of the chart, you can upgrade your deployment:

```bash
helm upgrade tracardi \
  ./tracardi-chart-1.1.6.tgz \
  -f values.yaml \
  --namespace tracardi
```

### To Uninstall

To remove the deployment:

```bash
helm uninstall tracardi --namespace tracardi
```