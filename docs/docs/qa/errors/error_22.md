# Why was my profile not saved? I have no profile.

There could be several reasons for this issue. The most common one is that your event-to-profile mapping is incorrect.
Specifically, you might be mapping a concrete value to an object instead of specifying the full path.

### **Possible Causes and Solutions:**

1. **Check if the database is running:**  
   Ensure that your database is operational and accessible.

2. **Incorrect event-to-profile mapping:**  
   If your profile traits are structured like this:
   ```json
   {"key_1": {"key_2": "some value"}}
   ```
   but you mapped the value to `"key_1"` instead of the full path `"key_1.key_2"`, this can cause an error.

3. **Check monitoring logs for errors:**  
   Look for an error similar to:
   ```
   '1 document(s) failed to index.', [{'index': {'_index': '09x.8504a.tracardi-profile-2025-q1', '_type': '_doc', '_id': '9d34f165-ad31-4f42-9916-54b9cf5a6134', 'status': 400, 'error': {'type': 'mapper_parsing_exception', 'reason': 'object mapping for [traits.abc] tried to parse field [abc] as object, but found a concrete value'}}]
   ```
   This indicates that the system expected an object but received a concrete value.

### **How to Fix It:**

- Verify that the mapping correctly references the full path of nested attributes.
- Ensure that values are mapped to their expected data types.
- Review your indexing rules to prevent schema mismatches.