package com.example.demo.DTO;

import jakarta.persistence.Embeddable;

@Embeddable
public class RoomPayload {
    private String name;
    private String description;
    private String template_id;

    public RoomPayload(String name, String description, String template_id) {
        this.name = name;
        this.description = description;
        this.template_id = template_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String gettemplate_id() {
        return template_id;
    }

    public void settemplate_id(String template_id) {
        this.template_id = template_id;
    }

    @Override
    public String toString() {
        return "RoomPayload{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", template_id='" + template_id + '\'' +
                '}';
    }
}

