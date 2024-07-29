import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/appContext'
import User_dashboard from '../../modal/user_modal/user_dashboard'
import User_bot from '../../modal/user_modal/user_bot'
import User_post from '../../modal/user_modal/user_posts'
import User_training from '../../modal/user_modal/user_training'
import { useParams } from 'react-router-dom'

export default function User() {
    const { user, history } = useContext(AppContext)
    const { id } = useParams()
    // const { username } = user
    const [username, set_username] = useState()
    const [page, set_page] = useState("dashboard")
    const [data, set_data] = useState(JSON.parse(localStorage.getItem("data")))
    // console.log(JSON.parse(localStorage.getItem("data")))

    useEffect(() => {
        if(id) {
            fetch("https://coganh.onrender.com/get_all_user_data/" + id)
            .then(res => res.json())
            .then(data => {set_data(data); set_username(data.username)})
        }
    }, [id])

    useEffect(() => {
        document.querySelectorAll(".U_nav_item").forEach(item => {
            item.onclick = () => {
                set_page(item.dataset.name)
            }
        })
    }, [])


    localStorage.setItem("data", JSON.stringify(data))

    // if(data.training) {
    //     data.training = [] 
    //     data.posts = [] 
    //     console.log(JSON.stringify(data))
    // }


    return (
        <div className="w-full h-screen flex">
            <div className="U_side_bar w-1/4 h-full bg-[#0B427E] flex flex-col">
                <div className="U_user flex flex-col items-center w-full px-5 py-5 mb-5 bg-[#0757AD]">
                    <div className="U_avatar text-5xl mb-5 bg-[#007BFF] min-w-16 min-h-16 rounded-full grid place-content-center">{username && username[0].toUpperCase()}</div>
                    <div className="U_info">
                        <div className="U_name text-2xl text-center">{username}</div>
                        <div className="U_title text-center text-xl">{"<title>"}</div>
                    </div>
                </div>
                <ul className="U_nav_list p-0">
                    <li data-name="dashboard" className={`U_nav_item text-xl px-5 py-5 hover:bg-blue-600 hover:bg-opacity-50 rounded-md cursor-pointer select-none bg-opacity-80 ${page === "dashboard" ? "bg-blue-700" : ""}`}>
                        <i class="fa-solid fa-chart-line mr-5"></i>
                        Dash board
                    </li>
                    <li data-name="bot" className={`U_nav_item text-xl px-5 py-5 hover:bg-blue-600 hover:bg-opacity-50 rounded-md cursor-pointer select-none bg-opacity-80 ${page === "bot" ? "bg-blue-700" : ""}`}>
                        <i className="fa-solid fa-robot mr-5"></i>
                        Bot
                    </li>
                    <li data-name="post" className={`U_nav_item text-xl px-5 py-5 hover:bg-blue-600 hover:bg-opacity-50 rounded-md cursor-pointer select-none bg-opacity-80 ${page === "post" ? "bg-blue-700" : ""}`}>
                        <i className="fa-solid fa-book-open mr-5"></i>
                        Blog
                    </li>
                    <li data-name="training" className={`U_nav_item text-xl px-5 py-5 hover:bg-blue-600 hover:bg-opacity-50 rounded-md cursor-pointer select-none bg-opacity-80 ${page === "training" ? "bg-blue-700" : ""}`}>
                        <i class="fa-solid fa-graduation-cap mr-5"></i>
                        Training
                    </li>
                </ul>
                <div onClick={() => history("/menu")} className="U_back_btn text-xl mt-auto mb-10 mx-auto bg-[#007BFF] px-10 py-2 rounded-sm hover:brightness-90 cursor-pointer select-none">back to menu</div>
            </div>
            <div className="U_content w-3/4 h-full p-10 overflow-scroll">
                {page === "dashboard" && data && <User_dashboard data={data}/>}
                {page === "bot" && <User_bot bots={data.bots}/>}
                {page === "post" && <User_post posts={data.posts}/>}
                {page === "training" && <User_training tasks={data.tasks} your_tasks={data.your_tasks}/>}
            </div>
        </div>
    )
}
