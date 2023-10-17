package com.mantis.template.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDirectoryRepo extends JpaRepository<UserDirectory,Long> {

    @Query(value = "select * from user_directory where email_id=?1 and password=?2 and is_active=true",nativeQuery = true)
    Optional<UserDirectory> findByEmailIdAndPassword(String emailId, String password);
}

