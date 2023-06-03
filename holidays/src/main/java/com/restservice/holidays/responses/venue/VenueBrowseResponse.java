package com.restservice.holidays.responses.venue;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VenueBrowseResponse {
    private Long id;
    private String title;
    private Integer beds;
    private Integer bathrooms;
    private Integer price;
    private Integer guests;
    private Double rating;
    private Double squareMeter;
    private String coverPhoto;
    private List<VenueBookingResponse> bookings;
    private VenueProfileLocation location;
    private List<String> amenities;
    private Date created;
}
