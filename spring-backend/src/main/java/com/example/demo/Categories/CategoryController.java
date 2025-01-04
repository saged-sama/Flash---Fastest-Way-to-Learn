package com.example.demo.Categories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@Configuration
@RestController
@RequestMapping("/api/collections/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/records")
    public ResponseEntity<Category> createCategory(@RequestParam String name) {
        Category category = new Category();
        category.setName(name);
        return ResponseEntity.ok(categoryService.createCategory(category));
    }

    @GetMapping("/records/{categoryId}")
    public ResponseEntity<Category> getCategory(@PathVariable String categoryId) {
        return ResponseEntity.ok(categoryService.getCategory(categoryId));
    }

    @GetMapping("/records")
    public ResponseEntity<List<Category>> getCategories() {
        return ResponseEntity.ok(categoryService.getCategories());
    }
}
