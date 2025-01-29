# Error in Profile Duplication in Tracardi Logs

I'm playing around with Tracardi to learn how everything works. I tried importing data via the REST API, sending
multiple events, and merging everything into one profile using a workflow. However, I'm seeing this error in the Docker
logs:

```
apm-1            | 2025-01-29 08:48:28,802 [WARNING] Profile pho-xxx id duplicated in the database. It will be merged with APM worker. | tracardi.service.storage.driver.elastic.profile | profile.py | 95 
```

Is this something I need to worry about?

## Answer

No, this message is just an informational log indicating that a profile with a duplicate ID exists in the database.
Tracardi's **APM (Automatic Profile Merging) worker** will automatically detect and merge duplicate profiles based on
predefined rules.

To confirm that the merging process is working correctly, check the logs of the **Tracardi APM worker**. 