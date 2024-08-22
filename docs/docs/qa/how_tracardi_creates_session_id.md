# How Tracardi creates session ID?

Tracardi does not create a session ID by default; it is the responsibility of the client to generate the session ID.
Tracardi assumes that the session remains the same as long as the session ID does not change. However, if Tracardi
detects that the session ID is insecure—such as being too short or easily guessable—the system may intervene by
generating a secure session ID server-side or by refusing to collect the event associated with the insecure ID.