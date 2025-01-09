package com.mmk.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

public interface MailService {
    String createNumber();
    MimeMessage createCodeMail(String email, String number) throws MessagingException;
    String sendCodeMessage(String email) throws MessagingException;
    MimeMessage createTempPwdMail(String email, String tempPwd) throws MessagingException;
    void sendTempPwd(String email, String tempPwd) throws MessagingException;
}