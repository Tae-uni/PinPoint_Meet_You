import React, { useState } from 'react';
import * as Yup from 'yup';

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthdate: '',
        gender: 'Male'
    });

    const [errors, setErrors] = useState({});

    const schema = Yup.object().shape({
        username: Yup.string()
            .min(4, 'Username must be at least 4 characters long')
            .max(20, 'Username must not exceed 20 characters')
            .matches(/^[A-Za-z0-9_]+$/, 'Username must contain only letters, numbers, and underscores')
            .required('Username is required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must include at least one lowercase letter, one uppercase letter, one number, and one special character.')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Please confirm your password'),
        birthdate: Yup.date()
            .required('Birthdate is required'),
        gender: Yup.string()
            .oneOf(['Male', 'Female', 'Other'], 'Invalid gender')
            .required('Gender is required')
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            // Validate form data
            await schema.validate(formData, { abortEarly: false });

            // If validation passes, submit form data
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // 서버 응답 처리
                console.log('Form submitted successfully');
                navigate('/web');
            } else {
                // 서버 응답 오류 처리
                console.error('Failed to submit form:', response.statusText);
            }
        } catch (validationErrors) {
            // Handle validation errors
            const errors = {};
            validationErrors.inner.forEach(error => {
                errors[error.path] = error.message;
            });
            setErrors(errors);
        }
    };

    return (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="blo">
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                    {errors.username && <div className="error">{errors.username}</div>}
                </div>
                <div className="blo">
                    <label htmlFor="email">E-mail:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <div className="error">{errors.email}</div>}
                </div>
                <div className="blo">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    {errors.password && <div className="error">{errors.password}</div>}
                </div>
                <div className="blo">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
                </div>
                <div className="blo">
                    <label htmlFor="birthdate">Birth Date:</label>
                    <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />
                    {errors.birthdate && <div className="error">{errors.birthdate}</div>}
                </div>
                <div className="blo">
                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.gender && <div className="error">{errors.gender}</div>}
                </div>
                <br />
                <input type="submit" value="Sign Up" />
            </form>
        </div>
    );
}

export default SignUp;