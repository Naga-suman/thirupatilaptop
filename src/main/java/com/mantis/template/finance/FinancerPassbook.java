package com.mantis.template.finance;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FinancerPassbook {
    @JsonProperty("id")
    private String transactionId;
    private String financerId;
    private Double amount;
    private String description;
    private String transactionType;
    private String source;
    private String sourceId;
    private String distination;
    private String distinationId;
    private String balAfterTranction;
    private LocalDateTime tranctionDate;
}
