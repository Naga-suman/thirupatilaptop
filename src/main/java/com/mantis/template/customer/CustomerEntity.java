package com.mantis.template.customer;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.cloud.Timestamp;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;

//@Entity
//@Table(name = "customers_details")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerEntity {


    @JsonProperty("id")
    private String customerId;
    private String financerId;
    @JsonProperty("fullName")
    private String fname;
    @JsonProperty("aadhar")
    private String aadhar;
    @JsonProperty("email")
    private String emailId;
    @JsonProperty("mobile")
    private String phNumber;
    @JsonProperty("isActive")
    private boolean isActive;
    @JsonProperty("address")
    private String address;
    @JsonProperty("photo")
    private String photoId;
    private String createdBy;
    private String updatedBy;
    private Timestamp createdDate;
    private Timestamp updatedDate;


}
