package com.example.demo.ResourceBlocks;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.example.demo.Resources.Resource;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
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
public class ResourceBlock {
    @Id
    @GeneratedValue(
        strategy = GenerationType.UUID
    )
    private String id;

    @ManyToOne
    @JoinColumn(
        name = "resource_id",
        nullable = false
    )
    private Resource resource;
    int x = 2;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "resource_block_types")
    private ResourceBlockTypes type;

    @Column(
        nullable = false,
        columnDefinition = "TEXT"
    )
    private String content;

    @Column(
        nullable = false
    )
    private Long order;

    @OneToOne
    @JoinColumn(
        name = "parent_block_id",
        nullable = false
    )
    private ResourceBlock parentBlock;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
