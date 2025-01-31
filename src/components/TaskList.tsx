import { ITask } from '../interfaces/Tasks'
import { useState } from 'react'
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

type Props = {
    taskList: ITask[],
    handleDelete: (id: number) => void,
    handleEdit: (task: ITask) => void
    // handleEdit: (id: number) => void
}
export const TaskList = ({taskList, handleDelete, handleEdit}: Props) => {
    return ( 
        <>
         {taskList.length > 0 ? (
            taskList.map((task) => (
                <div className='bg-gray-800 w-8/12 text-white p-4 m-2 flex justify-between' key={task.id}>
                    <div className='flex flex-col gap-4'>
                        <h4 className='text-2xl font-semibold'>{task.title}</h4>
                        <p>Difficult: {task.difficult}</p>
                    </div>
                    <div className='flex gap-4'>
                        <FaEdit onClick={() => handleEdit(task)} className='cursor-pointer hover:cursor-pointer hover:text-gray-400 transition-all duration-300'/>
                        <FaTrash onClick={() => handleDelete(task.id)} className='cursor-pointer hover:cursor-pointer hover:text-gray-400 transition-all duration-300'/>
                    </div>
                </div>
            ))
         ) : (
            <p className='text-gray-800'>There are no tasks</p>
         )}
        </>
    );
}