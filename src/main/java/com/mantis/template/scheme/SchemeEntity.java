package com.mantis.template.scheme;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.cloud.Timestamp;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SchemeEntity {
    @JsonProperty("id")
    private String schemeId;
    private String financerId;
    private String schemeName;
    private String startDate;
    private String endDate;
    private String frequancy;
    private Double oneTimePremimumAmt;
    private Double maturityAmt;
}
