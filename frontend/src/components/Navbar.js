import React, { useState, useEffect } from "react";
import '../App.css';


function Navbar() {

    return (
        <div className="navbar">
            <a href="/">Accueil</a>
            <a href="/signup">Signup</a>
            <a href="/login">Login</a>

        </div>
    )


}

export default Navbar;