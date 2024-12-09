package com.example.demo.Attachments;

import com.example.demo.Courses.Course;
import com.example.demo.Users.Users;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Attachment {
    @Id
    @GeneratedValue(
        strategy = GenerationType.UUID
    )
    private String id;

    @Column(
        nullable = false
    )
    private String name;

    @Column(
        nullable = false
    )
    private String url;

    @ManyToOne
    @JoinColumn(
        name = "course_id",
        nullable = false
    )
    private Course course;
}
