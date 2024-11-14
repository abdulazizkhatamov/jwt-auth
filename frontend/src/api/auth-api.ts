/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

export const postRegister = async ({username, password}: {username: string, password: string}) => {
    try {
        const response = await axios.post("/api/register", {username, password});

        return response.data;
    } catch (err) {
        throw new Error("Register failed.")
    }
}

export const postLogin = async ({ username, password }: { username: string, password: string }) => {
    try {
      const response = await axios.post("/api/login", { username, password });
      
      return response.data; // Return the access token
    } catch (err) {
      throw new Error("Login failed");
    }
};

export const postRefreshAccessToken = async () => {
    try {
        const response = await axios.post("/api/refresh-token", {}, {withCredentials: true});

        return response.data;
    } catch(err) {
        throw new Error("Refreshing access token failed")
        
    }
}

export const postLogout = async () => {
    try {
        const response = await axios.post("/api/logout", {}, {withCredentials: true});

        return response.data;
    } catch (err) {
        throw new Error("Logout failed")
        
    }
}