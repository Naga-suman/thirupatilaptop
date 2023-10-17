package com.mantis.template.finance.reqModel;

import com.mantis.template.finance.clusters.LoanDetails;
import com.mantis.template.finance.clusters.ProfileData;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerReq {
    private ProfileData customerProfile;
    private ProfileData surityProifile;
    private LoanDetails loanDetails;

}
