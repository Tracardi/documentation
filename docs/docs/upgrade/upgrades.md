# Upgrade Process

This documentation describes how to perform upgrades using a Helm chart.

## Upgrade Prerequisites

To upgrade to a new version, you need:

* A new Helm chart tagged with the desired upgraded version.
* A revised `values.yaml` file configured for the upgrade.

## Upgrade Procedure

- **Retrieve the New Helm Chart**:
    - Ensure you have access to the Helm repo or ZIP containing the updated chart version.
    - Verify that the chart version you intend to use aligns with your desired upgrade.

- **[Review and Revise the Values File](changes_helm_chart.md)**:
    - Review the `values.yaml` file and make any necessary changes to configuration parameters.
    - Pay attention to any deprecated or changed parameters in the new chart version's documentation.
    - Save the updated `values.yaml` file, as it will be used during the upgrade process.

- **Run the Helm Upgrade Command**:
    - Execute the following command to initiate the upgrade:
      ```bash
      helm upgrade <release-name> <chart-name> --version <chart-version> -f path/to/values.yaml
      ```
    - Replace:
        - `<release-name>` with the name of your Helm release.
        - `<chart-name>` with the name of the Helm chart.
        - `<chart-version>` with the tag of the upgraded chart version.
        - `path/to/values.yaml` with the path to your revised `values.yaml` file.

- **Verify the Upgrade**:
    - Check the status of the Helm release to confirm the upgrade was successful:
      ```bash
      helm status <release-name>
      ```
    - Monitor logs and perform functionality checks as needed to ensure the application is working correctly with the
      upgraded version.

- **Rollback if Necessary**:
    - In case of issues, you can rollback to the previous release by running:
      ```bash
      helm rollback <release-name> <revision-number>
      ```
    - To view available revisions, use:
      ```bash
      helm history <release-name>
      ```

## Additional Notes

- **Testing Upgrades**: It is recommended to test the upgrade process in a staging environment before deploying to
  production.


