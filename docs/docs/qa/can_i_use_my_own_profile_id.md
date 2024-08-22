# Can I use my own profile ID?

Yes, you can use your own ID as a profile ID in Tracardi. The platform allows for custom profile ID generation, as seen
with the introduction of a static profile ID generator in version 0.8.1. This means you can set or pass your own unique
identifier as the profile ID during the data ingestion or profile creation process, ensuring that the ID used aligns
with your existing systems or requirements.

Make sure that you define an event source that allows static profile ID.

## Security issue when using custom profile ID

When using custom profile IDs in Tracardi, there is a security consideration you should be aware of to avoid
potential vulnerabilities:

Predictable IDs: If the custom profile IDs follow a predictable pattern (e.g., incremental numbers or easily guessable
strings), it could lead to security risks like enumeration attacks. Attackers might be able to guess or iterate through
possible IDs to gain unauthorized access to store events under not their profile. Use UUIDs or strong, unpredictable
identifiers to reduce the risk of ID guessing or enumeration attacks.