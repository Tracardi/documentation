### Naming Convention for Pods in Tracardi

Tracardi uses a clear naming convention for its pods to indicate their roles, components, and technologies used. This
convention simplifies pod management by making it easy to identify each pod’s purpose within the system.

#### Naming Segments:

- **Prefix (`wk`, `fe`, `be`)**:
    - **`wk`**: Worker pod, handling background tasks and processes.
    - **`fe`**: Frontend pod, responsible for user interfaces.
    - **`be`**: Backend pod, handling API and other backend services.

- **Middle Segment (`pl`, `rj`, `fa`)**:
    - **`pl`**: Refers to **Pulsar**, indicating interaction with Apache Pulsar for messaging.
    - **`rj`**: Indicates a **ReactJS** application.
    - **`fa`**: Signifies a **FastAPI** application.

- **Suffix**: Specifies the exact function or role of the pod.

#### Examples of Pod Names:

1. **`wk-pl-background`**: A worker pod interacting with Pulsar, responsible for background tasks like data storage and
   dispatch.
2. **`wk-pl-collector`**: A worker pod for data processing in the collection stage.
3. **`wk-pl-workflow`**: A worker pod dedicated to managing workflows.
4. **`fe-rj-gui`**: A frontend pod for the GUI, built using ReactJS.
5. **`be-fa-public-api`**: A backend pod for the API, built with FastAPI.

This naming structure provides a consistent and organized way to manage pods in Tracardi, making it easy to locate and
understand each pod's role and associated technology stack.