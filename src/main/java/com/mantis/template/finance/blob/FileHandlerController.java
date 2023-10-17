package com.mantis.template.finance.blob;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/filehandler")
public class FileHandlerController {

    @Autowired
    private FileHandlerService fileHandlerService;
    @PostMapping("/upload")
    public ResponseEntity<String> uploadPhotocustomer(@RequestParam(name = "file") MultipartFile file) throws ExecutionException, InterruptedException, IOException {
        String response= fileHandlerService.saveFile(file);
        return ResponseEntity.ok().body(response);
    }
    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String id) {
        byte[] file = fileHandlerService.getsavedFile(id);
        if (file != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentDispositionFormData("attachment", "file.dat");
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);

            return new ResponseEntity<>(file, headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
