package com.mantis.template.login;


import com.mantis.template.user.UserDirectory;
import com.mantis.template.user.UserDirectoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.ExecutionException;

@Service
public class LoginService {

    @Autowired
    private UserDirectoryRepo userRepo;
    @Autowired
    private ClientRepository clientRepository;

    public LoginResp loginVeriy(LoginReq creds) throws ExecutionException, InterruptedException {

        ClientEntity client= null;
        try{
            Optional<ClientEntity> optionalClient =clientRepository.getClients().stream().filter(a -> (a.getEmail().equalsIgnoreCase(creds.getUserId()) &&
                    a.getPassword().equalsIgnoreCase(creds.getPassword()) && a.isIsactive())).findFirst();
            if(optionalClient.isPresent()){
                 client= optionalClient.get();
            }
            if(client != null && client.getEmail().equalsIgnoreCase(creds.getUserId())){
                return LoginResp.builder().status("success").userId(client.getFinancerId())
                        .displayName(client.getFirstName() +" "+ client.getLastName()).build();
            }else{
                return LoginResp.builder().status("failed").userId(null).build();
            }
        }catch (Exception ex){
            throw ex;
        }
    }
}
