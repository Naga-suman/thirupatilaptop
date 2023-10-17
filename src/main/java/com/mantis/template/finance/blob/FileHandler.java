package com.mantis.template.finance.blob;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "file_handler")
public class FileHandler {
    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "file")
    private byte[] file;
}
