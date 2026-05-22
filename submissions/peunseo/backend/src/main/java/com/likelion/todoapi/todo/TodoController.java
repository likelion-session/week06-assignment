package com.likelion.todoapi.todo;

import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    private final TodoRepository todoRepository;

    public TodoController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @GetMapping
    public List<Todo> findAll() {
        return todoRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Todo> create(@RequestBody TodoCreateRequest request) {
        String title = request.getTitle() == null ? "" : request.getTitle().trim();
        if (title.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Todo saved = todoRepository.save(new Todo(title, request.getDescription()));
        return ResponseEntity
                .created(URI.create("/api/todos/" + saved.getId()))
                .body(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!todoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        todoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Todo> toggle(@PathVariable Long id) {
        return todoRepository.findById(id)
                .map(todo -> {
                    todo.toggleCompleted();
                    return ResponseEntity.ok(todoRepository.save(todo));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
