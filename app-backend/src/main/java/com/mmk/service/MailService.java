package com.mmk.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

public interface MailService {
    String createNumber();
    MimeMessage createMail(String mail, String number) throws MessagingException;
    String sendSimpleMessage(String sendEmail) throws MessagingException;
}