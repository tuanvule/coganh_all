import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/appContext';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

export default function User_training({tasks, your_tasks}) {
  const { history } = useContext(AppContext)

  function parseDateString(dateString) {
    let [datePart, timePart, period] = dateString.split(/[\s,]+/);
    // Tách phần ngày thành tháng, ngày và năm
    let [month, day, year] = datePart.split('/');
    // Tách phần thời gian thành giờ, phút và giây
    let [hour, minute, second] = timePart.split(':');
    
    hour = parseInt(hour, 10);
    if (period === 'PM' && hour !== 12) {
        hour += 12;
    } else if (period === 'AM' && hour === 12) {
        hour = 0;
    }

    // Định dạng giờ, phút và giây với 2 chữ số
    hour = String(hour).padStart(2, '0');
    minute = String(minute).padStart(2, '0');
    second = String(second).padStart(2, '0');

    // Tạo đối tượng Date với múi giờ Asia/Ho_Chi_Minh
    return new Date(year,month,day,hour,minute,second);
  }


  // Sắp xếp danh sách chuỗi thời gian

  function sort_task(tasks) {
    return tasks.sort((a, b) => {
      let dateA = parseDateString(a.submit_time);
      let dateB = parseDateString(b.submit_time);
      return (dateA - dateB);
    });
  }

  function handle_satus(status) {
    switch (status) {
      case "AC":
        return "text-blue-400  shadow-blue-400"
      case "WA":
        return "text-red-500  shadow-red-500"
      case "SE":
        return "text-red-500  shadow-red-500"
      case "TLE":
        return "shadow-white"
      default:
        return "shadow-white"
    }
  }
  // console.log(tasks, your_tasks)
  return (
    <div className="w-full ">
      <div className="statistical w-full flex justify-between mb-5">
        <div className="statistical_bot w-[48%] h-72 rounded-lg bg-[#0b427e] text-white py-5 grid grid-rows-5 grid-flow-col">
          <div className="statistical_title text-2xl font-bold px-5">CÁC BÀI ĐÃ ĐĂNG</div>
          <div className="grid grid-cols-2 row-span-4">
            <div className="flex flex-col items-center justify-center">
              {/* <p className="text-xl font-semibold mb-5">Số bot sở hữu</p> */}
              <div className="statistical_bot-circle w-32 h-32 rounded-full bg-[#202634] text-[#a0d8fa] flex flex-col justify-center items-center">
                <span className="text-2xl text-[#a0d8fa] font-bold">Số bài</span>
                <div className="text-5xl text-[#a0d8fa]">{your_tasks.length}</div>

              </div>
            </div>
            <div className="text-2xl flex flex-col justify-center">
              {/* <div>Thông số</div> */}
              <ul className="p-0">
                <li className="text-lg">
                  <span className=" font-bold text-xl">Số người thử thách: </span>{your_tasks.reduce((cur, task) => cur + Object.keys(task).length, 0)}
                </li>
                <li className="text-lg">
                  <span className=" font-bold">Số submit : </span>{your_tasks.reduce((cur, task) => cur + task.submission_count, 0)}
                </li>
                <li className="text-lg">
                  <span className="text-white font-bold">Số Accept : </span>{your_tasks.reduce((cur, task) => cur + task.accepted_count, 0)}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="statistical_training w-[48%] h-72 rounded-lg bg-[#0b427e] p-5 flex flex-col">
          <div className="statistical_title text-2xl self-start font-bold">THÔNG SỐ CÁC BÀI ĐÃ LÀM</div>
          {tasks[0] && (() => {
              const AC_count = tasks.filter(h => h.status === "AC").length
              const WA_count = tasks.filter(h => h.status === "WA").length
              const SE_count = tasks.filter(h => h.status === "SE").length
              let dem = 0
              if(AC_count > 0) dem++
              if(WA_count > 0) dem++
              if(SE_count > 0) dem++
              
              return (<PieChart
                series={[
                {
                  arcLabel: (item) => `${item.value}`,
                  arcLabelMinAngle: 20,
                  data: [
                    { id: 0, value: AC_count, label: 'AC', color: "#1F81C1" },
                    { id: 1, value: WA_count, label: 'WA', color: "#CD151A" },
                    { id: 2, value: SE_count, label: 'SE', color: "red" },
                  ],
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 10, additionalRadius: -10, color: 'gray' },
                  innerRadius: 30,
                  outerRadius: 100,
                  paddingAngle: dem === 3 ? 5 : 0,
                  cornerRadius: 5,
                  startAngle: 0,
                  endAngle: 360,
                  cx: 150,
                  cy: 150,
                },
              ]}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: 'white',
                  font: 'bold 20px sans-serif',
                },
                ["& .MuiChartsLegend-series text"]: {
                  fill: "white !important",
                  font: 'bold 20px sans-serif !important',
                }
              }}
              width={400}
              height={300}
            />)
            })()}
        </div>
      </div>
      <table class="w-full table-auto border-collapse border border-slate-500 mb-5">
        <thead>
          <tr>
            <th className="border border-slate-600 px-1 py-1 text-left">Task</th>
            <th className="border border-slate-600 px-1 py-1 text-left">Submission</th>
            <th className="border border-slate-600 px-1 py-1 text-left">Acceptances</th>
            <th className="border border-slate-600 px-1 py-1 text-left">difficult</th>
            <th className="border border-slate-600 px-1 py-1 text-left">Challenger</th>
          </tr>
        </thead>
        <tbody>
          {your_tasks.map((task, i) =>                 
          <tr key={i}>
            <td onClick={() => history(`/training/${task.id}`, {state: {task: task}})} className="border border-slate-600 px-1 py-1 font-semibold cursor-pointer hover:text-slate-200">{task.task_name}</td>
            <td className="border border-slate-600 px-1 py-1">{task.submission_count}</td>
            <td className="border border-slate-600 px-1 py-1">{task.accepted_count}</td>
            <td className={`border border-slate-600 px-1 py-1 task_difficult [text-shadow:0px_0px_12px_var(--tw-shadow-color)] shadow-white ${task.tag.difficult}`}>{task.tag.difficult}</td>
            <td className="border border-slate-600 px-1 py-1">{Object.keys(task.challenger).length}</td>
          </tr>
          )}
        </tbody>
      </table>
      <table class="w-full table-auto border-collapse border border-slate-500">
        <thead>
          <tr>
            <th className="border border-slate-600 px-1 py-1 text-left">Status</th>
            <th className="border border-slate-600 px-1 py-1 text-left">Task</th>
            <th className="border border-slate-600 px-1 py-1 text-left">Time Submitted</th>
            <th className="border border-slate-600 px-1 py-1 text-left">Runtime</th>
          </tr>
        </thead>
        <tbody>
          {tasks[0] && sort_task(tasks).reverse().map((task, i) => 
            <tr key={i}>
              <td className={`border border-slate-600 px-1 py-1 font-bold text-lg [text-shadow:0px_0px_12px_var(--tw-shadow-color)] ${handle_satus(task.status)}`}>{task.status}</td>
              <td onClick={() => history(`/training/${task.id}`)} className="border border-slate-600 px-1 py-1 font-semibold cursor-pointer hover:text-slate-200">{task.task_name}</td>
              <td className="border border-slate-600 px-1 py-1">{task.submit_time}</td>
              <td className="border border-slate-600 px-1 py-1">{task.run_time.toFixed(2)} ms</td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
