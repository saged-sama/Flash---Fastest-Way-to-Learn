package com.example.demo.Rooms;

import java.time.LocalDateTime;

import com.example.demo.SessionRequests.SessionRequests;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
public class Rooms {
    @Id
    private String id;
    private String name;
    private boolean enabled;
    private String description;

    @JsonProperty("customer_id")
    private String customerId;

    @OneToOne
    @JoinColumn(name = "session_request_id", referencedColumnName = "id")
    private SessionRequests sessionRequest;

    @JsonProperty("app_id")
    private String appId;

    @Embedded
    @JsonProperty("recording_info")
    private RecordingInfo recording_info;

    @JsonProperty("template_id")
    private String templateId;

    private String template;
    private String region;

    @OneToOne
    @JoinColumn(name = "host_room", referencedColumnName = "id")
    @JsonIgnore
    private RoomData hostRoom;

    @OneToOne
    @JoinColumn(name = "guest_room", referencedColumnName = "id")
    @JsonIgnore
    private RoomData guestRoom;

    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;

    void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setSessionRequest(SessionRequests sessionRequests) {
        this.sessionRequest = sessionRequests;
    }

    public SessionRequests getSessionRequest() {
        return sessionRequest;
    }

    public String getDescription() {
        return description;
    }

    public String getCustomerId() {
        return customerId;
    }

    public String getAppId() {
        return appId;
    }

    public RecordingInfo getRecordingInfo() {
        return recording_info;
    }

    public String getTemplateId() {
        return templateId;
    }

    public String getTemplate() {
        return template;
    }

    public String getRegion() {
        return region;
    }

    public RoomData getGuestRoom() {
        return guestRoom;
    }

    public RoomData getHostRoom() {
        return hostRoom;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public void setDescription(String description) {
        this.description = description;
    }   

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }


    public void setRecordingInfo(RecordingInfo recording_info) {
        this.recording_info = recording_info;
    }

    public void setTemplateId(String templateId) {
        this.templateId = templateId;
    }

    public void setTemplate(String template) {
        this.template = template;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public void setHostRoom(RoomData hostRoom) {
        this.hostRoom = hostRoom;
    }

    public void setGuestRoom(RoomData guestRoom) {
        this.guestRoom = guestRoom;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
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
