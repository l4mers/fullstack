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
public class TrendingCountries {

    private String image;
    private String country;
    public TrendingCountries(Venue venue){
        this.image = venue.getVenueMedia().get(0).getImage();
        this.country = venue.getVenueLocation().getCountry();
    }
}
