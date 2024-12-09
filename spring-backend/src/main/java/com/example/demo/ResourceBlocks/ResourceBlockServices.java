package com.example.demo.ResourceBlocks;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

public class ResourceBlockServices {
    @Autowired
    private ResourceBlockRepository resourceBlockRepository;

    public ResourceBlock createResourceBlock(ResourceBlock resourceBlock) {
        return resourceBlockRepository.save(resourceBlock);
    }

    public ResourceBlock getResourceBlock(String resourceBlockId) {
        return resourceBlockRepository.findById(resourceBlockId).orElse(null);
    }

    public List<ResourceBlock> getResourceBlocks() {
        return resourceBlockRepository.findAll();
    }

    public ResourceBlock findByResourceId(String resourceId) {
        return resourceBlockRepository.findByResourceId(resourceId);
    }
}
