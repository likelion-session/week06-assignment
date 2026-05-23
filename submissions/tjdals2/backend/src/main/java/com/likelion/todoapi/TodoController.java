package com.likelion.todoapi;

import com.likelion.todoapi.Todo;
import com.likelion.todoapi.TodoService;
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
        return todoService.getAll();
    }

    @GetMapping("/{id}")
    public Todo one(@PathVariable Long id) {
        return todoService.get(id);
    }

    @PostMapping
    public ResponseEntity<Todo> create(@RequestBody Map<String, String> body) {
        String title = body.getOrDefault("title", "").trim();
        String description = body.getOrDefault("description", "");

        if (title.isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        Todo saved = todoService.create(title, description);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PatchMapping("/{id}/toggle")
    public Todo toggle(@PathVariable Long id) {
        return todoService.toggleCompleted(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remove(@PathVariable Long id) {
        todoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public List<Todo> search(
        @RequestParam(required = false) Boolean completed,
        @RequestParam(required = false) String keyword
    ) {
        if (completed != null) return todoService.getByCompleted(completed);
        if (keyword != null && !keyword.isBlank()) return todoService.searchByTitle(keyword);
        return todoService.getAll();
    }
}