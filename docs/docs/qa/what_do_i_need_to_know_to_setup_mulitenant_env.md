# What do I neet to know to setup multitenant installation?

### Setting Up a Multitenant Installation

1. **Commercial Feature**: Multitenant installation is only available as a commercial feature.

2. **Configuration**: Set the `MULTI_TENANT = yes` variable in your environment or within the Helm chart values:
   ```yaml
   config:
     multiTenant:
       multi: "yes"
   ```

3. **Domain Requirement**: You need a domain connected to the Tracardi API. All subdomains must point to the Tracardi
   API.

4. **Kubernetes Ingress Setup**: Ensure that the ingress routes all subdomains to both the public and private Tracardi
   APIs:
   ```yaml
     private:
       replicas: 1
       service:
         port: 8686
       ingress:
         enabled: true
         host: "*.your-domain.com"
     public:
       replicas: 1
       service:
         port: 8585
       ingress:
         enabled: true
         host: "*.your-domain.com"
   ```

5. **Adding a Tenant**: Once Tracardi is installed, add a new tenant via the Tenant Management System (TMS) API.

### Creating a New Tenant via API

- **Prerequisites**: TMS API Key, generated during TMS installation.

- **API Endpoint**: Use the `POST` method to call `/tenant/install`.

- **Payload**:
   ```json
   {
     "name": "name-of-the-tenant",
     "tms_api_key": "TMS-API-KEY",
     "email": "tenant@email",
     "password": "Admin account password",
     "needs_admin": true,
     "update_mapping": false
   }
   ```

- **Example CURL Command**:
   ```bash
   curl -X POST \
     https://tracardi-api-url/tenant/install \
     -H 'Content-Type: application/json' \
     -d '{
       "name": "name-of-the-tenant",
       "tms_api_key": "TMS-API-KEY",
       "email": "tenant@email",
       "password": "Admin account password",
       "needs_admin": true,
       "update_mapping": false
     }'
   ```

### Result

A new tenant will be created with the specified name, which forms the subdomain for the
tenant (`name-of-the-tenant.your-domain.com`). An admin account will also be created.

After adding a tenant, use the private API (port 8686) to manage the tenant.

### Domain and Tenant Mapping

The tenant's ID becomes part of the subdomain URL and is used to identify the appropriate namespace for the tenant. The
tenant API must be accessed through a subdomain.