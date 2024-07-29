import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import "../../style/post.css"
import { AppContext } from '../../context/appContext'
import Comment_modal from '../modal/comment_modal'
import Navbar from '../primary/navbar'

export default function Post() {
  const { theme } = useContext(AppContext)
  const { state } = useLocation()
  const { post_id } = useParams()
  const [post, set_post] = useState({})
  useEffect(() => {
    if (typeof state !== "string") {
      set_post(state)
    } else {
      fetch("https://coganh.onrender.com/get_post_by_id/" + post_id)
        .then(res => res.json())
        .then(data => set_post(data))
        .catch(err => console.log(err))
    }
  }, [state, post_id])

  useEffect(() => {
    document.querySelectorAll(".notion-enable-hover").forEach(item => {
      if(theme === "dark") {
        item.style.backgroundColor = "#444"
        item.style.color = "#fff"
      }
    })
    document.querySelectorAll("a").forEach(item => {
        item.style.textDecoration = "underline"
        item.style.color = "#0866FF"
    })
    document.querySelectorAll("figcaption").forEach(item => {
      if(theme === "dark") {
        item.style.color = "#ccc"
        item.style.textDecoration = "none"
      }
    })
  })


  return (
    <div className="w-full h-full flex justify-center">
      <Navbar back_link="/post_page"/>
      <div className="P_container">
        <h1 className="P_title">{post.title}</h1>
        <div className="P_user">
          <div className="P_user_avatar">{post.author && post.author[0].toUpperCase()}</div>
          <div className="P_user_info">
            <div className="P_user_name">{post.author}</div>
            <div className="time">{post.upload_time}</div>
          </div>
          <div className="selection">
            <div className="copy_link">
              <i className="fa-solid fa-link" />
            </div>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        <Comment_modal post_id={post_id}/>
      </div>
    </div>

  )
}
