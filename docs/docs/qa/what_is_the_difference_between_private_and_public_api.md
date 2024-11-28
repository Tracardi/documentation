# What is the difference between Public and Private API?

The difference between private and public APIs isn’t about the code—they share the same foundation—but rather about
which endpoints are available and who they’re meant for.

### Public API

A **public API** is designed to be used externally, like collecting data from websites or integrating third-party
systems. For example, you might embed a JavaScript snippet on your website that sends user interaction data to the
public API. It exposes only endpoints that are safe for public use, such as `/track` for data collection. Think of it as
the front door—open to the outside world but only to specific rooms.

### Private API

A **private API** is meant for internal use, like managing resources or handling advanced queries. It does not mean it
have to be kept private, but it is better to have restricted access to it if possible. It includes endpoints
for tasks like retrieving detailed data or configuring the system. This API is typically locked down within your
internal network to ensure security. It’s like a staff-only area—where you can access everything needed to run the show,
but it’s not open to guests.

### Shared Foundation, Different Roles

Both APIs run on the same code and can collect data. The distinction lies in which endpoints are exposed and who gets
access. The public API focuses on external data collection, while the private API supports internal operations and
management. Together, they provide flexibility to meet different needs without duplicating effort.

The difference between private and public APIs in Tracardi extends beyond their intended audience to their configuration, security, and use cases:

### Key Characteristics

#### Public API:
1. **Usage**:
   - Exposed for external interaction, primarily for integrating Tracardi with third-party systems or directly collecting data.
   - Commonly used for embedding JavaScript collector scripts on web pages to send data to Tracardi.

2. **Configuration**:
   _- Configured to provide access to endpoints that are safe for external exposure.
   - Focused on endpoints like `/track`, which allows seamless data collection without exposing sensitive operations.

3. **Scaling and Deployment**:
   - Ideal for front-facing integration scenarios, allowing it to be scaled independently to handle data collection traffic.

---

### Usage Scenarios

#### Scenario 1: Data Collection from Web Pages
- Use the **Public API** to expose the `/track` endpoint for embedded javascript on your web pages.
- Keeps sensitive management endpoints hidden while enabling data capture from users.

#### Scenario 2: Internal Middleware Collection
- Use either **Private API** or **Public API** if another middleware collects data and forwards it to Tracardi.It does not matter as it is available only in safe environment.
- This configuration minimizes external exposure while leveraging the same robust collection capabilities.

#### Scenario 3: System Management and Control
- Only **Private API** can handle administrative tasks, such as managing workflows, retrieving profiles, and controlling Tracardi resources.
- If you have custom GUI **Private API** may need to be exposed to the Internet if you do not have you own API.

#### Scenario 4: Hybrid Deployment
- Use the **Public API** as the entry point for data collection from webpage or middleware.
- Use the **Private API** for internal operations and management in secure environment.
- Scale each independently using Kubernetes affinities or other deployment strategies to optimize system performance and resource usage.

---

### Key Takeaways
- The APIs share the same code but differ in endpoint availability and intended exposure.
- The **Public API** is designed for safe external use, while the **Private API** caters to internal administrative needs.
- This separation supports flexible scaling and robust security, allowing you to optimize your Tracardi deployment for different use cases._