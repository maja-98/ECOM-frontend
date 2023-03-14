import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isAdmin = false
    let status = "User"
    if (token){
        const decoded = jwtDecode(token)
        
        const {username,role,userId} = decoded.UserInfo
        isAdmin = role==='Admin'
        if ( isAdmin ) status = "Admin"
        return {username,userId,role,status,isAdmin}
    }
    return {username:'',userId:'',roles:[],status,isAdmin}
}

export default useAuth