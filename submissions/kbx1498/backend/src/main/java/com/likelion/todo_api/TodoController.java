package com.likelion.todo_api;

import com.likelion.todo_api.domain.Todo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<Todo> list() {
        return todoService.getAllTodos();
    }

    @GetMapping("/{id}")
    public Todo one(@PathVariable Long id) {
        return todoService.getTodo(id);
    }

    @PostMapping
    public ResponseEntity<Todo> create(@RequestBody(required = false) Map<String, String> body) {
        if (body == null) {
            return ResponseEntity.badRequest().build();
        }
        
        String title = body.getOrDefault("title", "").trim();
        String description = body.getOrDefault("description", "");

        if (title.isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        Todo todo = new Todo(title, description);
        Todo saved = todoService.createTodo(todo);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remove(@PathVariable Long id) {
        todoService.deleteTodo(id);
        return ResponseEntity.noContent().build();
    }
}
