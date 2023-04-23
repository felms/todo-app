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

    public void addTask(Task task) {
        boolean exists = this.taskRepository.existsById(task.getId());

        if (!exists) {
            this.taskRepository.save(task);
        }
    }

    public void updateTask(Long id, Task task) {
        Task taskToUpdate = this.taskRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("Não foi encontrada tarefa com o id: " + id));

        taskToUpdate.setDescription(task.getDescription());
        taskToUpdate.setDueDate(task.getDueDate());
        taskToUpdate.setCompleted(task.getCompleted());

        this.taskRepository.save(task);
    }

}
