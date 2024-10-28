
# Write Local Database

The Write Local Database plugin upserts documents into a specified index in an Elasticsearch instance. It allows you to specify an index, documents and an optional identifier to support unique document identification.

## Version

This documentation was created for plugin version 1.0.3.

## Description

The Write Local Database plugin is designed to upsert data into a specified Elasticsearch index. This plugin provides flexible document insertion and updating, utilizing an identifier to manage unique records.

The plugin performs the following steps:

1. **Payload Extraction:** The plugin uses dot notation paths to extract configuration parameters, including the index, documents, and identifier, from the input payload.
2. **Document Preparation:** The documents can be passed either as a JSON string or an array. If an identifier is provided, it assigns a unique `_id` to each document based on the identifier value.
3. **Bulk Upsert Operation:** Using Elasticsearch’s bulk upsert, the plugin inserts or updates the specified documents in the defined index.
4. **Error Handling:** Any errors encountered during these steps are logged and returned via the error port.

## Inputs and Outputs

### Input Port: `payload`

  - Accepts a payload object containing paths to the index, documents and identifier values. Dot notation paths should be used to specify the location of each in the payload.

### Output Ports

  - **Result (result):** Returns a dictionary with the result of the upsert operation.

    **Example Output:**

    ```json
    {
      "result": {
        "inserted": 10,
        "updated": 5,
        "errors": []
      }
    }
    ```

  - **Error (error):** Returns an error message if an issue occurs during the upsert process.

    **Example Output:**

    ```json
    {
      "message": "Error while upserting data: Invalid index name"
    }
    ```

## Configuration

- **Elasticsearch Resource (source):**
  - Required: Yes
  - Select your Elasticsearch resource from available connections.

- **Index (index):**
  - Required: Yes
  - Define the index where the documents will be upserted. This value is specified using dot notation.

- **Documents (documents):**
  - Required: Yes
  - The documents to be upserted. This value is specified using dot notation and should point to a JSON string or list.

- **Identifier (identifier):**
  - Optional
  - A unique key used for document upsertion. If provided, each document in the array will be assigned an `_id` based on this identifier.

## JSON Configuration Example

```json
{
  "source": "elasticsearch-resource",
  "index": "event@data.index",
  "documents": "event@data.documents",
  "identifier": "event@data.identifier"
}
```

## Required Resources

This plugin requires an Elasticsearch resource configured within the platform.

## Event Prerequisites

This plugin can be used with any event that includes data structured for indexing in Elasticsearch.

## Errors

-   **"Index cannot be empty."**
    
    -   Occurs if the index value is not provided or accessible in the payload.
-   **"Document list is invalid or cannot be parsed."**
    
    -   Occurs if the document configuration is not a valid JSON or array.
-   **"Error upserting documents: [error details]"**
    
    -   Occurs if there is an issue during the Elasticsearch bulk upsert operation, commonly due to configuration or data issues.
