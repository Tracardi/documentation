# If my wife and I access a website from our home (same PC) and I create an account, how will the profile identification be managed? And if my wife creates an account shortly after, how will the separation of accesses and clicks between the different profiles be handled?

When two users share the same computer and access the same website, the management of profiles in Tracardi depends
largely on how the client-side (browser and website) handles profile identification. Tracardi, being a server-side
system, relies on the information provided by the client to distinguish between users. Here's a detailed explanation of
how profile identification is managed in this scenario, along with the factors that influence the separation of accesses
and clicks between different profiles.

---

### **Understanding Client-Side Profile Identification**

Profile identification begins on the client side, which includes the browser and the website's integration with
Tracardi. The browser is responsible for maintaining a consistent Profile ID for each user. This Profile ID is stored in
the browser's local storage or cookies and is sent to Tracardi with each interaction. Tracardi uses this ID to associate
events with the correct user profile.

---

### **Scenario 1: Separate User Accounts on the Computer**

**Description**:

- You and your wife use separate user accounts (workspaces) on the same computer.
- Each user account has its own browser data, including cookies and local storage.

**Profile Management**:

- **Distinct Profile IDs**: Since each user account maintains its own browser storage, the Profile IDs generated and
  stored are separate.
- **Accurate Tracking**: Tracardi assigns unique profiles to each of you based on the distinct Profile IDs.
- **Data Separation**: All activities, accesses, clicks, and account information are correctly attributed to the
  respective profiles.

**Outcome**:

- **Full Separation**: This scenario ensures complete separation of user data. Tracardi can accurately distinguish
  between you and your wife because the client-side Profile IDs are not shared.
- **Reliable Analytics**: Any analysis or personalization based on user behavior will be accurate and specific to each
  individual.

---

### **Scenario 2: Shared User Account and Browser**

**Description**:

- You and your wife use the same user account on the computer and the same browser.
- The browser maintains a single set of cookies and local storage for both users.

**Profile Management Before Logging In**:

- **Shared Anonymous Profile**: Initially, both of you share the same anonymous browsing profile since the browser uses
  the same Profile ID for all users.
- **Mixed Browsing History**: All pre-login activities are recorded under this shared anonymous profile. Tracardi cannot
  distinguish between users at this stage.

**When You Create an Account**:

- **Profile Association**: Upon creating and logging into your account, the shared anonymous Profile ID becomes
  associated with your user profile.
- **Inherited Browsing History**: All prior anonymous activities (which may include your wife's actions) are now linked
  to your profile.
- **Profile Enrichment**: Your profile is enriched with the browsing history accumulated before login.

**When Your Wife Creates an Account Shortly After**:

There are two possible outcomes based on how the website handles Profile IDs during the login process.

---

#### **Outcome 1: Profile ID is Reset Upon New Login**

**Client-Side Actions**:

- **Profile ID Reset**: The website or browser resets the Profile ID when your wife logs into her account. This can be
  achieved by clearing the existing Profile ID from local storage and generating a new one.
- **New Session Initiation**: A new Session ID should also be generated to track activities within the new session.

**Tracardi's Response**:

- **New Profile Creation**: Tracardi creates a new profile for your wife based on the new Profile ID.
- **Data Separation**: Her activities moving forward are associated exclusively with her profile.
- **No Inherited History**: Since the Profile ID was reset, she does not inherit the anonymous browsing history that was
  previously linked to your profile.

**Outcome**:

- **Effective Separation**: This approach ensures that both profiles remain distinct, and each user's activities are
  accurately tracked.
- **Accurate Attribution**: Accesses, clicks, and other interactions are correctly attributed to the respective profiles
  from the point of login onwards.

---

#### **Outcome 2: Profile ID is Retained**

**Client-Side Actions**:

- **Profile ID Unchanged**: The browser retains the existing Profile ID when your wife logs into her account.
- **Shared Profile Continuation**: Both your activities and your wife's continue to be associated with the same Profile
  ID.

**Tracardi's Response**:

- **Merged Profiles**: Tracardi does not create a new profile since the Profile ID hasn't changed. Instead, it
  associates your wife's account information with the existing profile.
- **Combined Data**: All subsequent activities from both users are merged into a single profile.
- **Household Representation**: The profile effectively represents a household rather than individual users.

**Outcome**:

- **Data Mixing**: This results in a mixed dataset where activities from both users are combined.
- **Less Accurate Tracking**: Personalization and analytics become less accurate, as Tracardi cannot distinguish between
  the two users' behaviors.

---

### **Challenges and Considerations**

- **Client-Side Responsibility**: The management of Profile IDs is primarily the responsibility of the client (browser
  and website). Tracardi cannot independently generate separate profiles without distinct Profile IDs.
- **Anonymous Browsing History**: Before any user logs in, all activities are anonymous and associated with the same
  Profile ID in a shared browser. Separating this history is technically challenging without individual identifiers.
- **User Behavior**: In practice, users may not log out after using a shared computer, leading to data mixing. Automatic
  sign-outs or enforced logins can mitigate this issue.

---

### **Strategies for Managing Profile Separation**

To ensure accurate separation of accesses and clicks between different profiles on a shared computer, consider the
following strategies:

#### **1. Implement Client-Side Profile ID Resetting**

- **On Logout**:
    - Clear the Profile ID from the browser's local storage when a user logs out.
    - Ensure that the next user will receive a new Profile ID upon accessing the website. This mimics system account behaviour.

- **On Login**:
    - Assign correct Profile ID whenever a user logs in. If User profile ID is unknown generate new one and send user
      e-mail in payload. Tracardi will use it to merge the profile ID with previous profile history.
    - Send this new Profile ID to Tracardi with each event.

#### **2. Enforce User Authentication**

- **Require Login**:
    - Design the website to require users to log in before accessing personalized content.
    - This ensures that each session is associated with a specific user from the start.

- **Automatic Sign-Out**:
    - Implement session timeouts that automatically log users out after a period of inactivity.
    - This prevents subsequent users from inadvertently using the same session and Profile ID.

#### **3. Educate Users**

- **User Awareness**:
    - Inform users about the importance of logging out on shared devices.
    - Provide prompts or reminders to log out after completing their activities.

#### **4. Integration Considerations**

- **Synchronous vs. Asynchronous Tracking**:
    - **Synchronous Tracking**: Allows immediate communication between the client and Tracardi, facilitating Profile ID
      updates.
    - **Asynchronous Tracking**: Uses intermediaries like message queues (e.g., Kafka), which may delay or prevent
      Profile ID updates in real-time.

- **Recommendation**:
    - Opt for synchronous tracking when accurate profile separation is critical.
    - Ensure that the integration method supports two-way communication for Profile ID management.

### **Conclusion**

In a shared computer environment, the accurate management of profiles in Tracardi hinges on the client-side handling of
Profile IDs. To prevent data mixing and ensure that accesses and clicks are correctly attributed to the right user:

- **Website Integration**: The website should be designed to reset the Profile ID upon user logout or new login.
- **User Practices**: Users should be encouraged to log out after each session, especially on shared devices.
- **Session Management**: Implement automatic logout features and require authentication for access to personalized
  content.
- **Technical Integration**: Choose synchronous tracking methods that allow real-time Profile ID updates between the
  client and Tracardi.

By implementing these strategies, Tracardi can more effectively distinguish between you and your wife when accessing the
same website from the same PC, ensuring that each of your profiles is managed separately and accurately reflects your
individual interactions.