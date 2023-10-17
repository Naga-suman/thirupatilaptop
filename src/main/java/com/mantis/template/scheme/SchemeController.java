package com.mantis.template.scheme;

import com.google.cloud.Timestamp;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.mantis.template.config.TEstsfd;
import com.mantis.template.scheme.customer.Customers;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.SetOptions;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/scheme")
public class SchemeController {

    @Autowired
    private  SchemeService schemeService;

    @PostMapping
    public ResponseEntity<SchemeEntity> createScheme(@RequestBody SchemeEntity scheme){
        SchemeEntity response = schemeService.createScheme(scheme);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{financerId}")
    public ResponseEntity<List<SchemeEntity>> getfinancerSchemes(@PathVariable String financerId){
        List<SchemeEntity> response = schemeService.financerScheme(financerId);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/addCustomers/{schemeI}")
    public ResponseEntity<String> addCustomerToSchemes(@RequestBody List<Customers> customers){

        return ResponseEntity.ok().body(schemeService.addCustomerToScheme(customers));

    }


}
