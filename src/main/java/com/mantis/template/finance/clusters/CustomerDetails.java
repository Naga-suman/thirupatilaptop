package com.mantis.template.finance.clusters;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerDetails {
    private ProfileData profile;
    private Double balAmt;
    private List<LoanDetails> loans;

}
