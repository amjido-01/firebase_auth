import { useAuth } from "../Auth/AuthContext"
export const Profile = () => {
    const {currentUser} =useAuth(); 
  return (
    <div className="pt-20">
        <h3>Welcome to your profile page</h3>
        <p>{currentUser?.displayName || currentUser.email}</p>
    </div>
  )
}
