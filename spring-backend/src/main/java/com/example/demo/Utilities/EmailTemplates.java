package com.example.demo.Utilities;

import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;

import org.springframework.core.io.ClassPathResource;

public class EmailTemplates {
    public static String getVerificationTemplate(String name, String verificationLink) throws Exception {
        Path template = new ClassPathResource("templates/VerificationMailTemplate.html").getFile().toPath();
        String templateContent = Files.readString(template);

        return templateContent
                .replace("{{name}}", name)
                .replace("{{verificationLink}}", verificationLink);
    }

    public static String getScheduledSessionReminderTemplate(String name, String title, LocalDateTime time, String link) throws Exception {
        Path template = new ClassPathResource("templates/ScheduledSessionReminderTemplate.html").getFile().toPath();
        String templateContent = Files.readString(template);

        return templateContent
                .replace("{{name}}", name)
                .replace("{{title}}", title)
                .replace("{{date}}", time.getDayOfMonth() + " " + time.getMonth() + " " + time.getYear())
                .replace("{{time}}", time.getHour() + ":" + time.getMinute())
                .replace("{{link}}", link)
                .replace("{{flash_mail}}", "flash.team.du@gmail.com");
    }
}
