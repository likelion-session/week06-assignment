package com.likelion.todo_api;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.likelion.todo_api.domain.Todo;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
}