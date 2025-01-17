package com.example.demo.Utilities;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;

@Service
public class EmailService {
    private final String sendgridApi;

    public EmailService(@Value("${sendgrid_api}") String sendgridApi) {
        this.sendgridApi = sendgridApi;
    }

    public String sendEmail(String to, String subject, String body){
        Email fromEmail = new Email("flash.team.du@gmail.com");
        Email toEmail = new Email(to);
        Content content = new Content("text/html", body);
        Mail mail = new Mail(fromEmail, subject, toEmail, content);
        SendGrid sg = new SendGrid(sendgridApi);
        Request request = new Request();    
        try{
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);

            System.out.println(response.getStatusCode());
            System.out.println(response.getBody());
            System.out.println(response.getHeaders());

            return "Email sent successfully";
        }
        catch(Exception e){
            return "Email failed to send";
        }
    }
}
