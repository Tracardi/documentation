# Changing Partitioning in Tracardi

Partitioning in Tracardi divides data (events, profiles, sessions) into smaller, manageable chunks based on time
periods. This improves performance, facilitates data management, and can optimize storage and retrieval operations.

## Using Environment Variables

Set these variables in your deployment or Docker setup:

- `EVENT_PARTITIONING`
- `PROFILE_PARTITIONING`
- `SESSION_PARTITIONING`

Values: `day`, `week`, `month`, `quarter`, `year`

Example in docker-compose.yml:

```yaml
services:
  tracardi-api:
    environment:
      - EVENT_PARTITIONING=quarter
      - PROFILE_PARTITIONING=quarter
      - SESSION_PARTITIONING=quarter
```

Apply by restarting the service.

## Using Helm Chart

Edit `values.yaml`:

```yaml
api:
  private:
    config:
      eventPartitioning: "quarter"
      profilePartitioning: "quarter"
      sessionPartitioning: "quarter"
  public:
    config:
      eventPartitioning: "quarter"
      profilePartitioning: "quarter"
      sessionPartitioning: "quarter"
```

Apply changes by re-deploying Tracardi API services.
