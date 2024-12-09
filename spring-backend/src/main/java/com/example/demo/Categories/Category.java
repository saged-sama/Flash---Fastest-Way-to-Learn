package com.example.demo.Categories;

import java.util.List;

import com.example.demo.Courses.Course;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
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
@Table(
        uniqueConstraints = {
                @UniqueConstraint(name="course_catagory_name_unique", columnNames = "email")
        }
)
public class Category {
    @Id
    @GeneratedValue(
        strategy = GenerationType.UUID
    )
    private String id;

    @Column(
        nullable = false
    )
    private String name;

    @ManyToMany(mappedBy = "categories")
    List<Course> courses;
}
