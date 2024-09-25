# What env variable controls which API private and which public.

The environment variable that controls whether the Tracardi API is private or public is EXPOSE_GUI_API.

* When EXPOSE_GUI_API=true: The API is private, allowing access to all endpoints, including those for controlling
  Tracardi and accessing the GUI.
* When EXPOSE_GUI_API=false: The API is public, restricting access to only the data collection endpoints, without
  providing GUI or management capabilities.

This variable determines the scope of the API's functionality and exposure.

Here is a short explanation what public and private API means:

Public API:

* The public API is exposed to the internet and is used for collecting data only. No GUI operations are available in
  this API.
* This API is enabled by default for data collection purposes only.

Private API:

* The private API is not exposed to the internet and is used for controlling Tracardi, including access to data, GUI
  operations, and management.
* This API should be protected and accessible only through VPN or internal network configurations.
* Private API is used to configurate and control tracardi.