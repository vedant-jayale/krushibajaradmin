
import "./Navbar.css"
import logo from "../../assets/logo.png"
import profile from "../../assets/vedant profile photo .jpg";


const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='nav-logo'>
          <img src={logo} alt ="" />
          <p>कृषि बाजार</p>                                  

       </div>
       <div className="profile-photo-container">
              <img src={profile} alt="" className='nav-profile' />
       </div>
      
    </div>
  )
}

export default Navbar
