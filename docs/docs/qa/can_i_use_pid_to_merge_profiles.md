# Can I use my country's personal identification number for merging profiles?

Yes. Any identifier can be used to identify profiles and then merge them.

## Examples of state IDs

* Brazil - Cadastro de Pessoas Físicas (CPF)
* Poland - Numer Identyfikacji Podatkowej (NIP)
* India - Aadhaar Number
* China - Resident Identity Card Number (身份证号码, Shēnfènzhèng hàomǎ)
* Canada - Social Insurance Number (SIN)
* United Kingdom - National Insurance Number (NINO)
* Australia - Tax File Number (TFN)
* Germany - Steueridentifikationsnummer (Steuer-ID)

Here's how you can achieve this when using Brazilian CPF:

1. Profile Properties for Identification:
   Tracardi profiles have several properties for identification (`data.identifier.id`, `data.identifier.pk`, 
   `data.identifier.passport`, `data.identifier.credit_card`, `data.identifier.token`, `data.identifier.coupons`).
   Pick one that you will use to store your ID, e.g., data.identifier.pk (for storing the Brazilian CPF as Primary Key).

2. Configure Identification Points:
   Use Tracardi's Identification Points feature to set up CPF as a merging key. Here's how:

   a. Create a new Identification Point.
   b. Set the source and event type that will provide the CPF.
   c. Define a matching rule for CPF:
    - Field: CPF (in the identification event properties)
    - Match Type: Exact match (equal)
    - Profile Field: `profile@data.identifier.pk` (or wherever you store CPF in the profile)

3. Data Validation:
   Implement CPF validation in your data collection process to ensure only valid CPFs are used for merging. Do this on
   your platform before sending data to Tracardi. This could include:
    - Checking the CPF format (11 digits)
    - Verifying the CPF using the official algorithm

4. Event Configuration:
   Send an event (e.g., "CPF-Identification") that includes the verified CPF information. Ensure these events are
   triggered when you receive verified CPF information.

By implementing these steps, you can effectively use CPF as a key for merging profiles in Tracardi, providing a reliable
method for identifying and consolidating user data specific to Brazil.

Note: Always ensure compliance with local data protection laws (such as LGPD in Brazil) when handling personal
identification numbers.