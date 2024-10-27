import React, { useState, useEffect } from 'react';

function TimeAndLocation({ city }) {  
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run effect only once

  return (
    <div>
      <div className="flex justify-center items-center my-6">
        <p className="text-xl text-white font-extralight">
          {currentTime.toLocaleString()}  {/* Show current date and time */}
        </p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="text-3xl text-white font-medium">
          {city} {/* Show selected city */}
        </p>
      </div>
    </div>
  );
}

export default TimeAndLocation;
