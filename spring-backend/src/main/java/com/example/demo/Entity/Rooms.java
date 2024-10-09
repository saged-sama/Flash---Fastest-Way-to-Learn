package com.example.demo.Entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Rooms {
    @Id
    private String id;
    private String name;
    private boolean enabled;
    private String description;

    @JsonProperty("customer_id")
    private String customerId;

    @JsonProperty("app_id")
    private String appId;

    @Embedded
    @JsonProperty("recording_info")
    private RecordingInfo recording_info;

    @JsonProperty("template_id")
    private String templateId;

    private String template;
    private String region;

    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;
}

@Embeddable
class RecordingInfo {
    @Column(name = "recording_enabled")
    @JsonProperty("enabled")
    private boolean enabled;

    public RecordingInfo() {
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}
