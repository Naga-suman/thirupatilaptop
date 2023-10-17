package com.mantis.template.finance.controllers;

import com.mantis.template.finance.clusters.ProfileData;
import com.mantis.template.finance.reqModel.CustomerReq;
import com.mantis.template.finance.service.FinanceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/finance")
@Slf4j
@CrossOrigin
public class FinanaceController {

    @Autowired
    private FinanceService financeService;
    @PostMapping("/createCustomer")
    public String createCustomer(@RequestParam("financerId") String financerid, @RequestBody CustomerReq customer){
        log.info("FinanaceController :: createCustomer :: completed....");
        return financeService.createCustomerLoanProfile(financerid,customer);

    }

    @GetMapping("/{financerId}/customers")
    public ResponseEntity<List<ProfileData>> getfinacerCustomers(@PathVariable("financerId") String financerId){
            return ResponseEntity.ok().body(financeService.getFinancerCustomer(financerId));
    }
}
