package com.mantis.template.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;
    @PostMapping
    public ResponseEntity<CustomerEntity> createCustomer(@RequestBody CustomerEntity customer) throws ExecutionException, InterruptedException, IOException {
        CustomerEntity response= customerService.createCustomer(customer);
        return ResponseEntity.ok().body(response);
    }
    @PostMapping("/upload")
    public ResponseEntity<String> uploadPhotocustomer(@RequestParam(name = "file") MultipartFile file) throws ExecutionException, InterruptedException, IOException {
        String response= customerService.uploadProfilePhoto(file);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{financerId}")
    public ResponseEntity<List<CustomerEntity>> getCustomerList(@PathVariable("financerId") String financerId) throws ExecutionException, InterruptedException {
        List<CustomerEntity> response= customerService.financerCustomerList(financerId);
        return ResponseEntity.ok().body(response);

    }

}
