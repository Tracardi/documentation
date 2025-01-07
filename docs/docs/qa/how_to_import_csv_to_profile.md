# Importing Data from CSV Using Tracardi Library

To import data from a CSV file using the Tracardi library, you will first need to install the library, define how you
want to process the data, and save it to the Tracardi database. Below are the steps you need to follow.

### Step 1: Install Tracardi Library

Install the Tracardi library using the following command:

```bash
pip install git+https://github.com/Tracardi/tracardi.git@1.0.x
```

This command installs version 1.0.x of the Tracardi library directly from the GitHub repository.

### Step 2: Define the CSV Reading and Saving Logic

Create a function that reads data from a CSV file and converts it to Tracardi Profile objects. Use the
`save_profiles_in_db` function to save the profiles to the Tracardi database.

Here's an example of how you can achieve this:

```python
import csv

from tracardi.context import ServerContext, Context
from tracardi.domain.profile import Profile
from tracardi.domain.profile_data import ProfileData, ProfilePII, ProfileContact, ProfileEmail, ProfilePhone
from tracardi.service.collector.mutation.profile import save_profiles_in_db

import asyncio
from pydantic import ValidationError


async def import_profiles_from_csv(file_path: str):
    profiles = []

    # Read CSV file
    with open(file_path, mode='r', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)

        for row in reader:
            try:
                # Create a Profile object from each row
                profile = Profile(
                    id=row['id'],
                    data=ProfileData(
                        pii=ProfilePII(
                            firstname=row.get('firstname'),
                            lastname=row.get('lastname'),
                            gender=row.get('gender'),
                            birthday=row.get('birthday')
                        ),
                        contact=ProfileContact(
                            email=ProfileEmail(main=row.get('email')),
                            phone=ProfilePhone(main=row.get('phone'))
                        )
                    )
                )
                profile.set_new()
                profiles.append(profile)
            except ValidationError as e:
                print(f"Error parsing profile data: {e}")

    # Save profiles in database
    with ServerContext(Context(production=False, tenant=None)):
        await save_profiles_in_db(profiles, refresh_after_save=True)


# Entry point for async functions
if __name__ == "__main__":
    # os.environ['ELASTIC_HOST'] = "..."
    csv_file_path = "profiles.csv"  # Path to your CSV file
    asyncio.run(import_profiles_from_csv(csv_file_path))
```

### Step 3: Prepare Your CSV File

Ensure that your CSV file is formatted correctly, with column headers matching the expected attributes for each
`Profile`. For example:

```csv
id,firstname,lastname,gender,birthday,email,phone
1,John,Doe,Male,1990-01-01,john.doe@example.com,123456789
2,Jane,Smith,Female,1992-05-15,jane.smith@example.com,987654321
```

### Step 4: Run the Script

Execute the script to start the import process. Ensure your Elasticsearch instance (used by Tracardi) is up and running
to successfully store the profile data.

Connection to the database is set via ELASTIC_HOST environment variable. By default it is http://localhost:9200.
If yur connection is https but you do not want to verify certificates set ELASTIC_VERIFY_CERTS=no.

Even variables can be set in python via os.environ.


### Additional Notes

- The `Profile` object contains several optional fields. You can expand or customize the attributes as needed by
  modifying the data mapping in the script.
- The `save_profiles_in_db` function is asynchronous, so make sure to handle it properly using `await` or wrap it inside
  an `async` function.
- If your installation is multi-tenant you will need to set the tenant ID in `with ServerContext(Context(production=False, tenant=None))`

