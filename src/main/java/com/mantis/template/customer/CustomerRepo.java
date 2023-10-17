package com.mantis.template.customer;

import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.*;
import com.mantis.template.common.FirebaseFileService;
import com.mantis.template.config.TEstsfd;
import com.mantis.template.finance.clusters.ClientDetails;
import com.mantis.template.login.ClientEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import static com.google.firebase.cloud.FirestoreClient.getFirestore;

@Repository
public class CustomerRepo  {

    @Autowired
    private FirebaseFileService firebaseFileService;

    private List<ClientDetails> clients;
    @PostConstruct
    public void init() throws ExecutionException, InterruptedException {
        Firestore db = getFirestore();
        ApiFuture<QuerySnapshot> apiFuture = db.collection("clients").get();
        QuerySnapshot document = apiFuture.get();
        clients= document.toObjects(ClientDetails.class);
    }
    public List<CustomerEntity> allCustomers() throws ExecutionException, InterruptedException {
        Firestore db = getFirestore();
        ApiFuture<QuerySnapshot> apiFuture = db.collection("customers").get();
        QuerySnapshot document = apiFuture.get();
        List<QueryDocumentSnapshot> list= document.getDocuments();
        List<CustomerEntity> customers= new ArrayList<>();
        for (QueryDocumentSnapshot customer : list) {
            customers.add(customer.toObject(CustomerEntity.class));
        }
        return customers;
    }
    public List<CustomerEntity> getAllByFinancerId(String financerId) throws ExecutionException, InterruptedException {
        return allCustomers().stream().filter(a -> ( a.getFinancerId().equalsIgnoreCase(financerId))).collect(Collectors.toList());
    }

    public  CustomerEntity saveCustomer(CustomerEntity customer) throws ExecutionException, InterruptedException, IOException {
        Firestore db= getFirestore();
        String uuid= UUID.randomUUID().toString();
//        String photoId= firebaseFileService.saveTest(customer.getPhoto());
//        customer.setPhoto(null);
//        customer.setPhotoId(photoId);
        customer.setCustomerId(uuid);
        ApiFuture<WriteResult> apiFuture = db.collection("customers").document(uuid)
                .set(customer, SetOptions.merge());
        return customer;
    }


}

