package com.restservice.holidays.models.memories;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Memory {

    @Id
    @GeneratedValue
    private Integer id;

    private String title;
    @Lob
    private String description;

    private Boolean publicMemo;

    @ManyToOne
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "memory")
    private List<MemoryMedia> media;

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
