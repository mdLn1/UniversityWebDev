import React from "react";

const defaultVal = { authenticated: false, user: null, token: "" };

export const AuthContext = React.createContext(defaultVal);
