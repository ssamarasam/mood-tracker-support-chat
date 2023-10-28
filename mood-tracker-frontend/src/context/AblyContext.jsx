import React, { createContext, useContext, useEffect, useState } from "react";
import Ably from "ably";

const AblyContext = createContext();

export const useAbly = () => {
  return useContext(AblyContext);
};

const AblyProvider = ({ children }) => {
  const [ably, setAbly] = useState(null);
  const URL = "http://localhost:3000" + "/ably-auth/";

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        const client = new Ably.Realtime({
          authUrl: URL,
          auth: {
            token: data.token,
          },
        });

        setAbly(client);
      })
      .catch((error) => {
        console.error("Error fetching Ably token:", error);
      });
  }, []);

  return <AblyContext.Provider value={ably}>{children}</AblyContext.Provider>;
};

export default AblyProvider;
