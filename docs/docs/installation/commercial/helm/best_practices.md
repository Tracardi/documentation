# Best Practices for Kubernetes Tracardi Installation

To ensure an efficient, scalable, and organized Tracardi setup in Kubernetes, here are some best practices regarding
namespaces, dependency management, and versioning.

### 1. Separate Namespace for Dependencies

- **Use dedicated namespaces** for Tracardi dependencies like **Pulsar, Elasticsearch, Redis, and MySQL**. For example:
    - `tracardi-pulsar`
    - `tracardi-elasticsearch`
    - `tracardi-redis`
    - `tracardi-mysql`
- **Benefits**: This organization enables consistent domain URLs for each dependency across Tracardi installations,
  allowing easier scaling and separation of resources.
- **Namespace Naming**: Prefixing these namespaces with `tracardi-` clearly indicates that these resources are intended
  specifically for Tracardi.

### 2. Separate Namespaces for Each Tracardi Version

- **Version-based Namespaces**: Deploy each Tracardi version in a separate namespace. For example:
    - `tracardi-101` for version 1.0.1
    - `tracardi-110` for version 1.1.0
- **Multiple Versions**: Tracardi is stateless, allowing multiple versions to run simultaneously. You can route data
  from different Tracardi versions to the same database, as long as they share the same major version and compatible
  database schema.
- **Advantages**: Running separate versions can aid in testing new versions without disrupting production services, and
  it makes rolling back to previous versions straightforward.

### 3. Separate Namespace for Ingress Routing

- **Public vs. Private API Routing**:
    - **Public APIs**: Use a different namespace, such as `tracardi-ingress` or `tracardi-routing`, for public API
      ingress configurations. This namespace handles routing traffic to the desired Tracardi version.
    - **Private APIs**: Configure private API ingress directly in the Helm chart within the Tracardi version namespace.
- **Benefits**: This setup allows for flexible routing changes. For instance, when upgrading, you can easily adjust the
  ingress configuration in `tracardi-ingress` to route traffic to the new version.

### Example Namespace Setup

Your namespaces could look as follows:

- **Dependencies**:
    - `tracardi-redis`
    - `tracardi-elasticsearch`
    - `tracardi-pulsar`
    - `tracardi-mysql`

- **Tracardi Versions**:
    - `tracardi-101` (for version 1.0.1)
    - `tracardi-110` (for version 1.1.0)

- **Ingress/Routing**:
    - `tracardi-ingress` or `tracardi-routing` (for public API routing configurations)

By following these best practices, you’ll achieve a scalable, modular Tracardi deployment that simplifies version
control, traffic routing, and dependency management within your Kubernetes environment.