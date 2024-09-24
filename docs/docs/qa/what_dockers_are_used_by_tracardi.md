# What dockers are used by tracardi?

The Docker images used by Tracardi are as follows:

1. **Tracardi API**:
    - **Repository**: `tracardi/com-tracardi-api`
    - This image is used for both the **private** and **public** APIs of Tracardi.
    - Private API interacts with the GUI, while the public API handles data collection.

2. **Tracardi GUI**:
    - **Repository**: `tracardi/tracardi-gui`
    - This image provides the graphical user interface (GUI) for interacting with Tracardi.

3. **Tracardi TMS (Tenant Management Service)**:
    - **Repository**: `tracardi/tms`
    - This Docker image manages multi-tenancy within the system.

4. **Workers**:
    - **Background Worker**:
        - **Repository**: `tracardi/background-worker`
        - Responsible for collecting data in parallel. THis is the main background process.
        
    - **APM (Auto Profile Merging)**:
        - **Repository**: `tracardi/apm`
        - Responsible for merging profiles
        
    - **Upgrade Worker**:
        - **Repository**: `tracardi/update-worker`
        - Responsible for updating tracardi
        

5. **Bridge (Optional)**:
    - **Repository**: `tracardi/com-bridge-queue`
    - This is used for collecting data from different channels via a queue bridge, but it is disabled by default.

These Docker images are pulled from Docker Hub, with specific configurations for each service, depending on whether it
is enabled and how many replicas are required.