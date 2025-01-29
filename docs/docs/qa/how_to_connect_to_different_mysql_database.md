# How to connect to different database then the one in docker compose?

To connect Tracardi to a different MySQL database instead of the default one in Docker Compose, you need to configure
the appropriate environment variables. Tracardi uses MySQL for storing metadata (configuration, workflow definitions,
etc.), while event data is stored in Elasticsearch.

### **Configuring Tracardi to Use a Different MySQL Database**

Tracardi allows you to override the default database settings using the following environment variables:

| **Environment Variable** | **Description**               | **Default Value**   |
|--------------------------|-------------------------------|---------------------|
| `MYSQL_HOST`             | MySQL host                    | `localhost`         |
| `MYSQL_USERNAME`         | MySQL username                | `root`              |
| `MYSQL_PASSWORD`         | MySQL password                | `root`              |
| `MYSQL_SCHEMA`           | MySQL schema for async driver | `mysql+aiomysql://` |
| `MYSQL_PORT`             | MySQL port                    | `3306`              |
| `MYSQL_DATABASE`         | MySQL database name           | `tracardi`          |

### **Running Tracardi with a Custom MySQL Database**

You can use the following **Docker run** command to start Tracardi with a custom MySQL database:

```bash
docker run -d \
  -e MYSQL_HOST=my-database-host \
  -e MYSQL_USERNAME=my-username \
  -e MYSQL_PASSWORD=my-password \
  -e MYSQL_PORT=3306 \
  -e MYSQL_DATABASE=my-database-name \
  tracardi/tracardi-api:<version>
```

Replace:

- `my-database-host` with your MySQL server address.
- `my-username` and `my-password` with the correct credentials.
- `my-database-name` with the database you want to use.

### **Important Considerations**

1. **MySQL is only for metadata** – Large datasets like profiles and events should **not** be stored in MySQL. Tracardi
   is designed to store high-volume data in **Elasticsearch**.
2. **Profile Data Storage Alternative** – If your traffic is low and you want to store profile-related data in MySQL,
   you should use **destinations** to send data to an external MySQL database.

### **Storing Data in MySQL Using Destinations**

If you want to store profile-related data in MySQL, you can use **destinations** in Tracardi. Destinations allow you to
forward processed data to external storage, including MySQL databases. To achieve this, you need to configure a **API
destination** and map the necessary data fields. This ensures that Tracardi processes the incoming events and
selectively sends data to API which should store the data in MySQL. This approach is useful when dealing with low
traffic or when you need structured data storage alongside Tracardi’s primary event-driven architecture.