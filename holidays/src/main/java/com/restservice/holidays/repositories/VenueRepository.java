package com.restservice.holidays.repositories;

import com.restservice.holidays.models.user.User;
import com.restservice.holidays.models.venue.Venue;
import lombok.NonNull;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VenueRepository extends CrudRepository<Venue, Long> {

    @Query("SELECT v FROM Venue v JOIN v.rating r GROUP BY v.id ORDER BY AVG(r.rating) DESC")
    List<Venue> findVenueWithHighestAverageRating(Pageable pageable);

    @Query("SELECT v FROM Venue v JOIN v.info i ORDER BY i.price / i.squareMeter ASC")
    List<Venue> findVenueByLowestPricePerSquareMeter(Pageable pageable);

    @Query("SELECT v FROM Venue v JOIN v.venueLocation l GROUP BY l.country ORDER BY COUNT(v) DESC")
    List<Venue> findVenuesByMostPopularCountry(Pageable pageable);

    @Query("SELECT v FROM Venue v WHERE v.info.price < :price")
    List<Venue> findVenuesWithPriceLowerThan(Integer price);

    List<Venue> findAllByOwner(User owner);

    @NonNull
    List<Venue> findAll();

    @Query("SELECT v FROM Venue v ORDER BY v.created DESC")
    List<Venue> findLatestVenuesLimited(Pageable pageable);
}
