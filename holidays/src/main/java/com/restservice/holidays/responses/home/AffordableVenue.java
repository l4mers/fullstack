package com.restservice.holidays.responses.home;

import com.restservice.holidays.models.venue.Venue;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AffordableVenue {
    private Long id;
    private String image;
    private int price;

    public AffordableVenue(Venue venue){
        this.id = venue.getId();
        this.image = venue.getVenueMedia().get(0).getImage();
        this.price = venue.getInfo().getPrice();
    }
}
