import { createContext, useReducer } from "react";

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      console.log(action.payload);
      return action.payload;
    case "REMOVE_USER":
      return null;
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, dispatchUser] = useReducer(userReducer, null);
  return (
    <UserContext.Provider value={[user, dispatchUser]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
