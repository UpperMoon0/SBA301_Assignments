package com.sba301.group1.pes_be.services;

import com.sba301.group1.pes_be.requests.ResponseObject;
import com.sba301.group1.pes_be.requests.SaveDraftAdmissionFormRequest;
import com.sba301.group1.pes_be.requests.SubmitAdmissionFormRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;

public interface ParentService {
    ResponseEntity<ResponseObject> saveDraftAdmissionForm(SaveDraftAdmissionFormRequest request, HttpServletRequest httpRequest);

    ResponseEntity<ResponseObject> viewAdmissionFormList(HttpServletRequest request);

    ResponseEntity<ResponseObject> cancelAdmissionForm(int id, HttpServletRequest httpRequest);

    ResponseEntity<ResponseObject> submitAdmissionForm(SubmitAdmissionFormRequest request, HttpServletRequest httpRequest);
}
