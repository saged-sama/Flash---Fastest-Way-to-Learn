package com.example.demo.Resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResourceService {
    
    @Autowired
    private ResourceRepository resourceRepository;

    public Resource createResource(Resource resource) {
        return resourceRepository.save(resource);
    }

    public Resource getResource(String resourceId) {
        return resourceRepository.findById(resourceId).orElse(null);
    }

    public List<Resource> getResources() {
        return resourceRepository.findAll();
    }
}
