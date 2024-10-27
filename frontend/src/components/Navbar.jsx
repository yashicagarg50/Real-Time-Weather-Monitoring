import React from 'react';
import { UilUser } from "@iconscout/react-unicons";

function Navbar({ onCityChange }) {  // Receive the callback as a prop
    const cities = [
        { id: 1, name: "Delhi" },
        { id: 2, name: "Mumbai" },
        { id: 3, name: "Chennai" },
        { id: 4, name: "Bangalore" },
        { id: 5, name: "Kolkata" },
        { id: 6, name: "Hyderabad" }
    ];

    return (
        <div className="flex items-center justify-between my-6">
            <div className="flex">
                {cities.map((city) => (
                    <button
                        key={city.id}
                        className="text-white text-lg font-medium mx-2 transition duration-300 hover:scale-105"
                        onClick={() => onCityChange(city.name)}  // Fetch weather when city is clicked
                    >
                        {city.name}
                    </button>
                ))}
            </div>

            <button className="ml-auto">
                <UilUser size={25} className="text-white transition duration-300 hover:scale-105" />
            </button>
        </div>

    );
}

export default Navbar;
