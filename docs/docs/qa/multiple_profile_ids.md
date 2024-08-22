# I have multiple profile IDs in the profile.ids field. What could be the reason for this?

The presence of multiple profile IDs in the profile.ids field typically occurs when the "identification" event is
triggered multiple times without including the previously assigned profile ID. Each time the system receives an 
"identification" event without a specified profile ID, it generates a new one. The newly generated profile ID is then
added to the list of profile IDs within the profile.ids field during merging. 

This behavior is intentional and designed to track all previous profile IDs associated with a user, ensuring a complete
history of the user's profile as it evolves. It's a safeguard to maintain the continuity of the user's data, even if the
profile ID changes over time.

To prevent the accumulation of multiple profile IDs in the profile.ids field, ensure that every event you send to
Tracardi includes the current profile ID. By consistently passing the correct profile ID with each event, you help
Tracardi recognize and maintain a single, consistent profile ID, avoiding the creation of additional profile IDs.

This is the correct and expected behavior, and adhering to this practice will help maintain the integrity of your
profile data.