import { cError, cSuccess } from "../config/chalkConfig.js";
import { Task } from "../models/TaskSchema.js";
import { User } from "../models/UserSchema.js";

export const getTasks = async (req, res) => {

    const {username} = req.params;
    const {id} = req.query || req.body;

    try {
        const user = await User.findOne({username}).select('-password').lean().exec();
        if (!user) return res.status(404).json({message: 'Usuário não existe.'});
    
        const tasks = await Task.find({userId: user._id}).lean().exec();
        if (tasks.length === 0) return res.json({message: 'Nenhuma tarefa encontrada.'})
        res.json(tasks);

    } catch (err){
        cError(err.stack);
        res.status(500).json(err.message);
    }

}

export const createTask = async (req, res) => {

    const {username} = req.params;
    const {title, description, type, to_do, due_date} = req.body;

    if (!title) return res.json({message: 'Campos obrigatórios não preenchidos.'});

    try{
        const user = await User.findOne({username}).lean().exec();
        if (!user) return res.json({message: 'Usuário não existe.'});

        const newTask = {
            userId: user._id,
            title,
            description,
            type: type || 'normal',
            tasks: [],
            creationDate: new Date(),
            due_date,
            completed: false
        }
        
        const parsedTodo = JSON.parse(to_do);
        
        const task = await Task.create(newTask);

        if (parsedTodo && parsedTodo?.length > 0){
            for (let i = 0; i < parsedTodo.length; i++){
                task.to_do.push(parsedTodo[i]);
            }
        }
        await task.save();
        console.log(task);  
        if (task) {
            cSuccess(`Tarefa "${task.title}" do usuário ${user.username} criada com sucesso!`);
            res.status(200).json(task);
        }
        else {
            res.status(400).json({message: 'Não foi possível criar essa tarefa.'})
        }

    } catch (err){
        cError(err.stack);
        res.status(500).json(err.message);
    }
}