# I have set up Tracardi on my local machine and I get the error: **'405 Method Not Allowed'**:

I have set up Tracardi this way:

1. Cloned the repository: `git clone https://github.com/Tracardi/tracardi-api.git` (1.1.x branch).
2. Navigated to the directory: `cd tracardi-api/`.
3. Ran the containers: `docker-compose up`.

The containers start successfully, and I can access the GUI at `http://127.0.0.1:8787`. However, when I try to log in using the demo token `tracardi`, I get the error: **'405 Method Not Allowed'**.

Upon further investigation, I noticed the GUI's "API URL" points to `http://127.0.0.1:8787`, which doesn't seem correct. What is the solution to fix this issue?

---

### Answer:

The issue occurs most probably because the GUI is incorrectly configured to use itself (`http://127.0.0.1:8787`) as the API URL. The Tracardi API actually runs on port `8686`.

#### Solution:

1. **Update the API URL**:
   - Open the GUI at `http://127.0.0.1:8787`.
   - Locate the "API URL" field in the interface.
   - Change the API URL to `http://127.0.0.1:8686` (port `8686`).
   - Click the refresh icon next to the API URL field to apply the change.

2. **Access the GUI**:
   - After updating the API URL, you should be able to log in using the default token `tracardi` (in demo mode).

3. **Check Configuration**:
   - Ensure that your `docker-compose.yml` file exposes the correct ports:
     - GUI: `8787`
     - API: `8686`
   - Verify that no network rules or configurations are blocking the connection.

If you still face issues after this, paste http://127.0.0.1:8686 into your browser and see if there is any response in form of JSON.