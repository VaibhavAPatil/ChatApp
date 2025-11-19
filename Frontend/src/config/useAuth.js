import { useEffect, useState } from "react";
import axios from "./axios.config.js";

export default function useAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/auth/me", { withCredentials: true })
      .then((res) => {
        if (res.data.loggedIn) setUser(res.data.user);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}
