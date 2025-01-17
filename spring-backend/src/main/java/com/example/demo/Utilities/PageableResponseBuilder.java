package com.example.demo.Utilities;

import java.util.Map;

import org.springframework.data.domain.Page;

public class PageableResponseBuilder<T> {
    public Map<String, Object> buildResponseMap(Page<T> page, boolean skipTotal){
        return Map.of(
            "items", page.getContent(),
            "totalItems", skipTotal ? -1 : page.getTotalElements(),
            "totalPages", skipTotal ? -1 : page.getTotalPages(),
            "page", page.getNumber() + 1,
            "perPage", page.getSize()
        );
    }
}
