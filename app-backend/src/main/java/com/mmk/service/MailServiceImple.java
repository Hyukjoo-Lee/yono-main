package com.mmk.service;

import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MailServiceImple implements MailService {

    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String senderEmail;

    // 인증 코드 8자리 생성
    @Override
    public String createNumber() {
        Random random = new Random();
        StringBuilder key = new StringBuilder();

        for (int i = 0; i < 8; i++) {
            int index = random.nextInt(3);

            switch (index) {
                case 0 -> key.append((char) (random.nextInt(26) + 97));
                case 1 -> key.append((char) (random.nextInt(26) + 65));
                case 2 -> key.append(random.nextInt(10));
            }
        }
        return key.toString();
    }

    // 아아디 인증코드 메일 생성
    @Override
    public MimeMessage createCodeMail(String mail, String number) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();

        message.setFrom(senderEmail);
        message.setRecipients(MimeMessage.RecipientType.TO, mail);
        message.setSubject("YONO 이메일 인증");
        String body = "";
        body += "<h3>YONO 아이디 찾기 인증번호입니다.</h3>";
        body += "<h1>" + number + "</h1>";
        body += "<h3>시간 내로 인증번호를 입력해주세요.</h3>";
        message.setText(body, "UTF-8", "html");

        return message;
    }

    // 아이디 인증코드 메일 발송
    @Override
    public String sendCodeMessage(String sendEmail) throws MessagingException {
        String number = createNumber();

        MimeMessage message = createCodeMail(sendEmail, number);
        try {
            javaMailSender.send(message);
        } catch (MailException e) {
            e.printStackTrace();
            throw new IllegalArgumentException("메일 발송 중 오류가 발생했습니다.");
        }

        return number;
    }

    // 임시비밀번호 메일 생성
    @Override
    public MimeMessage createTempPwdMail(String email, String tempPwd) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();

        message.setFrom(senderEmail);
        message.setRecipients(MimeMessage.RecipientType.TO, email);
        message.setSubject("YONO 임시 비밀번호");

        String loginPage = "http://localhost:3000/login";
        String body = "";
        body += "<h3>YONO 임시 비밀번호입니다.</h3>";
        body += "<h1>" + tempPwd + "</h1>";
        body += "<a href=" + loginPage + ">로그인하기</a>";
        message.setText(body, "UTF-8", "html");

        return message;
    }

    @Override
    public void sendTempPwd(String email, String tempPwd) throws MessagingException {
        MimeMessage message = createTempPwdMail(email, tempPwd);
        try {
            javaMailSender.send(message);
        } catch (MailException e) {
            e.printStackTrace();
            throw new IllegalArgumentException("메일 발송 중 오류가 발생했습니다.");
        }
    }

    
}
