package com.mantis.template.login;

import com.google.cloud.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientEntity {
    private String email;
    private String financerId;
    private String firstName;
    private String lastName;
    private boolean isactive;
    private String password;
    private Timestamp lastDate;
}
