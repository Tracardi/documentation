# Beautiful Soup

Converts HTML to text using the BeautifulSoup python library.

## Version
This documentation is for the plugin version 1.0.4.

## Description
The Beautiful Soup plugin processes HTML content using the BeautifulSoup library and extracts text from it. The plugin takes an HTML content (specified via dot notation) and applies the BeautifulSoup `get_text` method to extract all text from the HTML content. It can be configured to use other BeautifulSoup methods in the future by extending the available methods.

The plugin works as follows:

1. **HTML Input:** The plugin accepts a HTML content.
2. **Method:** The plugin uses the `BeautifulSoup` library to parse the HTML and apply the specified method (currently only `get_text`) to extract plain text.
3. **Returning the Result:** The plugin returns the extracted text or an error message if it encounters issues.

If an error occurs during any of these steps, the plugin will return an error message describing the issue.

## Inputs and Outputs

### Input Port:

- **Payload**  
  Accepts a payload object that contains the HTML content to be processed. The HTML content should be specified via dot notation.

### Output Ports:

- **Result (result):**  Returns a dictionary containing the extracted text from the HTML.  

  Example Output:
  ```
  {
    "text": "This is the extracted text from the HTML."
  }

- **Error (error):**: Returns an error message if the plugin encounters any issues.

  Example Output:
  ```
  {
    "message": "Error: The HTML is empty."
  }
  ```

## Configuration

* **HTML (html):**

  * The path to the HTML content to be processed. This must be provided as a dot notation path to the content in the payload.
  * This field is required and cannot be empty.

* **Method (method):**

  * The BeautifulSoup method to apply to the HTML content. Currently, only the get_text method is supported, which extracts all the text from the HTML.
  * The default method is "get_text".

## JSON Configuration

```
{
  "html": "payload@htmlContent",
  "method": "get_text"
}
```

## Required Resources

This plugin does not require any external resources or special configuration.

## Event Prerequisites

This plugin works for all events and does not require synchronous execution.

## Errors

* "HTML must not be empty."
  * This error occurs when the HTML field is left blank or contains only whitespace.
* "Unsupported method: [method]"
  * This error occurs if an unsupported BeautifulSoup method is specified.
* "Error: [error message]"
  * This error occurs when the plugin encounters an issue processing the HTML (e.g., the HTML is invalid or cannot be parsed). The error message will provide further details.
