# Tracardi Upgrades before version 0.9.0

This documentation provides information on how to upgrade Tracardi and perform data migration between versions. It also
covers the process of updating the system and the precautions to take during the upgrade process.

## Upgrades

Tracardi is still in active development, and upgrading to a new version may introduce compatibility issues due to
changes in workflow persistence. Workflows created in one version may not work properly with all available plugins in a
newer version, or the plugins may behave differently.

To upgrade the open-source version of Tracardi to the latest development version, pull the new docker image:

```bash
docker pull tracardi/tracardi-api:<version>
docker pull tracardi/tracardi-gui:<version>
```

Then you can run it the same way as written in the [installation](../../installation/index.md) guide.

!!! Warning

    Upgrades of minor or development versions of Tracardi may cause data loss. Each development version is
    marked with a `-dev` suffix.

### Prerequisites for Upgrading

Before upgrading, it is crucial to ensure that you only install dockers with a tagged version. Installing the latest
version without proper tagging may lead to incorrect data, resulting in the loss of continuity during the upgrade
process. Therefore, it is essential to install the appropriate tagged version to facilitate a smooth system upgrade.

### Automated System Upgrades

Starting from version 0.7.0, Tracardi offers automated system upgrades. Unlike previous versions, which could only
upgrade the code, version 0.7.0 and above maintain information about the indexes used. Access to data is achieved
through aliases, which function like symbolic links.

#### The Upgrade Process

When performing an upgrade, Tracardi leaves the old version indexes unchanged and designates them as the previous
version. Simultaneously, new empty indexes are created, along with new aliases (each prefixed with version number). If
the schema of the old index remains unchanged, the data pointer is switched from the old index to the new one. However,
if there are schema changes, the data is migrated using a script that rewrites the data between indexes and copies the
data from the old fields to the new ones accordingly. This process ensures a seamless transition during the upgrade.
