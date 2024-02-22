import ListHeader from "./components/ListHeader"
import ListItem from "./components/ListItem"
import Auth from "./components/Auth"
import { useEffect, useState } from "react"
import { useCookies } from 'react-cookie';

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const userEmail = cookies.Email
  const authToken = cookies.AuthToken
  // Переместите объявление состояния на верхний уровень компонента
  const [tasks, setTasks] = useState(null)

  // Функция для получения данных
  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/attraction/${userEmail}`)
      const json = await response.json()
      setTasks(json)
    } catch (err) {
      console.error(err)
    }
  }

  // Вызов getData в useEffect
  useEffect(() => {
    if(authToken){
      getData() // Вызов функции getData
    }
  }, [authToken]) // Включение authToken в массив зависимостей
  
  console.log(tasks)

  //Cортировка по дате
  const sortedTasks = tasks?.sort((a,b) => new Date (a.date) - new Date(b.date))

  return (
    <div className="app">
      {!authToken && <Auth/>}
      {authToken && 
        <>
        <ListHeader listName={"🌏 Достопримечательности Беларуси"} getData={getData} />
        <p className="user-email">Добро пожаловать {userEmail}</p>
        {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData}/>)}
        </>}
        <p className="copyright">hi 2024</p>
    </div>
  )
}

export default App
