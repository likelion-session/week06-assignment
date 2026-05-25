package com.lion.week06.todo;

// Todo 한 개의 데이터를 표현하는 모델 클래스
public class Todo {
    // Todo를 구분하기 위한 고유 번호
    private Long id;

    // 화면에 보여줄 할 일 제목
    private String title;

    // 할 일에 대한 추가 설명
    private String description;

    // 완료 여부 저장, true면 완료, false면 미완료
    private boolean completed;

    // Todo 객체를 만들 때 필요한 값을 한 번에 넣어주는 생성자
    public Todo(Long id, String title, String description, boolean completed) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
    }

    // Todo의 id 값 반환
    public Long getId() {
        return id;
    }

    // Todo의 제목 반환
    public String getTitle() {
        return title;
    }

    // Todo의 제목 변경
    public void setTitle(String title) {
        this.title = title;
    }

    // Todo의 설명 반환
    public String getDescription() {
        return description;
    }

    // Todo의 설명 변경
    public void setDescription(String description) {
        this.description = description;
    }

    // Todo가 완료 상태인지 반환
    public boolean isCompleted() {
        return completed;
    }

    // Todo의 완료 상태 변경
    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
