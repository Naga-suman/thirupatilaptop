package com.mantis.template.scheme;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.mantis.template.customer.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import static com.google.firebase.cloud.FirestoreClient.getFirestore;

@Repository
public class SchemeRepository{

    public List<SchemeEntity> allSchemes() throws ExecutionException, InterruptedException {
        Firestore db = getFirestore();
        ApiFuture<QuerySnapshot> apiFuture = db.collection("schemes").get();
        QuerySnapshot document = apiFuture.get();
        List<QueryDocumentSnapshot> list= document.getDocuments();
        List<SchemeEntity> schemes= new ArrayList<>();
        for (QueryDocumentSnapshot scheme : list) {
            schemes.add(scheme.toObject(SchemeEntity.class));
        }
        return schemes;
    }
    public List<SchemeEntity> findAllSchemeByFinancer(String financerId) throws ExecutionException, InterruptedException {

        return allSchemes().stream().filter(a -> a.getFinancerId().equalsIgnoreCase(financerId)).collect(Collectors.toList());
    }

    public SchemeEntity saveScheme(SchemeEntity scheme){
        Firestore db= getFirestore();
        String uuid= UUID.randomUUID().toString();
        scheme.setSchemeId(uuid);
        ApiFuture<WriteResult> apiFuture = db.collection("schemes").document(uuid)
                .set(scheme, SetOptions.merge());
        return scheme;

    }
}
