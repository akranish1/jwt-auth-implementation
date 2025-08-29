import { useEffect, useState } from "react";

export default function Profile({ token, onLogout }) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          setProfile(await response.json());
        } else if (response.status === 403) {
          setError("Session expired. Logging out...");
          setTimeout(onLogout, 2000);
        } else {
          setError("Failed to fetch profile.");
        }
      } catch (err) {
        setError("An error occurred.");
      }
    };

    fetchProfile();
  }, [token, onLogout]);

  return (
    <div>
      <h2>Profile</h2>
      {error && <p>{error}</p>}
      {profile ? (
        <div>
          <p>{profile.msg}</p>
          <p>Username: {profile.username}</p>
        </div>
      ) : (
        !error && <p>Loading profile...</p>
      )}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
