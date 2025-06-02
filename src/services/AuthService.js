// Local authentication service - no API calls needed for prototype
const DEMO_USERS = [
    {
        email: 'staff@school.com',
        password: 'password123',
        name: 'Admission Staff',
        role: 'STAFF'
    },
    {
        email: 'admin@school.com',
        password: 'password123',
        name: 'School Administrator',
        role: 'ADMIN'
    }
];

export const login = async (email, password) => {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = DEMO_USERS.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Create a simple token simulation
        const token = btoa(JSON.stringify({ 
            email: user.email, 
            role: user.role, 
            exp: Date.now() + 3600000 // 1 hour
        }));
        
        // Store token in localStorage (simulating cookie)
        localStorage.setItem('access', token);
        
        return {
            success: true,
            message: 'Login successful',
            data: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
    } else {
        return {
            success: false,
            message: 'Invalid email or password'
        };
    }
};

export const logout = async () => {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Clear stored token
    localStorage.removeItem('access');
    
    return {
        success: true,
        message: 'Logout successful'
    };
};

export const getCurrentUser = () => {
    const token = localStorage.getItem('access');
    if (!token) return null;
    
    try {
        const decoded = JSON.parse(atob(token));
        if (decoded.exp < Date.now()) {
            localStorage.removeItem('access');
            return null;
        }
        return decoded;
    } catch (error) {
        localStorage.removeItem('access');
        return null;
    }
};