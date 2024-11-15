# GenAI

This plugin generates text using GenAI providers such as Cloudflare AI and Ollama based on a configured prompt template.

# Version

This documentation is for version 1.0.4 of the plugin.

## Description

The GenAI plugin interacts with selected AI providers to produce text output based on a given prompt template.

The plugin works as follows:

1. **Configuration Validation**: The plugin checks the provided configuration, ensuring it includes a GenAI resource, a provider, a model, and a non-empty prompt template.
2. **Setup**: It retrieves credentials from the selected resource, which contain details for accessing the chosen GenAI provider.
3. **Prompt Processing**: The plugin dynamically formats the prompt using the template specified in the configuration, then calls the designated GenAI provider's API.
4. **API Call**: Depending on the selected provider (Cloudflare or Ollama), the plugin sends the formatted prompt, model name, max tokens, and temperature settings.
5. **Response Handling**: If successful, the plugin returns the AI-generated text, both in plain and Base64-encoded formats. If there’s an issue, it returns an error message with details.

# Inputs and Outputs

- **Inputs:** The plugin takes a `payload` object, which includes the initial data for prompt template processing.
- **Outputs:**
  - **Result**: Returns generated text based on the AI model’s output.
  - **Error**: Outputs an error message if the plugin encounters an issue during processing.

This plugin does not initiate the workflow.

# Configuration

To configure the GenAI plugin, provide the following:

- **GenAI Resource**: Select the configured resource that holds credentials for the GenAI provider.
- **Provider**: Choose between "Cloudflare" and "Ollama" as the GenAI service.
- **Model**: Specify the model ID to use for text generation.
- **Prompt Template**: Provide a template for generating text, which will dynamically process the payload content.
- **Max Tokens**: Set the maximum number of tokens for the generated output.
- **Temperature**: Define the randomness of the output. Lower values yield more deterministic responses.

# JSON Configuration

```
{
  "resource": {
    "id": "resource-id",
    "name": "GenAI Resource"
  },
  "provider": "cloudflare",
  "model": "your-model-name",
  "prompt_template": "payload@your.prompt.path",
  "max_tokens": "50",
  "temperature": "0.7"
}
```

# Required Resources
This plugin requires a configured resource in Tracardi containing the API key, URL, and any other necessary credentials for the selected GenAI provider.

# Event Prerequisites
This plugin is compatible with any event type and does not require synchronous events.

# Errors
* "Prompt Template Error."
  * Raised if the prompt template is empty or improperly configured.
* "Provider Error."
  * Occurs if an unsupported provider is specified.
* "API Connection Issues."
  * General error triggered by network issues, provider API downtime, or unexpected API responses.
* "Credential Errors."
  * If required credentials are missing or incorrect, an error will be logged.

These errors are logged in Tracardi’s console and returned in the error output port, indicating issues that need to be addressed in the plugin configuration or environment.


