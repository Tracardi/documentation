# Tracker response

This is the example of the response from Tracardi after the events were collected.

```json
{
 "task": [
  "fae054ab-fab4-4eaf-8762-f8b71638b043"
 ],
 "ux": [],
 "response": {},
 "events": [],
 "profile": {
  "id": "60a05b82-0554-48a6-a53c-b759031a8f0b"
 },
 "session": {
  "id": "4812b132-1c07-4b68-899b-d18b5c24b6e6"
 },
 "errors": [],
 "warnings": []
}
```

## Understanding Responses in Tracardi

In Tracardi, responses play a crucial role in collecting and processing data from various ingestion pipelines and
workflows that events pass through. Responses typically include the profile ID and may also contain additional data if
configured.

### Data in response

| Key       | Description                                                              | Example Value                                                                 |
|-----------|--------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| task      | List containing the Task ID                                              | ["fae054ab-fab4-4eaf-8762-f8b71638b043"]                                      |
| ux        | List of JavaScript widgets to include on the page                        | [{"tag":"script","type":"text/javascript","content":["\n  (function(d,t) "]}] |
| response  | Response data from workflow (requires synchronous event)                 | {"data": "value"}                                                             |
| events    | List of events                                                           | []                                                                            |
| profile   | Profile information                                                      | {"id": "60a05b82-0554-48a6-a53c-b759031a8f0b"}                                |
| session   | Session information                                                      | {"id": "4812b132-1c07-4b68-899b-d18b5c24b6e6"}                                |
| errors    | List of errors                                                           | ["error message"]                                                             |
| warnings  | List of warnings                                                         | ["warning message"]                                                           |

Responses can be considered as the output of workflows, which are executed based on the configurations and logic defined
within them. These responses are consolidated into a single response, which can then be further processed, analyzed, or
used to trigger subsequent actions.

Responses may also contain additional information, such as the response key, which is a defined field that includes the
data returned by a specific workflow. The response key helps organize and structure the data collected from different
workflows, making it easier to access and utilize in downstream processes.
