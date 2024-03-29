import { useState } from "react"
import Modal from "./Modal"

const ListItem = ({task, getData}) => {
    const [showModal, setShowModal] = useState(false)

    const deleteItem = async () =>{
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/attraction/${task.id}`,{
          method: 'DELETE'
        })
        if(response.status === 200){
          getData()
        }
      } catch (err) {
        console.error(err)
      }
    }

    return (
      <li className="list-item">

        <div className="info-container">
          <p className="task-title">{task.title}</p>
        </div>

        <div className="button-container">
          <button className="edit" onClick={() => setShowModal(true)}>EDIT</button>
          <button className="delete" onClick={deleteItem}>DELETE</button>
        </div>
        {showModal && <Modal mode={'edit'} set setShowModal={setShowModal} getData={getData} task={task}/>}
      </li>
      
    )
  }
  
  export default ListItem
  