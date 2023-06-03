package com.restservice.holidays.models.booking;

import com.restservice.holidays.models.user.User;
import com.restservice.holidays.models.venue.Venue;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Booking {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private User booker;

    @ManyToOne
    private Venue venue;

    private Integer guests;
    private Date bookingStart;
    private Date bookingEnd;
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
