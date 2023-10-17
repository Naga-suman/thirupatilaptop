package com.mantis.template.customer;
import com.mantis.template.common.FirebaseFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class CustomerService {

    @Autowired
    private FirebaseFileService firebaseFileService;
    @Autowired
    private CustomerRepo customerRepo;
    public CustomerEntity createCustomer(CustomerEntity customer) throws ExecutionException, InterruptedException, IOException {
        CustomerEntity response= null;
        try{
            response = customerRepo.saveCustomer(customer);
        }catch (Exception ex){
            throw ex;
        }
        return response;
    }

    public List<CustomerEntity> financerCustomerList(String financerId) throws ExecutionException, InterruptedException {
        List<CustomerEntity> response= new ArrayList<>();
        try{
            response = customerRepo.getAllByFinancerId(financerId);
        }catch (Exception ex){
            throw ex;
        }
        return response;
    }

    public String uploadProfilePhoto(MultipartFile file) throws IOException {
        try{
            return firebaseFileService.saveTest(file);
        }catch (Exception ex){
            throw ex;
        }
    }
}
