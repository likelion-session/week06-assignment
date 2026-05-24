package com.lion.week06.todo;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// React 프론트엔드에서 호출하는 Todo REST API 처리 컨트롤러
@RestController
// 이 컨트롤러의 모든 API 주소는 /api/todos로 시작
@RequestMapping("/api/todos")
public class TodoController {
    // DB 대신 메모리에 Todo를 저장하기 위한 Map, key는 Todo id
    private final Map<Long, Todo> todos = new ConcurrentHashMap<>();

    // 새 Todo를 만들 때마다 1씩 증가하는 id 생성기
    private final AtomicLong sequence = new AtomicLong(1);

    // GET /api/todos
    // 현재 저장된 모든 Todo 목록을 배열 형태로 반환
    @GetMapping
    public List<Todo> findAll() {
        return new ArrayList<>(todos.values());
    }

    // POST /api/todos
    // 요청 body로 받은 title, description을 사용해서 새 Todo 생성
    @PostMapping
    public ResponseEntity<Todo> create(@RequestBody TodoCreateRequest request) {
        // 제목이 없거나 공백만 있으면 잘못된 요청으로 처리
        if (request.getTitle() == null || request.getTitle().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        // 새 id를 발급하고, 완료 여부는 기본값 false로 Todo 생성
        Long id = sequence.getAndIncrement();
        Todo todo = new Todo(
                id,
                request.getTitle().trim(),
                request.getDescription() == null ? "" : request.getDescription(),
                false
        );

        // 생성한 Todo를 메모리 저장소에 저장
        todos.put(id, todo);

        // HTTP 201 Created와 함께 생성된 Todo 데이터 응답
        return ResponseEntity.created(URI.create("/api/todos/" + id)).body(todo);
    }

    // DELETE /api/todos/{id}
    // 주소에 들어온 id에 해당하는 Todo 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        // 삭제할 Todo가 없으면 404 Not Found 반환
        if (todos.remove(id) == null) {
            return ResponseEntity.notFound().build();
        }

        // 삭제에 성공하면 응답 body 없이 204 No Content 반환
        return ResponseEntity.noContent().build();
    }

    // PATCH /api/todos/{id}/toggle
    // 주소에 들어온 id에 해당하는 Todo의 완료 상태 반전
    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Todo> toggle(@PathVariable Long id) {
        Todo todo = todos.get(id);

        // 완료 상태를 바꿀 Todo가 없으면 404 Not Found 반환
        if (todo == null) {
            return ResponseEntity.notFound().build();
        }

        // 현재 completed 값의 반대로 변경
        todo.setCompleted(!todo.isCompleted());

        // 변경된 Todo 데이터 응답
        return ResponseEntity.ok(todo);
    }
}
