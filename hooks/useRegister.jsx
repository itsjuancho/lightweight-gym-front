// hooks/useRegister.js
import { BASE_URL } from '@/utils/routes';
import { useState } from 'react';

const useRegister = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username:'',
    password: '',
    rePassword: '',
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    setStatus(null);
    e.preventDefault();

    // Validaciones
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.username || !formData.password || !formData.rePassword) {
      setStatus('All fields are required');
      return;
    }

    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(formData.firstName) || !nameRegex.test(formData.lastName)) {
      setStatus('First Name, Last Name, and Username should not contain special characters');
      return;
    }

    if (formData.password.length < 8 || formData.rePassword.length < 8) {
      setStatus('Passwords must be at least 8 characters long');
      return;
    }

    if (formData.password !== formData.rePassword) {
      setStatus('Passwords do not match');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('Invalid email address');
      return;
    }

    // Si las validaciones pasan, realizamos la solicitud
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/user/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new status('Failed to register');
      }

      // Clear form data on successful submission if needed
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        rePassword: '',
      });

      setStatus("Success Register");
    } catch (status) {
      setStatus(status.message);
    }
    setLoading(false);
  };

  return { formData, status, loading, handleChange, handleSubmit };
};

export default useRegister;
