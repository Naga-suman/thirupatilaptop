package com.mantis.template.config;
import java.io.IOException;
import java.io.InputStream;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.FirestoreOptions;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@Service
public class FirebaseInitializer {

    private static final Logger logger = LoggerFactory.getLogger(FirebaseInitializer.class);

    @PostConstruct
    public void onStart() {
        logger.info("Initializing Firebase App...");
        try {
            this.initializeFirebaseApp();
        } catch (IOException e) {
            logger.error("Initializing Firebase App {}", e);
        }
    }

    private void initializeFirebaseApp() throws IOException {



        if (FirebaseApp.getApps() == null || FirebaseApp.getApps().isEmpty()) {

            InputStream serviceAccount = FirebaseInitializer.class.getResourceAsStream("/firebaseCredentials.json");
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl("https://financeproject-e7669-default-rtdb.firebaseio.com")
                    .build();

            FirebaseApp.initializeApp(options);
        }

    }

}