package com.mantis.template.finance.clusters;

import com.google.cloud.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Transactions {
    private String transactionId;
    private Double amount;
    private String description;
    private String transactionType;
    private String source;
    private String destination;
    private String destinationId;
    private Timestamp trancationDate;
    private Double previouBal;
    private Double presentBal;
    private Timestamp transactionDate;
}
