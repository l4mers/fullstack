package com.restservice.holidays.controllers;

import com.restservice.holidays.models.venue.Amenity;
import com.restservice.holidays.repositories.AmenityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class AmenityController {

    private final AmenityRepository amenityRepository;

    @GetMapping("get/amenities")
    public ResponseEntity<Iterable<Amenity>> getAllAmenities(){
        return ResponseEntity.ok(amenityRepository.findAll());
    }
}
