# Sitemap

Fetches a list of URLs from a sitemap.

## Version

This documentation was created for the plugin version 1.0.3

## Description

The Sitemap plugin is designed to extract URLs from a given sitemap or a sitemap index. It takes a sitemap path as input and returns a list of URLs contained within that sitemap. This plugin can process nested sitemaps and follows the sitemap structure to provide a comprehensive list of URLs.

The plugin works as follows:

1. **Sitemap Path Input:** The plugin accepts a sitemap path provided via dot notation. This path should point to a URL where the sitemap can be accessed.
2. **Fetching Sitemap Content:** Using this URL, the plugin fetches the content of the sitemap. It supports both main sitemaps and sitemap indexes.
3. **Processing Sitemap:** The plugin processes the sitemap index to retrieve any nested sitemap URLs. For each nested sitemap, the URLs are extracted and combined into a single list.
4. **Returning the Result:** The plugin then returns all the URLs as a list.

If any error occurs during these steps, an error message will be returned.

## Inputs and Outputs

* **Input Port:** payload

  * Accepts a payload object. The input should contain the path to the sitemap in dot notation format. The sitemap path should be valid and accessible.

* **Output Ports:**

  * **Result (result):** Returns a dictionary containing the list of URLs fetched from the sitemap.

    Example Output:

    ```
    {
      "urls": [
        "https://example.com/page1",
        "https://example.com/page2"
      ]
    }
    ```

  * **Error (error):** Returns an error message if the plugin fails to fetch or process the sitemap.

    Example Output:

    ```
    {
      "message": "Error fetching sitemap: 404"
    }
    ```

## Configuration

*  **Sitemap Path (sitemap_path):**
   *  The URL where the sitemap can be found. The path must be specified using dot notation.
   * This value must not be empty.
 
## JSON Configuration

```
{
  "sitemap_path": "event@sitemap.url"
}
```

## Required resources

This plugin does not require external resources to be configured.

## Event prerequisites

This plugin works for all events and does not require synchronous execution.

## Errors

* "Sitemap path must not be empty."
  * This error occurs if the sitemap_path configuration is left blank.
* "Error fetching sitemap: [status code]"
  * This error occurs when the plugin fails to fetch the sitemap from the provided URL, usually due to an invalid or inaccessible URL.
* "Error processing sitemap index: [error details]"
  * This error occurs when the sitemap index cannot be processed due to issues with the XML structure.
* "Error processing sitemap: [error details]"
  * This error occurs if there is a problem parsing the XML content of the sitemap, often due to invalid or malformed XML.
