# How to disable pulsar

To disable Pulsar in Tracardi using environment variables, you can follow these steps:

1. **Locate the Environment Variables**: In your deployment configuration (e.g., Docker Compose, Kubernetes, or a
   similar setup), identify where the environment variables are defined for Tracardi.

2. **Disable Pulsar**: Set the `PULSAR_DISABLED` environment variable to `yes`. If this variable is not explicitly
   defined, you can add it.

   Here is an example of how to set this in different environments:

   **For Docker Compose**:
   ```yaml
   environment:
     - PULSAR_DISABLED="yes"
   ```

   **For Kubernetes** (in a Pod spec or Deployment YAML):
   ```yaml
   env:
     - name: PULSAR_DISABLED
       value: "yes"
   ```

3. **Remove or Clear Pulsar-Related Variables**: Optionally, you can clear or remove other Pulsar-related environment
   variables like `PULSAR_HOST` and `PULSAR_API` to ensure that Pulsar is fully disabled.

4. **Restart the Services**: After updating the environment variables, make sure to restart your Tracardi services to
   apply the changes.

By setting `PULSAR_DISABLED` to `yes` and ensuring that other Pulsar-related variables are not set or are empty, Pulsar
will not be used in your Tracardi environment.