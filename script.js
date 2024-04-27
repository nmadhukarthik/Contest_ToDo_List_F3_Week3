
let Addbtn = document.querySelector("#Addbtn")
let taskName = document.querySelector("#itemName")
let endDate = document.querySelector("#deadLine")
let taskPriority = document.querySelector("#Priorities")
let Form = document.querySelector("form")

let todayList = document.querySelector("#Today")
let futureList = document.querySelector("#Future")
let completedList = document.querySelector("#Completed")


let arr = []
let id = 0


Form.addEventListener("submit", (events) => {
    events.preventDefault()
})

Addbtn.addEventListener("click", addItem)
function addItem() 
{
    let obj = {
        "name": taskName.value,
        "date": endDate.value,
        "priority": taskPriority.value,
        "completed": false
    }

    console.log(obj)

    arr.push(obj)
    let todoListArrayString = JSON.stringify(arr)
    localStorage.setItem("todoListArray", todoListArrayString)


    let date = new Date()   // gives date + time
    let dateWithoutTime = date.toLocaleDateString()  // to only date
    let dateWithoutTimeArrayReverse = dateWithoutTime.split("/").reverse()
    //let dateWithoutTimeArrayReverse = dateWithoutTimeArray.reverse()
    let dateWithoutTimeInReqFormat = dateWithoutTimeArrayReverse.join("-")
    console.log(dateWithoutTimeInReqFormat)


    let taskCard = document.createElement("div")
    taskCard.className = "taskCard"
    taskCard.setAttribute("id", id)
    id++
    taskCard.innerHTML = `<table style="width: 100%; background-color: black; color: white; border-radius: 5px;"> 
                                    <tr > 
                                    <td style="width: 30%">${id}. ${obj.name}</td> 
                                    <td style="width: 30%">${obj.date}</td> 
                                    <td style="width: 30%">priority:${obj.priority}</td>
                                    <td style="width: 10%"> <input type="radio" id="tick" value="0"><button id="delete" style="border: 1px solid white; width:40px; "><i class="fa-solid fa-trash"></i></button></td> 
                                    </tr>
                              </table>`


    if (obj.date == dateWithoutTimeInReqFormat) 
    { todayList.append(taskCard) }
    else if (obj.date < dateWithoutTimeInReqFormat)
    { 
        futureList.append(taskCard) 
        taskCard.classList.add("delayed")
    }
    else
    { futureList.append(taskCard) }


    let deleteBtn = document.querySelector("#delete")
    deleteBtn.setAttribute("id", id)
    deleteBtn.addEventListener("click", ()=>{
        let id = deleteBtn.getAttribute("id")
        if(taskCard.innerHTML.includes(id))
        {taskCard.remove()}
    })


    let chked = document.querySelector("#tick")
    chked.setAttribute("id", id)
    chked.addEventListener("change", ()=>{
    if (chked.checked) {
        console.log(chked.value)
        let id = chked.getAttribute("id")
        if (taskCard.innerHTML.includes(id)) { completedList.append(taskCard) }
    }
   })
}




// function check()
// {
//      if(obj.date < dateWithoutTimeInReqFormat)
//      {
//          if(chked.value!=0)
//          { taskCard.ClassList.add(delayed) }
//      }
// }
// check()

