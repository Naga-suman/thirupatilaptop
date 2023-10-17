package com.mantis.template.login;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResp {
    private String status;
    private String userId;
    private String displayName;
}
