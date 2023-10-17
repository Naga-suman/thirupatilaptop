package com.mantis.template.finance.clusters;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.cloud.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoanDetails {

    @JsonProperty("id")
    private String loanId;
    private Double loanAmt;
    private String description;
    private Integer tenure;
    private Integer rateOfInt;
    private Boolean isActive;
    private Double emiAmt;
    private Timestamp emiStartDate;
    private Timestamp emiDate;
    private Timestamp emiEndDate;
    private Timestamp createdDate;
    private ProfileData surity;
    private List<Transactions> transactions;
}
