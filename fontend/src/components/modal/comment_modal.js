import React, { useContext, useEffect, useRef, useState } from 'react'
import { db } from "../../firebase/config"
import { AppContext } from '../../context/appContext'

export default function Comment_modal({post_id = null, task_id = null, bg="bg-[#0e335b]", px="px-4"}) {
  const {user} = useContext(AppContext)
  const [value, set_value] = useState("")
  const [is_reset, set_is_reset] = useState(0)
  const [is_require_user, set_is_require_user] = useState(false)
  const [comments, set_comments] = useState([])
  const input_ref = useRef(null)
  const send_btn_ref = useRef(null)

  useEffect(() => {
    if(post_id) {
      db.collection("comments").where("post_id", "==", post_id)
      .get()
      .then((querySnapshot) => {
        const data = []
        querySnapshot.forEach((doc) => {
            data.push(doc.data())
        });
        set_comments(data.reverse())
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
    } else if(task_id) {
      db.collection("comments").where("task_id", "==", task_id)
      .get()
      .then((querySnapshot) => {
        const data = []
        querySnapshot.forEach((doc) => {
            data.push(doc.data())
        });
        set_comments(data.reverse())
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
    }
  }, [is_reset])

  let options = {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }

  function handle_send_comment() {
    if(user) {
      let formatter = new Intl.DateTimeFormat([], options);
      db.collection("comments").add({
        username: user.username,
        u_id: user.id,
        comment: value,
        comment_time: formatter.format(new Date()),
        post_id: post_id,
        task_id: task_id
      })
      set_is_reset(Math.random())
    } else {
      set_is_require_user(true)
    }
  }

  return (
    <div className={`${bg} w-full ${px} py-4 rounded mt-4 overflow-x-hidden`}>
      <div className="text-2xl text-[#a0d8fa] font-semibold flex items-center"><i class="fa-solid fa-comment mr-4"></i> Comment</div>
      <div className="my-4 ">
        <textarea ref={input_ref} value={value} onChange={(e) => set_value(e.target.value)} className={`w-full h-20 p-2 outline-none ${bg} border border-white focus:border-[#a0d8fa] resize-none rounded`} placeholder="Nhập bình luận tại đây"></textarea>
        <div ref={send_btn_ref} onClick={() => handle_send_comment()} className={`text-xl mt-2 px-4 py-1 border border-[#a0d8fa] w-fit rounded hover:brightness-90 cursor-pointer select-none transition-all ${value.length === 0 ? "" : "bg-[#a0d8fa]"}`}><i class="fa-solid fa-paper-plane"></i></div>
      </div>
      <ul className="p-0">
        {comments.map((cm,i) => 
          <li className="mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 grid place-content-center text-3xl rounded-full bg-white text-[#007BFF] font-bold mr-4">{cm && cm.username[0].toUpperCase()}</div>
              <div className="text-lg">
                <div className="text-lg font-semibold">{cm.username}</div>
                <div className="text-base text-slate-300">{cm.comment_time}</div>
              </div>
            </div>
            <div className="pl-14 mt-1">
              {cm.comment}
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}
