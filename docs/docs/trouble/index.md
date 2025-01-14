# Troubleshooting

Known issues that may come up while running Tracardi.

## Address already in use

If you experience:

```
ERROR: for tracardi_tracardi_1  Cannot start service 
tracardi: driver failed programming external connectivity 
on endpoint tracardi_tracardi_1 
Error starting userland proxy: listen tcp4 0.0.0.0:8686: 
bind: address already in use
``` 

That means you have something running on port 8686. It may be another copy of Tracardi or other service.

The solution to this is to remap the port Tracardi is running. If you run Tracardi API like this change the port mapping
from `8686:80` to some other port `8888:80`.

Change:

```
docker run -p 8686:80 -e ELASTIC_HOST=http://<your-laptop-ip>:9200 tracardi/tracardi-api
```

To:

```
docker run -p 8888:80 -e ELASTIC_HOST=http://<your-laptop-ip>:9200 tracardi/tracardi-api
```

Remember that when you change API port then you have it included in GUI as GUI uses API to access data.

So tak a look at lunch command for GUI:

So change default docker run command for Tracardi GUI

```
docker run -p 8787:80 -e API_URL=//127.0.0.1:8686 tracardi/tracardi-gui
```

To (notice: API_URL=//127.0.0.1:8888, this the where the Tracardi API is running)

```
docker run -p 8787:80 -e API_URL=//127.0.0.1:8888 tracardi/tracardi-gui
```

## Installation errors

```
Index index `INDEX_NAME` was NOT CREATED. The following result was returned {'error': 
{'root_cause': [{'type': 'validation_exception', 'reason': 'Validation Failed: 1: this action would add [10] shards, 
but this cluster currently has [1000]/[1000] maximum normal shards open;'}], 'type': 'validation_exception', 'reason': 
'Validation Failed: 1: this action would add [10] shards, but this cluster currently has [1000]/[1000] maximum normal 
shards open;'}, 'status': 400} [Exception]
```

This error can pop up if you have your elasticsearch full of indices. This means there are no shards open for new indices.
Remove unused indices. This error is usually shown during Tracardi update. 

## Connecting to Elasticsearch

```
aiohttp.client_exceptions.ClientConnectorError: Cannot connect to host elasticsearch:9200 ssl:default [Connection refused]
```

This information may come up if elasticsearch is not running. When elasticsearch starts Tracardi will resume
automatically. This information is usually displayed when Tracardi starts before elastic is ready. Tracardi waits for
elastic to start and checks if it's ready every 5 seconds.

The above error log may look like this:

```
INFO:     Started server process [10864]
INFO:uvicorn.error:Started server process [10864]
INFO:     Waiting for application startup.
INFO:uvicorn.error:Waiting for application startup.
```

This means Tracardi is waiting for Elastic to start. You will see TimeOut messages if Tracardi could not connect to
Elastic long enough.

### Elastic at localhost error

When you run Tracardi API like this:

```
docker run -p 8686:80 -e ELASTIC_HOST=http://localhost:9200 tracardi/tracardi-api
```

Notice that you try to connect to Elastic on localhost. When you run it like this means that you're connecting to the
docker itself as localhost means local in docker. Obviously elastic is not there, so Tracardi will never connect. Pass
external ip for elastic. This may be your laptop IP if you are running Tracardi locally.

## Failed to index document

Document will fail to index if its schema is conflicting with other documents in Tracardi. It this happens you may see
this message:

```
Could not save event. Error: 1 document(s) failed to index. - failed to parse field [properties.id] of type [float] 
in document with id '052df0ed-e719-457c-9de1-3b197c44b44e'. Preview of field's value: 'consent-type'"
```

Why this happens and how to solve it. It happens when the type of data that is already in Tracardi is conflicting with
data that's being sent to be saved.

For example. Consider to following scenario. You have saved age as an integer number for example: 34, 25, 15, 67. It is
saved in properties.age. You 100 documents that are saved this way. You can easily search for anyone underage 21. But
now someone wants to send an age as a string e.g. "21 years old". This type of data is conflicting with existing data so
Tracardi will raise the error.

```
Could not save event. Error: 1 document(s) failed to index. - failed to parse field [properties.age] of type [string] 
in document with id '052df0ed-e719-457c-9de1-3b197c44b44e'. Preview of field's value: '21 years old'"
```

## Missing index

I got this kind of error:

```
"NotFoundError(404, 'index_not_found_exception', 'no such index [prod-09x.8504a.tracardi-profile-2024-q2]', prod-09x.8504a.tracardi-profile-2024-q2, index_or_alias)"
```

It indicates that elastic index template does not exist or could not create new index based on template. 

To tackle down the issue you should check if elastic search has installed index templates for profile (error message has index with tracardi-profile).

Run:
```
curl -X GET "http://localhost:9200/_cat/templates?v"'
```

Replace `localhost` with your host and credentials.

Look for template:

```
template.09x.8504a.tracardi-profile, [09x.8504a.tracardi-profile-*-*], 0 , []
```

If it is missing then you need to recreate the template. Simple GUI refresh should pick it up.

If template is there check if elastic is configured to create indices form it:

```
curl -X GET "http://localhost:9200/_cluster/settings?include_defaults=true&pretty" | grep auto_create_index 
```

Look for:

```
"auto_create_index" : "true",
```

If it says false:

Run

```
curl -X PUT "http://localhost:9200/_cluster/settings" -H 'Content-Type: application/json' -d'
{
  "persistent": {
    "action.auto_create_index": true
  }
}'
```


## Issues with API connection

Failed connection with error: CORS request did not succeed

Why this happens.

The HTTP request which makes use of CORS failed because the HTTP connection failed at either the network or protocol
level. The error is not directly related to CORS, but is a fundamental network error of some kind.

In many cases, it is caused by a browser plugin (e.g. an ad blocker or privacy protector) blocking the request.

Other possible causes include:

* Trying to access an https resource that has an invalid certificate will cause this error.
* Trying to access an http resource from a page with an https origin will also cause this error.
* As of Firefox 68, https pages are not permitted to access http://localhost, although this may be changed by Bug
  1488740.
* The server did not respond to the actual request (even if it responded to the Preflight request). One scenario might
  be an HTTP service being developed that panicked without returning any data.

## Missing /track endpoint

Track endpoint with trailing backslash may fail if you use HTTPS connection. If you, by mistake, use URL `/track/` instead of
`/track` with https connection, the system will redirect `/track/` to `/track`. But it will lose https connection. This is
a know error in fastAPI: [https://github.com/tiangolo/fastapi/issues/4990](https://github.com/tiangolo/fastapi/issues/4990).
Please do not use backslash at the end of any API call.

## Other issues

Sometimes you can see the log like this:

```
[2021-10-06 08:35:35 +0000] [1] [INFO] Handling signal: winch
```

This can be ignored. Signal winch is thrown when you resize console. 

