import React from "react";
import TelegramIcon from "../assets/icons8-telegram-app-150.png";
import WhatSappIcon from "../assets/whatsapp.png";
const BotButton = () => {
  return (
    <div className="fixed bottom-0 right-0 z-50 mb-4 mr-4">
      {/* Primer botón */}
      <a href="http://t.me/utn_buddy_bot">
        <button className="w-20 h-20 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-full flex items-center justify-center">
          <img
            src={TelegramIcon}
            alt="Imagen del botón"
            className="w-10 h-10"
          />
        </button>
      </a>

      {/* Segundo botón (arriba del primer botón) */}
      <a href="https://wa.me/543416695327">
        <button className="w-20 h-20 bg-[#25d366] hover:bg-white-700 text-white font-bold rounded-full flex items-center justify-center mt-4">
          {
            <img
              src={WhatSappIcon}
              alt="Imagen del botón"
              className="w-10 h-10"
            />
          }
        </button>
      </a>
    </div>
  );
};

export default BotButton;
