package com.mantis.template.login;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firestore.v1.Document;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import static com.google.firebase.cloud.FirestoreClient.*;

@Repository
public class ClientRepository {

    public List<ClientEntity> getClients() throws ExecutionException, InterruptedException {
        Firestore db = getFirestore();
        ApiFuture<QuerySnapshot> apiFuture = db.collection("clients").get();
        QuerySnapshot document = apiFuture.get();
        List<QueryDocumentSnapshot> list= document.getDocuments();
        List<ClientEntity> clients= new ArrayList<>();
        for (QueryDocumentSnapshot client : list) {
            clients.add(client.toObject(ClientEntity.class));
        }
        return clients;
    }
}
