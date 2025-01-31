import { ITask } from '../interfaces/Tasks'
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';

type Props = {
    btnText : string,
    taskList: ITask[],
    setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>,
    task?: ITask | null,
    handleUpdate?: (id: number, title: string, difficult: number) => void
}

export const TaskForm = ({btnText, taskList, setTaskList, task, handleUpdate}: Props) => {
    const [id, setId] = useState<number>(0);
    const [title, setTitle] = useState<string>('');
    const [difficult, setDifficult] = useState<number>(0);
    
    useEffect(() => {
        if(task){
            setId(task.id);
            setTitle(task.title);
            setDifficult(task.difficult);
        }
    },[task])

    const addTaskHandler = (e: FormEvent<HTMLFormElement>)=>{
        if (handleUpdate) {
            e.preventDefault();
            handleUpdate(id, title, difficult);
        } else {
            e.preventDefault();
            const id = Math.floor(Math.random() * 1000);
            
            const newTask: ITask = {id, title, difficult};

            setTaskList!([...taskList, newTask]);

            setTitle('');
            setDifficult(0);
        }
        
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === 'title') {
            setTitle(e.target.value);
        } else {
            setDifficult(parseInt(e.target.value));
        } 
    }

    return ( 
        <form onSubmit={addTaskHandler} className="flex flex-col justify-center items-center w-full">
            <div className="flex flex-col gap-4 mt-3 w-8/12 h-fit">
                <label className="text-white text-xl" htmlFor="title">Title:</label>
                <input onChange={handleChange} value={title} className="bg-gray-200 mt-[-10px] p-2 w-full border-2" type="text" id="title" name="title" placeholder="Task Title" />
            </div>
            <div className="flex flex-col gap-4 mt-3 w-8/12 h-fit">
                <label className="text-white text-xl" htmlFor="difficult">Difficult:</label>
                <input onChange={handleChange} value={difficult} className="bg-gray-200 mt-[-10px] p-2 w-full border-2" type="text" id="difficult" name="difficult" placeholder="Task Difficult" />
            </div>
            <input className="mt-8 w-1/4 h-12 bg-cyan-500 hover:bg-cyan-600 cursor-pointer rounded-sm" type="submit" value={btnText} />
        </form>
    );
}