package com.example.demo.ResourceBlocks;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourceBlockRepository extends JpaRepository<ResourceBlock, String> {
    public ResourceBlock findByResourceId(String resourceId);
}

