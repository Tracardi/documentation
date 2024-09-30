# How tenants are verified? What is the process of verifying a tenant in Tracardi?

Each tenant in Tracardi has its own unique API URL for every tenant. The first part of the URL represents the tenant's
ID. Tracardi extracts this tenant ID from the URL and validates its existence in the Tenant Management System (TMS). Once verified,
the tenant can be installed. If an API URL for a non-existent tenant is used to collect data, the system will return a
message indicating that the tenant does not exist, as it will not find the tenant's data namespace.

Only installed tenant APIs can collect data.