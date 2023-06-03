package com.restservice.holidays.responses.home;

import com.restservice.holidays.models.venue.Venue;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HomeScreen {

    private List<TrendingVenue> trendingVenues;
    private List<AffordableVenue> affordableVenues;
    private List<TrendingCountries> trendingCountries;


    public void trendingVenue(Venue venue){
        trendingVenues.add(new TrendingVenue(venue));
    }

    public void affordableVenue(Venue venue){
        affordableVenues.add(new AffordableVenue(venue));
    }

    public void trendingCountries(Venue venue){
        trendingCountries.add(new TrendingCountries(venue));
    }
}
