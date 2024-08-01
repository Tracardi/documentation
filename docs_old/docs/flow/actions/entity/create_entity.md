# Create Entity

This plugin is used to add or update an entity. An entity can be anything, such as a purchase, email, car, invoice, etc.
The plugin identifies entities by type and ID, merges new properties and traits with existing ones if needed, and can
associate entities with a profile.

# Version

This documentation is created for version 0.8.2 of the plugin.

## Description

The Create Entity plugin takes input data, processes it to identify or create an entity, and optionally merges new data
with existing data. It supports defining entity properties and traits, connecting the entity with the current profile,
and setting expiration and due dates for the entity. The plugin uses dot notation to reference data within the workflow.

Here's a step-by-step description of how the plugin works:

1. The plugin receives input data through a payload.
2. It converts the type of the entity to lowercase and replaces spaces with dashes.
3. It extracts properties and traits from the configuration, and uses a traverser to replace dot-notated references with
   actual values.
4. If merging with an existing entity is required, it retrieves the entity data from the provided reference and merges
   the properties and traits.
5. It converts the entity ID and optionally references the profile.
6. It sets expiration and due dates if provided.
7. It creates or updates the entity record in the database.
8. It returns the result of the operation or an error message.

Example output:

```json
{
  "result": {
    "result": {
      "saved": 1,
      "errors": []
    },
    "entity": {
      "id": "entity-id",
      "type": "entity-type",
      "profile": {
        "id": "profile-id"
      },
      "properties": {
        "entity-type": {
          "property1": "value1"
        }
      },
      "traits": {
        "entity-type": {
          "trait1": "value1"
        }
      }
    }
  }
}
```

# Inputs and Outputs

## Inputs

- `payload`: This port takes a payload object containing data for creating or updating the entity.

## Outputs

- `result`: This port returns the result of the operation, including the updated or created entity.
- `error`: This port returns an error message if something goes wrong.

# Configuration

- __Entity type__: The type of the entity, e.g., purchase, email, car, invoice. It will be converted to lowercase and
  spaces replaced by dashes.
- __Entity ID__: A unique identifier for the entity. It can reference data in the event, profile, etc.
- __Connect entity with profile__: Whether to associate the entity with the current profile.
- __Entity properties__: New properties to add or merge with existing properties.
- __Entity traits__: New traits to add or merge with existing traits.
- __Entity to merge with__: Reference to existing entity data for merging properties and traits.
- __Entity due date__: Optional due date for the entity.
- __Entity expiration date__: Optional expiration date for the entity.

# JSON Configuration

```json
{
  "id": "profile@data.contact.email.main",
  "type": "purchase",
  "reference_profile": true,
  "merge_entity_with": "payload@entity",
  "properties": "{}",
  "traits": "{}",
  "expiration_date": "payload@expiration",
  "due_date": "payload@due"
}
```

# Required resources

This plugin does not require external resources to be configured.

# Event prerequisites

This plugin works for all events and does not require synchronous execution.

# Errors

- "No traits found in `<merge_entity_with>`": This occurs if the referenced entity does not contain traits.
- "No properties found in `<merge_entity_with>`": This occurs if the referenced entity does not contain properties.
- "Profile event sequencing can not be performed without profile. Is this a profile less event?": This occurs if the
  event does not contain a profile and the configuration requires a profile reference.
- "Invalid date format for expiration date": This occurs if the expiration date format is invalid.
- "Invalid date format for due date": This occurs if the due date format is invalid.
- "Error in dot notation parsing": This occurs if there is an error in parsing the dot notation.
