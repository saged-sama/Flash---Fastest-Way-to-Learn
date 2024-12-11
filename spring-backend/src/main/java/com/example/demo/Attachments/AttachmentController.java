package com.example.demo.Attachments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Configuration
@RestController
@RequestMapping("/api/collections/course")
public class AttachmentController {
    @Autowired
    AttachmentService attachmentService;
}
