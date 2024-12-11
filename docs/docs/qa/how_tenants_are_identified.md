# How tenants are identified?

In version 1.1.1 of Tracardi, tenants are identified by their unique domains and associated API URLs. Each tenant is
assigned a unique name derived from the API domain, stripping away non-alphanumeric characters for simplicity. For
example, a tenant with the domain "company-x.tracardi.com" would have a tenant name of "companyx."

Additionally, there is another way to identify tenants and send data to a specific tenant: by including the tenant ID in
the header as `x-tenant`. This provides flexibility for integrations and custom setups. However, if both the domain-based
identification and the `x-tenant` header are provided, domain-based identification takes precedence as the primary method.

The tenant name or ID serves as a unique identifier and ensures isolated namespaces for data, maintaining separation and
privacy for each tenant. The setup process involves dedicated GUI and API URLs for each tenant, along with the use of an
installation token to securely verify and authorize their installation.

This dual approach allows multiple tenants to coexist within a single Tracardi instance while supporting diverse
integration needs. For scenarios requiring multiple instances, separate domains and Elasticsearch backends are used to
ensure scalability and robust tenant management.