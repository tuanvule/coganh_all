import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { AppContext } from '../../context/appContext'
import LoginRequest from './loginRequest'

export default React.memo(function Navbar({ type = {}, back_link = "/menu", mode="dark"}) {
  const { history, user, setUser } = useContext(AppContext)
  const [ is_open_setting, set_is_open_setting ] = useState(false)
  console.log(user)

  function handle_logout() {
    localStorage.clear()
    setUser(null)
  }
  
  return (
    <div className={`fixed top-0 z-[10000000] left-0 right-0 flex items-center justify-between px-4 h-16 border-b border-[#007BFF] ${mode === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
      <div class="left_block">
        <div class="logo">Co ganh</div>
        <p onClick={() => history(back_link)} class="back_btn">quay lại</p>
      </div>

      <div class="right_block">
        { user && <>
          {type.create_content && <a onClick={() => history("/create_content")} class="create_post dark:text-white">Viết bài</a>}
          <div class="w-8 h-8 relative">
            <div onClick={() => set_is_open_setting(!is_open_setting)} className={`dark:hover:brightness-90 h-full ${mode === "dark" ? "bg-white text-[#007BFF]" : "bg-[#007BFF] text-white"} rounded-full text-2xl cursor-pointer grid place-content-center font-semibold select-none`}>
              {user.username && user.username[0].toUpperCase() }
            </div>
            { is_open_setting && 
            <ul className="absolute p-0 w-32 -right-4 top-5 bg-black bg-opacity-35 px-2 py-2 rounded">
              <li onClick={() => history("/user/" + user.id)} className="py-1 hover:bg-slate-700 px-1 rounded cursor-pointer select-none">Trang cá nhân</li>
              <li onClick={() => {handle_logout(); console.log(123)}} className="py-1 hover:bg-slate-700 px-1 rounded cursor-pointer select-none">Đăng xuất</li>
            </ul>}
          </div>
        </>}
        { !user && <>
          <div onClick={() => history("/login")} className="text-lg ml-2 px-4 py-1 rounded bg-[#007BFF] hover:brightness-90 cursor-pointer select-none">Đăng nhập</div>
        </>}
      </div>
    </div>
  )
})
