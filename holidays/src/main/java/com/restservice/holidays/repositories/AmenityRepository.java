package com.restservice.holidays.repositories;

import com.restservice.holidays.models.venue.Amenity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AmenityRepository extends CrudRepository<Amenity, Long> {
    Amenity findByAmenity(String amenity);
    List<Amenity> findByAmenityIn(List<String> amenities);
    //List<Amenity> findByAmenityIgnoreCaseIn(List<String> amenities);
}
