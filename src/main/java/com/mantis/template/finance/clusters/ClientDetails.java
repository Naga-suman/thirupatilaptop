package com.mantis.template.finance.clusters;

import com.google.cloud.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientDetails {
    private String email;
    private String financerId;
    private String firstName;
    private String lastName;
    private boolean isactive;
    private String password;
    private Timestamp lastDate;
    private Double balAmount;
    private List<CustomerDetails> customers;
}
