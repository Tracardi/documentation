# Upgrades post version 0.7.2

In Tracardi version 0.7.2, a feature was introduced that allows for data migration between versions. Each new Tracardi
installation creates a new, empty database, and the data from an old version can be migrated to the new one. To perform
this migration, follow these steps:

1. Navigate to the maintenance/migration page.
2. Locate the migration script from the old version.
3. Follow the instructions provided in the script to complete the data migration.

Note that this feature is only available in Tracardi version 0.7.2 and higher. If you are using an older version, you
will need to upgrade to at least 0.7.2 to access this functionality.

!!! Warning

    If you perform multiple upgrades of Tracardi, the system will create a large number of new indices, which
    may cause you to reach the Elasticsearch limit of 1000 indices. To resolve this issue, you can either increase the limit
    in the Elasticsearch configuration or delete the indices used by old Tracardi versions. Tracardi version 0.8.0 includes
    a feature in the GUI to delete old indices. If you are using an older version, you can use the API to delete old
    indices, such as issuing an HTTP DELETE call to `/indices/version/0.7.2` to delete the 0.7.2 version indices. However,
    be cautious when deleting old data, as there is no way to revert the system to an older version once the data has been
    deleted. It is important to thoroughly test your new Tracardi installation before deleting any old data.
