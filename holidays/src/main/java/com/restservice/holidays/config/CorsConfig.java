package com.restservice.holidays.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins("*")
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                .allowedHeaders("*")
//                .allowCredentials(true);
//    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://charming-dolphin-31618b.netlify.app/",
                        "https://charming-dolphin-31618b.netlify.app",
                        "http://127.0.0.1:5173/",
                        "http://127.0.0.1:5173",
                        "http://127.0.0.1",
                        "http://127.0.0.1/")
//                .allowedOrigins("http://fullstack-web-service-1:8080",
//                        "http://127.0.0.1:8080/api",
//                        "http://localhost:8080",
//                        "http://localhost",
//                        "http://fullstack-web-service-1",
//                        "fullstack-web-service-1:80",
//                        "fullstack-web-service-1",
//                        "fullstack-web-service-1:8080",
//                        "https://charming-dolphin-31618b.netlify.app/",
//                        "http://fullstack-holidays-1",
//                        "http://192.168.32.4",
//                        "http://192.168.32.4:80",
//                        "http://192.168.32.4:8080,",
//                        "http://localhost:3000",
//                        "https://holiday.imats.se",
//                        "http://holiday.imats.se",
//                        "https://holidays.imats.se",
//                        "http://holidays.imats.se")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("Authorization", "Content-Type")
                .exposedHeaders("Authorization")
                .allowCredentials(true);
    }
}
