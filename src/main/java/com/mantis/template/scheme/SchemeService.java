package com.mantis.template.scheme;

import com.mantis.template.scheme.customer.Customers;
import com.mantis.template.scheme.customer.CustomersRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class SchemeService {

    @Autowired
    private SchemeRepository schemeRepository;

    @Autowired
    private CustomersRepository customersRepository;

    public SchemeEntity createScheme(SchemeEntity scheme){
        SchemeEntity response =  null;
        try{
            response = schemeRepository.saveScheme(scheme);
        }catch (Exception ex){
            log.error(ex.getLocalizedMessage());
        }
        return response;
    }

    public List<SchemeEntity> financerScheme(String financerId){

        List<SchemeEntity> response =  null;
        try{
            response = schemeRepository.findAllSchemeByFinancer(financerId);
        }catch (Exception ex){
            log.error(ex.getLocalizedMessage());
        }
        return response;
    }

    public  String addCustomerToScheme(List<Customers> customers){
        String status= "success";
        try{
            for(Customers customer: customers){
                customersRepository.saveCustomer(customer);
            }
        }catch (Exception ex){
            throw ex;
        }
        return  status;

    }

}
