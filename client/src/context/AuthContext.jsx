import { createContext , useContext , useEffect , useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children })=>{

    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const [user , setUser] = useState(null);

    const verifyAuth = async ()=>{

        try{

            const res = await fetch("http://localhost:5000/api/users/me" , {
                method: 'GET',
                credentials: "include",
            });

            const data = await res.json();

            if(res.ok){

                setUser(data.data);
                setIsLoggedIn(true);

            }

            else{

                setUser(null);
                setIsLoggedIn(false);

            }

        } catch(error){
            console.error("Auth verification failed : " , error);
            setUser(null);
            setIsLoggedIn(false);
        }

    };

    useEffect(()=>{
        verifyAuth();
    } , []);



    return(
        <AuthContext.Provider value={{isLoggedIn , user , setIsLoggedIn , setUser}}>

        {children}

        </AuthContext.Provider>
    );


};


export const useAuth = () => useContext(AuthContext);

