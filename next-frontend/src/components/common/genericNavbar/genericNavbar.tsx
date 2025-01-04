import NavbarLinks from "../header/navbarLinks";
import Title from "../header/Title";

export default function GenericNavbar(){
    return (
        <div className="flex items-end justify-between py-5 px-20 w-full">
            <Title fontsize={32}/>
            <div className="flex space-x-10 items-center">    
                <NavbarLinks />
                
            </div>
        </div>
    )
}