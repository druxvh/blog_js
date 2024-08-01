import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({})

export function UserContextProvider({children}){
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        const fetchProfile = async () => {
          try {
            const response = await fetch("http://127.0.0.1:4000/profile", {
              method: "GET",
              credentials: "include",
            });
            if (response.ok) {
              const data = await response.json();
              setUserInfo(data);
            } else {
              console.log("You need to login to access!");
            }
          } catch (error) {
            console.error("Error:", error);
          }
        };
        fetchProfile();
      }, []);

    return (
        <UserContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </UserContext.Provider>
    )
}