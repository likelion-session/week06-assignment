package com.week06.domain;
import java.util.List;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityNotFoundException;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> getAll() {
        return todoRepository.findAll();
    }

    public Todo get(Long id) {
        return todoRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Todo not found: " + id));
    }

    public Todo create(String title, String description) {
        Todo todo = new Todo(title, description);
        return todoRepository.save(todo);
    }

    public Todo toggleCompleted(Long id) {
        Todo todo = get(id);
        todo.setCompleted(!todo.isCompleted());
        return todoRepository.save(todo);
    }

    public void delete(Long id) {
        Todo todo = get(id);
        todoRepository.delete(todo);
    }

    public List<Todo> getByCompleted(boolean completed) {
        return todoRepository.findByCompleted(completed);
    }

    public List<Todo> searchByTitle(String keyword) {
        return todoRepository.findByTitleContainingIgnoreCase(keyword);
    }
}
