package com.felipe.todo.controller;

import com.felipe.todo.model.Task;
import com.felipe.todo.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> fetchAllTasks() {
        return this.taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public Task fetchById(@PathVariable Long id) {
        return this.taskService.getById(id);
    }

    @PostMapping
    public Task addTask(@RequestBody Task task) {
        return this.taskService.addTask(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        return this.taskService.updateTask(id, task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        this.taskService.deleteTask(id);
    }

}
