import React from 'react';
import axios from 'axios';
import SideBar from "../navbar/SideBar";
import NavBar from "../navbar/NavBar";

const HelpCenter = ()=> {

    return(
        <div className="flex h-screen w-full first-container">
            <div className="h-full">
                <SideBar />
            </div>
            <div className="w-full overflow-auto">
                <NavBar text={'Help Center'}/>
                <div>
                    <h2>Help Center</h2>
                </div>
            </div>
        </div>
    )
}

export default HelpCenter;