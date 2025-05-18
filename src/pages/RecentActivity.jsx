import React, { useEffect, useState } from "react";
import styles from "./RecentActivity.module.css";

const mockActivities = [
  { id: 1, user: "John Doe", action: "Joined Tournament", time: "2025-05-14 15:30" },
  { id: 2, user: "Jane Smith", action: "Made Payment", time: "2025-05-14 14:50" },
  { id: 3, user: "Admin", action: "Created Tournament", time: "2025-05-13 19:10" },
  { id: 4, user: "PlayerX", action: "Updated Profile", time: "2025-05-13 16:45" }
];

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Replace this with actual API call if needed
    setActivities(mockActivities);
  }, []);

  return (
    <section aria-labelledby="recent-activity-heading" className={styles.activityContainer}>
      <h2 id="recent-activity-heading" tabIndex="-1" className={styles.activityHeading}>Recent Activity</h2>
      <div style={{ marginTop: "1.5rem" }} aria-live="polite" role="status">
        {activities.length === 0 ? (
          <div role="alert" tabIndex="0" aria-label="No recent activity">
            <p>Recent activity feed will be displayed here</p>
          </div>
        ) : (
          <table className={styles.activityTable}>
            <caption className="sr-only" id="recent-activity-caption">Recent user activities</caption>
            <thead>
              <tr>
                <th scope="col">User</th>
                <th scope="col">Action</th>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.user}</td>
                  <td>{activity.action}</td>
                  <td>{activity.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

// Note: Ensure the following CSS is in your global stylesheet for .sr-only accessibility
// .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }

// Visually hidden class for screen readers
// Add this CSS to your global stylesheet or main CSS file:
// .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }

export default RecentActivity;
