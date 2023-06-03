package com.restservice.holidays.models.venue;

import com.restservice.holidays.models.booking.Booking;
import com.restservice.holidays.models.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Venue {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private boolean available;
    @ManyToOne
    private User owner;
    @ManyToMany
    private List<Amenity> amenity;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Rating> rating;
    @OneToOne(cascade = CascadeType.ALL)
    private VenueInfo info;
    @OneToOne(cascade = CascadeType.ALL)
    private VenueLocation venueLocation;
    @OneToMany(mappedBy = "venue", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<VenueMedia> venueMedia;
    @OneToMany(mappedBy = "venue", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookings;
    private Date created;
    private Date updated;

    @PrePersist
    protected void onCreate() {
        created = new Date();
    }
    @PreUpdate
    protected void onUpdate() {
        updated = new Date();
    }

}
