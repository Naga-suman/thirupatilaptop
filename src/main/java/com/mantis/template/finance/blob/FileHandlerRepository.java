package com.mantis.template.finance.blob;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface FileHandlerRepository extends JpaRepository<FileHandler,String> {
    @Query(value = "select * from file_handler where id =?1",nativeQuery = true)
    Optional<FileHandler> findById(String id);
}
