import { useState } from "react";
import '../styles/leftNav.css'
import navLinks from "../dummyData/navLinks";

const LeftNav = () => {
    const [selectedItem, setSelectedItem] = useState(1)
    return ( 
        <div className="leftNavContainer">
        <div className="leftNav">
            <div className="logo">
            CodeRush &nbsp; &gt; 
            </div>
            <div className="navLinks">
            {navLinks.map((item)=>{
                return(
                <div key={item.id} className= {`navItem ${selectedItem === item.id ? "selected" : ""}`}  onClick={() => setSelectedItem(item.id)}>
                    <div className="flex gap-2">
                   <span className="navLogo"><item.icon/></span> <span><a style={{color: selectedItem === item.id ? "white" : "black", textDecoration: "none"}} href='#'> {item.name} </a>
                   </span>
                   </div>
                   {selectedItem === item.id && <span>&gt;</span>}
                    </div>
                )
            })}
            </div>
            </div>
        </div>
     );
}
 
export default LeftNav;