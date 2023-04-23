package com.felipe.todo.service;

import com.felipe.todo.model.Task;
import com.felipe.todo.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return this.taskRepository.findAll();
    }

    public Task getById(Long id) {
        return this.taskRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Não foi encontrada tarefa com o id: " + id));
    }

    public Task addTask(Task task) {
        return this.taskRepository.save(task);
    }

    public Task updateTask(Long id, Task task) {
        Task taskToUpdate = this.taskRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("Não foi encontrada tarefa com o id: " + id));

        taskToUpdate.setDescription(task.getDescription());
        taskToUpdate.setDueDate(task.getDueDate());
        taskToUpdate.setCompleted(task.getCompleted());

        return this.taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        this.taskRepository.deleteById(id);
    }

}
