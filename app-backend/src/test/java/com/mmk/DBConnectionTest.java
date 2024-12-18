package com.mmk;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.sql.DataSource;
import java.sql.Connection;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class DBConnectionTest {

    @Autowired
    private DataSource dataSource; // DataSource 주입

    @Test
    public void testDatabaseConnection() {
        try (Connection connection = dataSource.getConnection()) {
            // 연결 테스트
            System.out.println("DB URL: " + connection.getMetaData().getURL());
            System.out.println("DB User: " + connection.getMetaData().getUserName());
            System.out.println("DB 연결 성공");
            // AssertJ를 사용한 테스트
            assertThat(connection).isNotNull(); // 연결 객체가 null이 아닌지 확인
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("DB 연결 실패: " + e.getMessage());
        }
    }
}
