package com.restservice.holidays.repositories;

import com.restservice.holidays.models.booking.Booking;
import com.restservice.holidays.models.user.User;
import com.restservice.holidays.models.venue.Venue;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends CrudRepository<Booking, Long> {
    List<Booking> findBookingsByVenue(Venue venue);
    List<Booking> findBookingsByBooker(User venue);
}
