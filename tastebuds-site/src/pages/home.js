import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return(
<div>
    <h1>Welcome to TasteBuds</h1>
    <p>Log in {" "}
          <nav>
            <Link to="/Login">Here!</Link>
            </nav>
        </p>
        <p>
          Don't have an account? Sign up{" "}
          <nav>
            <Link to="/signup">Here!</Link>
            </nav>
        </p>
    </div>
    );
}

export default HomePage;