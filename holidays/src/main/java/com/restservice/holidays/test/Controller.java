package com.restservice.holidays.test;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class Controller {
    private final MessageRepository repo;

    @GetMapping("Hello")
    public Message helloWorld(){
        return repo.findById(1L).orElse(Message.builder().message("Empty").build());
    }
}
