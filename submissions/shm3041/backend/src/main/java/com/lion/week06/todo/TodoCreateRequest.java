package com.lion.week06.todo;

// POST /api/todos 요청 body를 받기 위한 DTO 클래스
public class TodoCreateRequest {
    // 프론트엔드에서 전달하는 새 Todo 제목
    private String title;

    // 프론트엔드에서 전달하는 새 Todo 설명
    private String description;

    // 요청 body의 title 값 반환
    public String getTitle() {
        return title;
    }

    // JSON의 title 값을 Java 객체에 넣을 때 사용
    public void setTitle(String title) {
        this.title = title;
    }

    // 요청 body의 description 값 반환
    public String getDescription() {
        return description;
    }

    // JSON의 description 값을 Java 객체에 넣을 때 사용
    public void setDescription(String description) {
        this.description = description;
    }
}
