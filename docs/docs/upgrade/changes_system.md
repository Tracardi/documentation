# Version 1.1.0 Release Notes

This version introduces significant internal optimizations, new features, and functionality improvements to enhance performance, flexibility, and data handling. The following updates provide a streamlined approach to managing workflows, tracking, and monitoring with increased control over event processing and profiling.

---

## New Features and Enhancements

### Internal Process Refactorization
- **Description:** The internal process has been refactored to allow the server load to be distributed across multiple nodes. This update enables **collector** and **workflow** components to run on separate nodes, improving scalability and reliability.
- **Impact:** Optimizes resource allocation across nodes, allowing for better load management and fault tolerance.

### Tracker Payload Queueing
- **Description:** The API now supports a **queue-only** mode for tracker payloads, giving administrators control over how tracking data is processed.
- **Impact:** By queuing payloads instead of processing them immediately, the system reduces processing load on the API, enabling smoother operation under high demand.

### Bulk Event Payload Collection
- **Description:** This release introduces bulk event payload handling, allowing multiple events to be processed in a single request.
- **Impact:** Reduces network overhead and improves throughput, making event handling more efficient for applications generating high volumes of events.

### APM Selective Auto-Merging
- **Description:** The new **selective auto-merging** feature for the APM module allows administrators to merge only selected PII (Personally Identifiable Information) data.
- **Impact:** Provides fine-grained control over data merging to meet privacy requirements and manage sensitive data more effectively.

### APM Integration with Identification Points
- **Description:** APM functionality has been integrated with identification points, allowing for enhanced identification and tracking based on selected data points.
- **Impact:** Improves the precision of analytics by correlating events with identified users or entities.

### Referer Web Page Visibility in Events
- **Description:** The originating web page (referer) is now visible within the `data/events` section.
- **Impact:** Enhances visibility into user journey data, enabling a more complete view of user paths and interaction sources.

### Performance Boost
- **Description:** Overall system performance has been improved, offering a performance boost between **50% and 600%** depending on workload.
- **Impact:** Increases system responsiveness and handling capacity, allowing for smoother operations under heavy loads.

### Monitoring Profile Properties for Changes
- **Description:** Profile properties are now monitored for changes, allowing real-time tracking of profile updates.
- **Impact:** Enables dynamic adjustments and triggers in workflows based on profile changes, enhancing adaptability and personalization.

### New Tracardi Destination (Chaining Instances)
- **Description:** A new Tracardi destination allows for **chaining instances** of Tracardi, supporting distributed data collection and processing across multiple systems.
- **Impact:** Expands Tracardi’s flexibility for complex environments, enabling inter-instance communication and data sharing.

---

## UI and Usability Improvements

### Standardization of GUI Forms
- **Description:** Forms within the GUI have been standardized to ensure consistency in appearance and function.
- **Impact:** Provides a more intuitive and streamlined user experience across all forms in the interface.

---

## Removed Features

### Inject Event Plugin from Workflow
- **Description:** The **inject event plugin** has been removed from workflows due to refactoring and new functionality that makes this plugin redundant.
- **Impact:** Reduces potential points of failure and improves workflow simplicity by removing unnecessary components.

--- 

These updates collectively enhance Tracardi's stability, performance, and usability, enabling organizations to manage and process data more efficiently across distributed systems.