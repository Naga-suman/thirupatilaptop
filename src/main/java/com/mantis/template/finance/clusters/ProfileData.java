package com.mantis.template.finance.clusters;

import com.google.cloud.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileData {
    private String customerId;
    private String fullName;
    private String aadhar;
    private String email;
    private Integer mobile1;
    private Integer mobile2;
    private Boolean isActive;
    private String address;
    private String photoId;
    private Timestamp createdDate;
    private Timestamp updatedDate;

    @Override
    public boolean equals(Object obj) {
        ProfileData obj1=(ProfileData) obj;
        return obj1.customerId.equals(this.customerId);
    }

    @Override
    public int hashCode() {
        return this.customerId.hashCode();
    }
}
