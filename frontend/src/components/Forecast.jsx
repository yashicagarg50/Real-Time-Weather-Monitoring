import React from "react";
function Forecast() {
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">HOURLY FORECAST</p>
      </div>
      <hr className="my-2" />

      <div className="flex flex-row items-center justify-between text-white">
        <div className="flex flex-col items-center justify-center">
          <p className="font-light text-sm"> 03:30 PM</p>
          <img
            src="http://openweathermap.org/img/wn/01d@2x.png"
            className="w-12 my-1"
            alt=""
          />
          <p className="font-medium">22°</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="font-light text-sm"> 05:30 PM</p>
          <img
            src="http://openweathermap.org/img/wn/01d@2x.png"
            className="w-12 my-1"
            alt=""
          />
          <p className="font-medium">22°</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="font-light text-sm"> 07:30 PM</p>
          <img
            src="http://openweathermap.org/img/wn/01d@2x.png"
            className="w-12 my-1"
            alt=""
          />
          <p className="font-medium">22°</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="font-light text-sm"> 9:30 PM</p>
          <img
            src="http://openweathermap.org/img/wn/01d@2x.png"
            className="w-12 my-1"
            alt=""
          />
          <p className="font-medium">22°</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="font-light text-sm"> 11:30 PM</p>
          <img
            src="http://openweathermap.org/img/wn/01d@2x.png"
            className="w-12 my-1"
            alt=""
          />
          <p className="font-medium">22°</p>
        </div>



      </div>

      <div>
        <div className="flex items-center justify-start mt-6">
          <p className="text-white font-medium uppercase">DAILY FORECAST</p>
        </div>
        <hr className="my-2" />

        <div className="flex flex-row items-center justify-between text-white">
          <div className="flex flex-col items-center justify-center">
            <p className="font-light text-sm"> Mon</p>
            <img
              src="http://openweathermap.org/img/wn/01d@2x.png"
              className="w-12 my-1"
              alt=""
            />
            <p className="font-medium">22°</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p className="font-light text-sm"> Tue</p>
            <img
              src="http://openweathermap.org/img/wn/01d@2x.png"
              className="w-12 my-1"
              alt=""
            />
            <p className="font-medium">22°</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p className="font-light text-sm">Wed</p>
            <img
              src="http://openweathermap.org/img/wn/01d@2x.png"
              className="w-12 my-1"
              alt=""
            />
            <p className="font-medium">22°</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p className="font-light text-sm"> Thu</p>
            <img
              src="http://openweathermap.org/img/wn/01d@2x.png"
              className="w-12 my-1"
              alt=""
            />
            <p className="font-medium">22°</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p className="font-light text-sm"> Fri</p>
            <img
              src="http://openweathermap.org/img/wn/01d@2x.png"
              className="w-12 my-1"
              alt=""
            />
            <p className="font-medium">22°</p>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Forecast;