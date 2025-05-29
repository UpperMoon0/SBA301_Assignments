// Local parent service - no API calls needed for prototype
const DEMO_FORMS = [
    {
        id: 1,
        childName: 'Emma Johnson',
        childGender: 'female',
        dateOfBirth: '2019-03-15',
        placeOfBirth: 'New York',
        householdRegistrationAddress: '123 Main St, New York, NY',
        submittedDate: '2024-01-15',
        modifiedDate: '2024-01-15',
        status: 'Approved',
        note: 'Application processed successfully',
        cancelReason: ''
    },
    {
        id: 2,
        childName: 'Liam Chen',
        childGender: 'male',
        dateOfBirth: '2020-07-22',
        placeOfBirth: 'California',
        householdRegistrationAddress: '456 Oak Ave, Los Angeles, CA',
        submittedDate: '2024-01-18',
        modifiedDate: '2024-01-20',
        status: 'Pending Approval',
        note: 'Under review',
        cancelReason: ''
    },
    {
        id: 3,
        childName: 'Sophia Williams',
        childGender: 'female',
        dateOfBirth: '2019-11-08',
        placeOfBirth: 'Texas',
        householdRegistrationAddress: '789 Pine St, Houston, TX',
        submittedDate: '2024-01-10',
        modifiedDate: '2024-01-12',
        status: 'Draft',
        note: 'Incomplete application',
        cancelReason: ''
    },
    {
        id: 4,
        childName: 'Oliver Brown',
        childGender: 'male',
        dateOfBirth: '2020-02-14',
        placeOfBirth: 'Florida',
        householdRegistrationAddress: '321 Beach Rd, Miami, FL',
        submittedDate: '2024-01-22',
        modifiedDate: '2024-01-22',
        status: 'Cancelled',
        note: 'Application cancelled by parent',
        cancelReason: 'Family moved to different state'
    }
];

const STORAGE_KEY = 'pes_admission_forms';

// Initialize forms in localStorage if not exists
const initializeForms = () => {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_FORMS));
    }
};

export const getForms = async () => {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    initializeForms();
    const forms = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    return {
        success: true,
        data: forms,
        message: 'Forms retrieved successfully'
    };
};

export const createForm = async (formData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    initializeForms();
    const forms = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    const newForm = {
        ...formData,
        id: forms.length > 0 ? Math.max(...forms.map(f => f.id)) + 1 : 1,
        submittedDate: new Date().toISOString().split('T')[0],
        modifiedDate: new Date().toISOString().split('T')[0],
        status: 'Draft'
    };
    
    forms.push(newForm);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
    
    return {
        success: true,
        data: newForm,
        message: 'Form created successfully'
    };
};

export const updateForm = async (id, formData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    initializeForms();
    const forms = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    const index = forms.findIndex(form => form.id === parseInt(id));
    if (index !== -1) {
        forms[index] = {
            ...forms[index],
            ...formData,
            modifiedDate: new Date().toISOString().split('T')[0]
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
        
        return {
            success: true,
            data: forms[index],
            message: 'Form updated successfully'
        };
    }
    
    return {
        success: false,
        message: 'Form not found'
    };
};

export const deleteForm = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    initializeForms();
    const forms = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    const filteredForms = forms.filter(form => form.id !== parseInt(id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredForms));
    
    return {
        success: true,
        message: 'Form deleted successfully'
    };
};