import React, { useContext } from 'react'
import { AppContext } from '../../../context/appContext'

export default function User_post({posts}) {
  const { history } = useContext(AppContext)
  return (
    <div className=" h-full flex flex-col">
      <div className="w-full flex">
        <a onClick={() => history("/create_content")} class="dark:text-white px-5 py-1 rounded-lg border cursor-pointer select-none hover:bg-white transition-all dark:hover:text-black ml-auto">Viết bài</a>
      </div>
      <div className="">
        <ul className="p-0 flex justify-between">
          {posts.map(post => 
          <li onClick={() => history("/post/" + post.post_id, { state: post })} className=" h-96 w-[30%] bg-[#0b427e] rounded-lg overflow-hidden shadow-2xl hover:shadow-blue-300 hover:scale-105 cursor-pointer transition-all">
            <div className=" w-full h-2/4 select-none bg-white brightness-95">
              <img className=" object-contain " src={post.image_url[0] ? post.image_url[0] : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTErUSgyq868y3dMVxYIbdUe1d9NV1tL4jtbA&s"}></img>
            </div>
            <div className="p-2 mb-2 h-2/4 flex flex-col">
              <div className="text-2xl mb-2">
                {post.title}
              </div>
              <div className=" text-gray-200">
                {post.description}
              </div>
              <div className=" text-gray-200 mt-auto">
                {post.upload_time}
              </div>
            </div>
          </li>)}
        </ul>
      </div>
      {posts.length === 0 && 
      <div className="flex-1 grid place-content-center text-4xl pb-28">
        Bạn chưa tạo bài blog nào
      </div>
      } 
    </div>
  )
}
