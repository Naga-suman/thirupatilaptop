package com.mantis.template.finance.blob;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.text.html.Option;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Service
public class FileHandlerService {

    @Autowired
    private FileHandlerRepository fileHandlerRepository;

    public String saveFile(MultipartFile file) throws IOException {

        String id = UUID.randomUUID().toString();
        try{
            FileHandler fileHandler= new FileHandler();
            fileHandler.setId(id);
            fileHandler.setFile(file.getBytes());
            fileHandlerRepository.save(fileHandler);
        }catch (Exception ex){
            throw ex;
        }
        return id;
    }

    public byte[] getsavedFile(String fileId){
        try{
            Optional<FileHandler> fileHandler= fileHandlerRepository.findById(fileId);
            if(fileHandler.isPresent()){
                return fileHandler.get().getFile();
            }else{
                return null;
            }
        }catch (Exception ex){
            throw ex;
        }
    }
}
