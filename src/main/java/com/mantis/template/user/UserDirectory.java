package com.mantis.template.user;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_directory")
@Data
public class UserDirectory {


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_directory_user_id_seq")
    @SequenceGenerator(allocationSize = 1,  name = "user_directory_user_id_seq", sequenceName = "user_directory_user_id_seq")
    @Column(name = "user_id")
    private Long userId;
    // user_type varchar(20),
    @Column(name = "user_type")
    private String userType;
    // password varchar(50),
    @Column(name = "password")
    private String password;
    // fname varchar(50),
    @Column(name = "fname")
    private String fname;
    // lname varchar(50),
    @Column(name = "lname")
    private String lname;
    // email_id varchar(100),
    @Column(name = "email_id")
    private String emailId;
    // ph_number varchar(10),
    @Column(name = "ph_number")
    private String phNumber;
    // is_active boolean,
    @Column(name = "is_active")
    private boolean isActive;
    // house_no varchar(20),
    @Column(name = "house_no")
    private String houseNo;
    // village varchar(50),
    @Column(name = "village")
    private String village;
    // district varchar(70),
    @Column(name = "district")
    private String district;
    // state varchar(50),
    @Column(name = "state")
    private String state;
    // additinal_data varchar(200),
    @Column(name = "additinal_data")
    private String additinalData;
    // created_by varchar(80),
    @Column(name = "created_by")
    private String createdBy;
    // updated_by varchar(80),
    @Column(name = "updated_by")
    private String updatedBy;
    // created_date timestamp,
    @Column(name = "created_date")
    private LocalDateTime createdDate;
    // updated_date timestamp )
    @Column(name = "updated_date")
    private LocalDateTime updatedDate;


}
