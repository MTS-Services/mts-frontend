import * as React from 'react';
import { useState } from 'react';

import { Link } from "react-router";

function Contact() {
  return (
<div className="min-h-screen flex items-center justify-cen  mx-auto px-4 bg-center bg-background">
<div>
    <div>
    <img className="w-[900px]" src="/assits/404bg/logocolor.svg" alt="Logo" />
    <h3>shhs</h3>
  </div>
  <div>
    <Link
      to="/"
      className="inline-block bg-cta text-cta-text text-base sm:text-lg font-semibold px-8 py-3 rounded-full shadow-md hover:bg-cta-active hover:text-cta-txt-active hover:scale-105 transform transition duration-300 ease-in-out"
    >
      ⬅️ Back to Home
    </Link>
  </div>
</div>
</div>    
  );
}

export default Contact;






