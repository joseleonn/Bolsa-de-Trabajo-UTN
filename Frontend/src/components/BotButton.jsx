import React from 'react'
import TelegramIcon from '../assets/icons8-telegram-app-150.png'

const BotButton = () => {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end justify-end">
      <a href="http://t.me/utn_buddy_bot" className="">
        <button className="w-14 h-14 bg-blue-500 border hover:bg-blue-700 text-white font-bold rounded-full flex items-center justify-center">
          <img src={TelegramIcon} alt="Imagen del botón" className="w-5 h-5" />
        </button>
      </a>
    </div>
  )
}

export default BotButton
