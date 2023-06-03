package com.restservice.holidays.responses.booking;

import com.restservice.holidays.responses.venue.VenueProfileUser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookedVenue {
    private Long venueId;
    private String title;
    private VenueProfileUser owner;
}
