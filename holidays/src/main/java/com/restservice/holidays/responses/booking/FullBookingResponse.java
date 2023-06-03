package com.restservice.holidays.responses.booking;

import com.restservice.holidays.responses.venue.VenueProfileUser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FullBookingResponse {
    private VenueProfileUser booker;
    private Date start;
    private Date end;
}
