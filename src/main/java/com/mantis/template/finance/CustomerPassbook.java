package com.mantis.template.finance;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerPassbook {
    @JsonProperty("id")
    private String transactionId;
    private String financerId;
    private String customerId;
    private String description;
    private String transactionType;
    private String source;
    private String destination;
    private String destinationId;
}
