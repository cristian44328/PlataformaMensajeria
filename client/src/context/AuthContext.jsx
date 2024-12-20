import { createContext, useContext, useEffect, useState } from "react";
import { registerReq, loginReq, verifyTokenReq } from '../api/auth';
import Cookies from 'js-cookie';
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:4000" : "/";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within a AuthProvider");
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const checkAuth = async () => {
        try {
            const res = await verifyTokenReq(Cookies.get("token")); 
            if (!res.data) {
                setIsAuthenticated(false);
                setUser(null);
                return;
            }
            setUser(res.data);
            setIsAuthenticated(true);
            connectSocket(res.data._id);
        } catch (error) {
            console.log("Error in checkAuth:", error);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false); 
        }
    };    

    const signup = async (user) => {
        try {
            const res = await registerReq(user);
            // console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
            connectSocket(res.data._id);
        } catch (error) {
            //console.log(error.response);
            setErrors(error.response.data);
        }
    };

    const signin = async (user) => {
        try {
            const res = await loginReq(user);
            console.log(res)
            setUser(res.data);
            setIsAuthenticated(true);
            connectSocket(res.data._id);
        } catch (error) {
            //console.log(error.response.data);
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message])
        }
    }

    const logout = () => {
        try {
            Cookies.remove("token");
            setUser(null);
            setIsAuthenticated(false);
            disconnectSocket();
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer);
        }
    }, [errors])

    useEffect(() => {
        checkAuth();
    }, []);

    const connectSocket = (userId) => {
        if (!userId || socket) return; 
      
        const newSocket = io(import.meta.env.VITE_BACKEND_URL, {
          query: { userId }, 
        });
      
        setSocket(newSocket); 
      
        // Eventos de Socket.IO
        newSocket.on("connect", () => {
          console.log("Socket connected");
        });
      
        newSocket.on("getOnlineUsers", (users) => {
          setOnlineUsers(users); 
        });
      
        newSocket.on("disconnect", () => {
          console.log("Socket disconnected");
        });
      };

      const disconnectSocket = () => {
        if (socket) {
          socket.disconnect();
          setSocket(null);
        }
      };
      
    return (
        <AuthContext.Provider value={{
            checkAuth,
            signup,
            signin,
            logout,
            loading,
            user,
            isAuthenticated,
            errors,
            onlineUsers,
        }}>
            {children}
        </AuthContext.Provider>
    )
}