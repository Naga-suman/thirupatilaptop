package com.mantis.template.scheme.customer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customers {

    private String id;
    private String joinedDate;
    private String schemeId;
    private String customerId;
}
