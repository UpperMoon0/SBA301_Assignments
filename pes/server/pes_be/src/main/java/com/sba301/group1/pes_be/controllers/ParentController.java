package com.sba301.group1.pes_be.controllers;

import com.sba301.group1.pes_be.requests.ResponseObject;
import com.sba301.group1.pes_be.requests.SaveDraftAdmissionFormRequest;
import com.sba301.group1.pes_be.requests.SubmitAdmissionFormRequest;
import com.sba301.group1.pes_be.services.ParentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/parent")
@RequiredArgsConstructor
public class ParentController {

    private final ParentService parentService;

    @PostMapping("/form/draft")
    @PreAuthorize("hasRole('parent')")
    public ResponseEntity<ResponseObject> saveDraftAdmissionForm (@RequestBody SaveDraftAdmissionFormRequest request, HttpServletRequest httpRequest) {
        return parentService.saveDraftAdmissionForm(request, httpRequest);
    }

    @GetMapping("/form/list")
    @PreAuthorize("hasRole('parent')")
    public ResponseEntity<ResponseObject> viewAdmissionFormList(HttpServletRequest request) {
        return parentService.viewAdmissionFormList(request);
    }

    @PutMapping("/form/submit")
    @PreAuthorize("hasRole('parent')")
    public ResponseEntity<ResponseObject> submitAdmissionForm(@RequestBody SubmitAdmissionFormRequest request, HttpServletRequest httpRequest) {
        return parentService.submitAdmissionForm(request, httpRequest);
    }

    @PutMapping("/form/cancel")
    @PreAuthorize("hasRole('parent')")
    public ResponseEntity<ResponseObject> cancelAdmissionForm(@RequestBody int id, HttpServletRequest httpRequest) {
        return parentService.cancelAdmissionForm(id, httpRequest);
    }
}
