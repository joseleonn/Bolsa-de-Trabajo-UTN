import React from 'react'
import TelegramIcon from '../assets/icons8-telegram-app-150.png'

const BotButton = () => {
  return (
    <div className="fixed bottom-0 right-0 mb-4 mr-4">
      <a href="http://t.me/utn_buddy_bot">
        <button className="w-20 h-20 bg-[#1E40AF] hover:bg-blue-700 text-white font-bold rounded-full flex items-center justify-center">
          <img
            src={TelegramIcon}
            alt="Imagen del botón"
            className="w-10 h-10"
          />
        </button>
      </a>
    </div>
  )
}

export default BotButton
