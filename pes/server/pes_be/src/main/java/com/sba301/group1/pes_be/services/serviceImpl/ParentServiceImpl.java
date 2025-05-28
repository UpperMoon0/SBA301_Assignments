package com.sba301.group1.pes_be.services.serviceImpl;

import com.sba301.group1.pes_be.requests.ResponseObject;
import com.sba301.group1.pes_be.requests.SaveDraftAdmissionFormRequest;
import com.sba301.group1.pes_be.requests.SubmitAdmissionFormRequest;
import com.sba301.group1.pes_be.services.ParentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ParentServiceImpl implements ParentService {
    @Override
    public ResponseEntity<ResponseObject> saveDraftAdmissionForm(SaveDraftAdmissionFormRequest request, HttpServletRequest httpRequest) {
        return null;
    }

    @Override
    public ResponseEntity<ResponseObject> viewAdmissionFormList(HttpServletRequest request) {
        return null;
    }

    @Override
    public ResponseEntity<ResponseObject> cancelAdmissionForm(int id, HttpServletRequest httpRequest) {
        return null;
    }

    @Override
    public ResponseEntity<ResponseObject> submitAdmissionForm(SubmitAdmissionFormRequest request, HttpServletRequest httpRequest) {
        return null;
    }
}
