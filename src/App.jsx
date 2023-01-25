//import logo from './logo.svg';
//import './App.css';

import React, { useState } from "react";
import axios from "axios";
import {v4 as uuidv4} from 'uuid'
import {BrowserRouter as Router, Route} from 'react-router-dom'


import './App.css';
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import TaskDetails from "./components/TaskDetails";
import { useEffect } from "react";

const App = () => {
    //let message = "Hello World!";
    const [tasks, setTasks] = useState([
      {
        id: '1',
        title: 'Estudar programação',
        completed: false,
      },
      {
        id: '2',
        title:'Ler Livros',
        completed: true,
      },
    ]);

    useEffect(() => {   //ele executa o bloco de código quando a váriavel mudar, deixando a lisa vazia [], é dizer que o bloco de cógigo é executado quando o componente for monatado pela primeira vez
      const fetchTasks = async () => {
        const { data } = await axios.get("http://localhost:3000/tarefas");
        
        setTasks(data)
      };
        fetchTasks();  //Sempre que or fazer uma requisão dentro do useEffect deve criar uma função assincrona
    }, []);

    const handleTaskClick = (taskId) => {
        const newTasks = tasks.map((task) => {
            if (task.id == taskId) return { ... task, completed: !task.completed }

            return task
        });
      setTasks(newTasks)
    };
    

    const handleTaskAddition = (taskTitle) => {
        const newTasks = [... tasks, {
          title: taskTitle,
          id: uuidv4(),
          completed: false,
      }]

      setTasks(newTasks)
    }

    const handleTaskDeletion = (taskId) => {
        const newTasks = tasks.filter(task => task.id != taskId)

        setTasks(newTasks)
    }

    return (
      <Router>
        <div className="container">
          <Header />
          <Route path="/" exact render={() => (
                <div>
                  <AddTask handleTaskAddition= {handleTaskAddition} />
                  <Tasks 
                      tasks={ tasks } 
                      handleTaskClick={handleTaskClick} 
                      handleTaskDeletion={handleTaskDeletion}
                    />
                </div>
          )}/>
          <Route path="/:taskTitle" exact component={TaskDetails}/>
        </div>
      </Router>
    );
    //<button onClick={() => setMessage("Mudei o estado do componente")}>Mudar mensagem</button> esse botao estava na div de cima, mas n estava dando para comentar.
  }
export default App;





/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
