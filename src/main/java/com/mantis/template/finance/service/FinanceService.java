package com.mantis.template.finance.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.SetOptions;
import com.google.cloud.firestore.WriteResult;
import com.mantis.template.common.FirebaseFileService;
import com.mantis.template.finance.clusters.ClientDetails;
import com.mantis.template.finance.clusters.CustomerDetails;
import com.mantis.template.finance.clusters.LoanDetails;
import com.mantis.template.finance.clusters.ProfileData;
import com.mantis.template.finance.reqModel.CustomerReq;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.function.Function;
import java.util.stream.Collectors;

import static com.google.firebase.cloud.FirestoreClient.getFirestore;

@Service
@Slf4j
public class FinanceService {

    @Autowired
    private FirebaseFileService firebaseFileService;

    private Map<String,ClientDetails> clientsMap;

    private List<ProfileData> customersProfile;
    @PostConstruct
    public void init() throws ExecutionException, InterruptedException {
        Firestore db = getFirestore();
        ApiFuture<QuerySnapshot> apiFuture = db.collection("clients").get();
        QuerySnapshot document = apiFuture.get();
        List<ClientDetails> clients= document.toObjects(ClientDetails.class);
        clientsMap= clients.stream().collect(Collectors.toMap(ClientDetails::getFinancerId, Function.identity()));
    }

    public String createCustomerLoanProfile(String financerId, CustomerReq customer){
        log.info("FinanceService :: createCustomerLoanProfile :: started....");
        String customerId="";
        //surity profile
        ProfileData surityProfile = customer.getSurityProifile();
        if(surityProfile.getCustomerId() != null){
            surityProfile.setUpdatedDate(Timestamp.now());
        }else{
            surityProfile.setCustomerId(UUID.randomUUID().toString());
            surityProfile.setCreatedDate(Timestamp.now());
        }

        //create loan details
        LoanDetails newLoan = customer.getLoanDetails();
        newLoan.setLoanId(UUID.randomUUID().toString());
        newLoan.setIsActive(true);
        newLoan.setCreatedDate(Timestamp.now());
        newLoan.setSurity(surityProfile);
        newLoan.setTransactions(new ArrayList<>());


        //client details
        ClientDetails client = clientsMap.get(financerId);
        //create customer profile
        ProfileData customerProfile = customer.getCustomerProfile();
        if(customer.getCustomerProfile().getCustomerId() != null){
            customerProfile.setUpdatedDate(Timestamp.now());

            CustomerDetails exitingCustomer= client.getCustomers().stream()
                    .filter(a -> a.getProfile().getCustomerId().equalsIgnoreCase(customerProfile.getCustomerId()))
                    .limit(1).findAny().get();
            exitingCustomer.getLoans().add(newLoan);
            savetodb();
        }else{
            List<LoanDetails> loans= new ArrayList<>();
            loans.add(newLoan);
            customerProfile.setCustomerId(UUID.randomUUID().toString());
            customerProfile.setCreatedDate(Timestamp.now());
            CustomerDetails newcustomer= CustomerDetails.builder()
                    .profile(customerProfile)
                    .loans(loans)
                    .balAmt(00d)
                    .build();

            if(client.getCustomers() != null){
                client.getCustomers().add(newcustomer);
            }else{
                List<CustomerDetails> customerslist= new ArrayList<>();
                customerslist.add(newcustomer);
                client.setCustomers(customerslist);
            }


            savetodb();
        }
        log.info("FinanceService :: createCustomerLoanProfile :: completed....");
        return "Success";
    }


    @Scheduled(fixedDelay = 1000)
    public void savetodb(){
        Firestore db= getFirestore();
        log.info("pushing data to db");
        for(ClientDetails client : clientsMap.values()){
            ApiFuture<WriteResult> apiFuture = db.collection("clients").document(client.getFinancerId())
                    .set(client, SetOptions.merge());
        }
        log.info("moved data to db");
    }

    public List<ProfileData> getFinancerCustomer(String financerId){
        ClientDetails client = clientsMap.get(financerId);
        List<ProfileData> exitingCustomer= client.getCustomers().parallelStream()
                .flatMap(customer -> {
                    List<ProfileData> profiles= new ArrayList<>();

                    profiles=customer.getLoans().parallelStream()
                            .map(loan -> loan.getSurity())
                            .collect(Collectors.toList());
                    profiles.add(customer.getProfile());
                    return profiles.stream();
                }).distinct().collect(Collectors.toList());
        return exitingCustomer;

    }

}
