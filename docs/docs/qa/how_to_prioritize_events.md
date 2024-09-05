# Is it possible to give some events a higher priority for processing and others a lower priority?

Unfortunately, no. In the commercial version, all events are processed in parallel, with a slight delay due to bulking.
If you want the workflow to be executed during the API call, you need to pass async: false in the parameters of the
event.

# What happens when async: false is used?

When async: false is used in the options of event collector, then there is no bulking, but the API call will take longer
since the workflow must be completed before the response is returned.