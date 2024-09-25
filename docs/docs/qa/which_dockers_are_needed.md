# Which dockers are needed for single and multitenant installation?

For a **single-tenant installation**, the following Docker containers must be enabled:

1. **Tracardi API**:
    - **Private API**: Required for communication with the GUI.
    - **Public API**: Required for data collection.

2. **Tracardi GUI**:
    - The graphical user interface must be enabled to interact with the system.

3. **Worker Services**:
    - **Background Worker**: Handles background tasks like message bulking.
    - **APM (Auto Profile Merging)**: Manages profile merging.

4. **TMS (Tenant Management Service)**:
    - **Not required** in a single-tenant installation.

---

For a **multi-tenant installation**, the following Docker containers must be enabled:

1. **Tracardi API**:
    - **Private API**: Required for GUI communication.
    - **Public API**: Required for data collection.

2. **Tracardi GUI**:
    - The GUI must be enabled for tenant interaction.

3. **Worker Services**:
    - **Background Worker**: Handles background tasks like bulking.
    - **APM (Auto Profile Merging)**: Manages profile merging across tenants.

4. **TMS (Tenant Management Service)**:
    - **Required** to manage multiple tenants.

# How to enable multitenant installation?

To enable a multi-tenant installation of Tracardi using Docker and Helm chart, you will need to perform the following
steps based on the guidelines provided in the documentation:

### Multi-Tenant Setup with Docker:

1. **Install the Tenant Management System (TMS)**:
    - TMS is required to manage tenants in a multi-tenant setup.
    - Run the TMS `tracardi/tms:<latest-version>`
   ```

2. **Enable Multi-Tenancy in Tracardi**:
    - Multi-tenancy should be enabled in the `values.yaml` or the `.env-docker` configuration.
    - Modify the configuration to set multi-tenant mode by adding:

   ```yaml
   config:
     multiTenant:
       multi: "yes"
   ```

### Multi-Tenant Setup with Helm Chart:

1. **Prerequisites**:
    - You will need Helm and Kubernetes (K8s) to proceed with the multi-tenant installation.
    - Ensure you have the following dependencies installed:
        - MySQL
        - Elasticsearch
        - Redis
        - Apache Pulsar
    - These services should be set up in their own namespaces as recommended for managing upgrades and isolation.

2. **Customize `values.yaml` for Multi-Tenancy**:
    - You need to customize the `values.yaml` file for the multi-tenant installation. Key settings for enabling
      multi-tenancy are as follows:

   ```yaml
   config:
     multiTenant:
       multi: "yes"  # Enable multi-tenancy
   ```

3. **Install TMS and Configure API/GUI**:
    - Configure the TMS and install it using the Helm chart or Docker as described above for Docker installation.
    - Ensure that both the Public API (for data collection) and Private API (for communication with the GUI) are
      configured to handle multi-tenancy. Use the following structure for your `values.yaml`:

   ```yaml
   api:
     private:
       enabled: true
       replicas: 1
       service:
         port: 8686
     public:
       enabled: true
       replicas: 1
       service:
         port: 8585
   ```

4. **Run the Installation**:
    - After making the necessary modifications, you can deploy the Tracardi multi-tenant setup using Helm:

   ```bash
   helm install tracardi -f values.yaml <path-to-helm-chart>
   ```
