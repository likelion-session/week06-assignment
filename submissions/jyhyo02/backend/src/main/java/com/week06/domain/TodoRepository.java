package com.week06.domain;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByCompleted(boolean completed);
    List<Todo> findByTitleContainingIgnoreCase(String keyword);
}
