package com.example.demo.Attachments;

import org.springframework.beans.factory.annotation.Autowired;

public class AttachmentService {
    @Autowired
    private AttachmentRepository attachmentRepository;

    public Attachment createAttachment(Attachment attachment) {
        return attachmentRepository.save(attachment);
    }
}
