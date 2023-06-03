package com.restservice.holidays.responses.venue;

import com.restservice.holidays.responses.booking.FullBookingResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OwnerVenueBookingResponse {
    private Long venueId;
    private String venueTitel;
    private FullBookingResponse bookings;
}
