# How to Configure Logging

This document explains how to configure logging levels in your application. Logging levels can be controlled using
environment variables or specified in a Helm chart for deployment.

## Environment Variables

There are three key environment variables that control logging:

1. **`TRACARDI_LOGGING_LEVEL`**
    - Defines what gets logged by the Tracardi application.

2. **`SERVER_LOGGING_LEVEL`**
    - Specifies the logging level for the Uvicorn server logs.

3. **`ELASTIC_LOGGING_LEVEL`**
    - Controls the logging level for Elasticsearch logs.

### Setting Logging Levels in Docker

To configure these logging levels in a Docker environment, set the corresponding environment variables in your
`docker-compose.yml` or as part of your Docker run command. For example:

```yaml
environment:
  - TRACARDI_LOGGING_LEVEL=INFO
  - SERVER_LOGGING_LEVEL=WARNING
  - ELASTIC_LOGGING_LEVEL=ERROR
```

Alternatively, using the `docker run` command:

```bash
docker run \
  -e TRACARDI_LOGGING_LEVEL=INFO \
  -e SERVER_LOGGING_LEVEL=WARNING \
  -e ELASTIC_LOGGING_LEVEL=ERROR \
  your-image-name
```

## Configuring Logging Levels in Helm Chart

Logging levels can also be configured when deploying the application with Helm. This is done by specifying the values in
the `values.yaml` file under the appropriate configuration section.

### Example `values.yaml` Configuration

#### For Private API:

```yaml
api:
  private:
    config:
      loggingLevel: "INFO"
      serverLoggingLevel: "WARNING"
      elasticLoggingLevel: "ERROR"
```

#### For Public API:

```yaml
api:
  public:
    config:
      loggingLevel: "INFO"
      serverLoggingLevel: "WARNING"
      elasticLoggingLevel: "ERROR"
```

### Applying the Configuration

After updating the `values.yaml` file, deploy or upgrade your Helm release to apply the changes:

```bash
helm upgrade --install <release-name> <chart-name> -f values.yaml
```

## Logging Levels

The following logging levels can be used:

- `DEBUG`: Detailed information, typically of interest only when diagnosing problems.
- `INFO`: Confirmation that things are working as expected.
- `WARNING`: An indication that something unexpected happened or indicative of some problem in the near future.
- `ERROR`: Due to a more serious problem, the software has not been able to perform some function.
- `CRITICAL`: A serious error, indicating that the program itself may be unable to continue running.

By configuring these levels appropriately, you can control the verbosity and focus of your application logs.

