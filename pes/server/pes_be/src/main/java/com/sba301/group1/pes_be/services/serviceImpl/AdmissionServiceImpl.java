package com.sba301.group1.pes_be.services.serviceImpl;

import com.sba301.group1.pes_be.requests.AdmissionTermRequest;
import com.sba301.group1.pes_be.requests.ProcessAdmissionFormRequest;
import com.sba301.group1.pes_be.requests.ResponseObject;
import com.sba301.group1.pes_be.services.AdmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdmissionServiceImpl implements AdmissionService {

    @Override
    public ResponseEntity<ResponseObject> createAdmissionTerm(AdmissionTermRequest request) {
        return null;
    }

    @Override
    public ResponseEntity<ResponseObject> viewAdmissionTerm() {
        return null;
    }

    @Override
    public ResponseEntity<ResponseObject> updateAdmissionTerm(AdmissionTermRequest request) {
        return null;
    }

    @Override
    public ResponseEntity<ResponseObject> viewAdmissionFormList(int year) {
        return null;
    }

    @Override
    public ResponseEntity<ResponseObject> processAdmissionFormList(ProcessAdmissionFormRequest request) {
        return null;
    }
}
