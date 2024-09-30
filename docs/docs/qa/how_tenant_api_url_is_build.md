# How tenants API URL is build and used?

The tenant domain in Tracardi is primarily constructed using the **UUID** of the tenant, which is assigned during the
tenant creation process. Here's a detailed explanation:

1. **Tenant Creation**:
    - Tenant Management System (TMS) is used to add new tenants. There is an API that can be used to add tenant. In its
      payload there will be id and name of the tenant.
    - When a tenant is created in Tracardi, it is assigned an **ID**, typically a UUID (
      e.g., `ae7a182a-534f-43af-8d75-810dd9cdb4b5`) or it's shorter version.
    - This ID is used for internal identification, but it also plays a crucial role in constructing the domain for the
      tenant.
    - ID can be any string.

2. **DNS Structure**:
    - The domain for each tenant follows this pattern: `<tenant-ID>.<your-domain>`. For example, if your domain
      is `domain.com` and the tenant ID is `ae7a182a`, the tenant's domain would be:  
      `ae7a182a.domain.com`.
    - This domain is used by the Tracardi Private API and the GUI to interact with the tenant-specific services.

3. **Wildcard DNS**:
    - A wildcard DNS should be set up, e.g `*.domain.com`, which allows any subdomain (
      representing different tenants) to be handled y the same tracardi API.
    - However, in some environments, this might not be feasible, and each tenant might need its own DNS
      entry (e.g., `ae7a182a.otherdomain.com`).

4. **Separation of Tenants**:
    - The use of UUIDs in the domain is intentional, to ensure that each tenant is separated and isolated from others,
      preventing one tenant's API from being accessed by another tenant.

5. **Naming**:
    - The **name** field, in TMS create tenant API is primarily for human-readable purposes. It does not form the
      domain; the domain is based on the tenant ID.
    - The tenant name is useful for identification within dashboards, logs, and configurations, but the ID is what
      governs the domain structure.

6. **Installation Token**:
    - The tenant creation process also generates an installation token, which is used to validate and complete the setup
      of the tenant on the Tracardi Private API.

