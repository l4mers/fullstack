package com.restservice.holidays.models.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class UserAddress {

    @Id
    @GeneratedValue
    private Long id;
    private String address;
    private String city;
    private String zip;
    private String country;
    @OneToOne
    @JsonIgnore
    private User user;

}
