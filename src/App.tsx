import './App.css'
import { Footer } from './components/Footer'
import Header from './components/Header'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import { ITask } from './interfaces/Tasks'
import { useState } from 'react'
import { Modal } from './components/Modal'

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)
  const deleteTask = (id: number) => {
    setTaskList(taskList.filter(task => {
      return task.id !== id
    }))
  }
  
  const showHideModal = (display: boolean) => {
    const modal = document.querySelector('#modal');
    if(display){
      modal!.classList.remove('hide');
    }else{
      modal!.classList.add('hide');
    }
  }

  const editTask = (task: ITask):void => {
    showHideModal(true);
    setTaskToUpdate(task);
  }

  const updateTask = (id: number, title: string, difficult: number) => {
    const updatedTask: ITask = {id, title, difficult}
    const updateItems = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task;
    })

    setTaskList(updateItems);
    showHideModal(false);
  }

  return (
    <>
      <Modal children={<TaskForm handleUpdate={updateTask} task={taskToUpdate} btnText='Edit Task' taskList={taskList} />} />
      <Header/>
      <main className='bg-gray-700 w-full h-screen flex flex-col justify-start items-center'>
        <div className='mt-8 w-1/2 h-fit flex flex-col justify-center items-center'>
          <h2 className='text-3xl text-white'>O que você vai fazer?</h2>
          <TaskForm btnText='Create Task' taskList={taskList} setTaskList={setTaskList}/>
        </div>
        <div className='mt-8 w-1/2 h-fit flex flex-col justify-center items-center'>
          <h2 className='text-3xl text-white'>Suas tarefas:</h2>
          <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask}/>
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default App