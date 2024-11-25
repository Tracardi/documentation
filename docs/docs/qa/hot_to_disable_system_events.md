# How to Disable System Events?

It depends on your installation type. We have 2 options.

## **1. Helm Chart Configuration**

To disable system events in a deployment using Helm charts, follow these steps:

1. Locate the `config` section in your Helm chart configuration file.
2. Update the configuration for `systemEvents` by modifying the values as shown below:

```yaml
config:
  systemEvents:
    # Enable or disable system events
    enabled: "no"
```

- **Key settings:**
    - `enabled: "no"` disables system events.

Ensure the `enabled` key is explicitly set to `"no"` to turn off system events.

---

## **2. Docker Deployment**

For deployments using Docker, you can disable system events via an environment variable:

- Set the `SYSTEM_EVENTS` variable to `no` in your Docker configuration. Example:

```bash
SYSTEM_EVENTS=no
```

- Update your Docker Compose file or pass the variable during container runtime using the `-e` flag:

```bash
docker run -e SYSTEM_EVENTS=no tracardi/tracardi-api:version
```

