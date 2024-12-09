package com.example.demo.Categories;

import org.springframework.beans.factory.annotation.Autowired;

public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }
}
