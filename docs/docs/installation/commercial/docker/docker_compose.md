# Tracardi Commercial Installation Guide

This guide describes how to install and run the **commercial version of Tracardi** using Docker. It includes details about all containers, their dependencies, and which ports are exposed for external access.

---

## 1. Prerequisites

Before you begin, ensure you have:

* **Docker** (≥ 20.x)
* **Docker Compose** (≥ 1.27)
* A valid **Docker Hub token** (provided by Tracardi team)
* A valid **commercial license key**

---

## 2. Log in to Docker Hub

Commercial images are private and require authentication.

```bash
docker login -u tracardi -p <dockerhub-token>
```

Replace `<dockerhub-token>` with the token provided to you.

---

## 3. Create Docker Network

Tracardi services communicate through a dedicated network:

```bash
docker network create tracardi-network
```

---

## 4. Clone Tracardi API Repository

Get the Tracardi source code and switch to the **1.1.x** branch:

```bash
git clone https://github.com/Tracardi/tracardi-api.git
cd tracardi-api
git checkout 1.1.x
```

---

## 5. Start Dependent Services

Tracardi requires supporting services such as **Elasticsearch**, **Redis**, **Apache Pulsar**, and optionally **MySQL**. Start them with:

```bash
docker compose -f com-dep-docker-compose.yaml up
```

This launches all necessary dependencies for Tracardi to function.

---

## 6. Configure License

Edit the file `com-app-docker-compose.yaml`. Find this section:

```yaml
x-license: &license
  LICENSE: "paste-you-license-here"
```

Replace `"paste-you-license-here"` with the license key you received.

---

## 7. Start Tracardi Application

Run the Tracardi services:

```bash
docker compose -f com-app-docker-compose.yaml up
```

---

## 8. Services Overview

Here is a breakdown of each service defined in `com-app-docker-compose.yaml`:

### 1. **tracardi-apm**

* **Image**: `tracardi/apm:1.1.10`
* **Role**: Background worker for analytics and monitoring.
* **Environment**: Connects to Elasticsearch, Redis, Pulsar, and MySQL.
* **Ports**: *Not exposed externally*.
* **Network**: `tracardi-network`

---

### 2. **tracardi-private-api**

* **Image**: `tracardi/com-tracardi-api:1.1.10`
* **Role**: Private API (used by GUI and internal services).
* **Ports**:

  * `8686:80` → Accessible locally at [http://localhost:8686](http://localhost:8686)
* **Dependencies**:

  * Redis
  * Elasticsearch
  * Apache Pulsar
  * MySQL

---

### 3. **tracardi-public-api**

* **Image**: `tracardi/com-tracardi-api:1.1.10`
* **Role**: Public API (production-ready endpoints, GUI access disabled).
* **Ports**:

  * `8585:80` → Accessible locally at [http://localhost:8585](http://localhost:8585)
* **Dependencies**:

  * Redis
  * Elasticsearch
  * Apache Pulsar
  * MySQL

---

### 4. **tracardi-background-worker**

* **Image**: `tracardi/background-worker:1.1.10`
* **Role**: Handles asynchronous background tasks (workflows, profile updates, etc.).
* **Ports**: *Not exposed externally*.
* **Dependencies**: Redis, Elasticsearch, Pulsar, MySQL

---

### 5. **tracardi-gui**

* **Image**: `tracardi/tracardi-com-gui:1.1.10`
* **Role**: Web-based graphical user interface (GUI) for Tracardi.
* **Ports**:

  * `8787:80` → Accessible at [http://localhost:8787](http://localhost:8787)
* **Dependencies**: `tracardi-private-api`

---

## 9. Exposed Ports Summary

| Service                 | Port (Host\:Container) | Access URL                                     | Purpose                           |
| ----------------------- | ---------------------- | ---------------------------------------------- | --------------------------------- |
| tracardi-private-api    | 8686:80                | [http://localhost:8686](http://localhost:8686) | Private API with GUI support      |
| tracardi-public-api     | 8585:80                | [http://localhost:8585](http://localhost:8585) | Public API (production endpoints) |
| tracardi-gui            | 8787:80                | [http://localhost:8787](http://localhost:8787) | Web GUI                           |

Other services (workers, APM) run internally without exposed ports.

---

## 10. Verify Installation

After all containers are up:

1. Open [http://localhost:8787](http://localhost:8787) → GUI should be accessible.
2. APIs:

   * Private API: [http://localhost:8686/docs](http://localhost:8686/docs)
   * Public API: [http://localhost:8585/docs](http://localhost:8585/docs)



!!! Note

    To run docker compose in the background add `-d` to the command above.

!!! Warning

    Tracardi, to operate with its full range of features, requires the presence of specific crontab jobs. 
    It's important to note that when using Docker Compose, these crontab jobs are not automatically included as 
    part of the setup. Therefore, to ensure that Tracardi functions as intended, it is essential to perform an 
    additional crontab installation.

## Upgrading docker compose

1. **Stopping Docker Compose**

   Prior to upgrading, ensure that your Docker Compose configuration is not running. Execute the following command in your terminal:

   ```bash
   docker compose down
   ```

2. **Pulling New Images**

   To upgrade to the latest version, fetch the latest Docker images for the components. Run the following commands in your terminal:

   ```bash
   docker pull tracardi/tracardi-api:1.1.10
   docker pull tracardi/tracardi-gui:1.1.10
   docker pull tracardi/update-worker:1.1.10
   docker pull tracardi/com-tracardi-api:1.1.10
   docker pull tracardi/amp:1.1.10
   docker pull tracardi/tms:1.1.10
   docker pull tracardi/background-worker:1.1.10
   docker pull tracardi/init:1.1.10
   ```
   
This upgrades images to tag 1.1.10

## Handling Errors

If you encounter errors while bringing up the upgraded Docker Compose setup, it might be necessary to address these
errors by deleting certain components. Follow the steps below:

- To stop all running containers (make sure that there are no other container running but the tracardi containers),
  execute:

  ```bash
  docker kill $(docker ps -q)
  ```

- To delete unused containers, volumes, images, and networks, run:

  ```bash
  docker container prune
  docker volume prune
  docker image prune
  docker network prune
  ```
   