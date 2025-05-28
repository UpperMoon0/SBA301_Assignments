package com.sba301.group1.pes_be.models;

import com.sba301.group1.pes_be.enums.Grade;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "`classes`")
public class Classes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    String name;

    @Column(name = "`number_student`")
    String numberStudent;

    @Column(name = "`room_number`")
    String roomNumber;

    @Column(name = "`start_date`")
    String startDate;

    @Column(name = "`end_date`")
    String endDate;

    String status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = true, unique = false)
    Grade grade;

    @OneToMany(mappedBy = "classes", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    List<Schedule> scheduleList;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "`teacher_id`", unique = false)
    Account teacher;
}
