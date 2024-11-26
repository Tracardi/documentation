# Differences Between Open-Source and Commercial Tracardi

## Overview
Tracardi offers both open-source and commercial versions, catering to different scalability, functionality, and customization needs. Below is a detailed comparison highlighting the key differences in configuration and features.

---

### **Parallel Processing**
- **Open-Source**: Tracardi supports parallel processing by configuring workers, allowing event collection and workflows to run separately on different servers.
- **Commercial**: Features a completely different distributed engine with enhanced scalability. It supports two types of events: synchronous and asynchronous, optimizing event processing for high-demand environments.

---

### **Scaling**
- **Open-Source**: Horizontal scaling with basic distributed configurations.
- **Commercial**: Supports vertical scaling, enabling the system to handle larger workloads with increased resource allocation.

---

### **Enabling/Disabling System Parts**
- **Open-Source**: Limited configurability for system modularity.
- **Commercial**: Allows enabling or disabling unused system components, improving resource efficiency and simplifying management.

---

### **Audit Log**
- **Open-Source**: Basic logging capabilities.
- **Commercial**: Includes timestamps on every data change for detailed audit trails and compliance.

---

### **Separated Environments**
- **Open-Source**: Single environment for all operations.
- **Commercial**: Built-in support for two contexts—**test** and **production**—ensures changes in the test environment can be deployed to production in a controlled manner. No changes are immediately reflected in production without explicit deployment.

---

### **Better User Merging**
- **Open-Source**: Basic profile merging capabilities.
- **Commercial**: Advanced profile merging configurations allow precise control over which data is merged and which attributes drive the merging process.

---

### **Events on Property Changes**
- **Open-Source**: Limited event triggers for property changes.
- **Commercial**: Automatically triggers events on profile changes (e.g., an email update), enabling workflows based on profile updates.

---

### **System Events**
- **Open-Source**: Basic event support.
- **Commercial**: Includes system events like "visit ended," enabling automation when a user leaves a page or session ends.

---

### **Validating, Transforming, and Copying Events**
- **Open-Source**: Standard validation and transformation tools.
- **Commercial**: Enhanced capabilities to validate, transform, and automatically copy event data to profiles, ensuring consistency and accessibility for analysis.

---

### **Extensive Action Plugins**
- **Open-Source**: Includes core plugins for workflow functionality.
- **Commercial**: Offers additional action plugins for sophisticated use cases:
  - **Pause and Resume**: Temporarily halt workflows and resume them at a specified time.
  - **Limiter**: Manage workflow frequency and prevent resource overloading.
  - **Load Data Report**: Generate custom reports for insights on trends and aggregated customer data.
  - **Geo Distance/Geo Fencing**: Trigger location-based actions for targeted marketing or recommendations.
  - **Event Aggregator**: Analyze aggregated event data to uncover behavior patterns.
  - **Event Counter**: Track and analyze event frequencies for prioritizing actions.
  - **Segmentation Plugins**: Remember past segments and reapply them for refined workflows.
  - **Event Sequencing Matching**: Identify specific event patterns to trigger personalized actions.

---

### **Audience Building and Activation**
- **Open-Source**: Basic audience segmentation and limited activation tools.
- **Commercial**: Enables building dynamic audiences using behavioral data and profile properties, previewing them for accuracy, and activating them by sending data to external systems like CRMs, marketing platforms, or analytics tools for tailored engagement strategies.

--- 

This detailed comparison highlights how the commercial version extends Tracardi’s capabilities, making it ideal for enterprise-level needs requiring advanced scalability, automation, and integration.