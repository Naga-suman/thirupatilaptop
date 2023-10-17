package com.mantis.template.scheme.customer;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.mantis.template.scheme.SchemeEntity;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

import static com.google.firebase.cloud.FirestoreClient.getFirestore;

@Repository
public class CustomersRepository {
    public List<Customers> allSchemesCustomers() throws ExecutionException, InterruptedException {
        Firestore db = getFirestore();
        ApiFuture<QuerySnapshot> apiFuture = db.collection("customer_scheme_relation").get();
        QuerySnapshot document = apiFuture.get();
        List<QueryDocumentSnapshot> list= document.getDocuments();
        List<Customers> customers= new ArrayList<>();
        for (QueryDocumentSnapshot customer : list) {
            customers.add(customer.toObject(Customers.class));
        }
        return customers;
    }

    public Customers saveCustomer(Customers customer){
        Firestore db= getFirestore();
        String uuid= UUID.randomUUID().toString();
        customer.setId(uuid);
        ApiFuture<WriteResult> apiFuture = db.collection("customer_scheme_relation").document(uuid)
                .set(customer, SetOptions.merge());
        return customer;

    }

}
