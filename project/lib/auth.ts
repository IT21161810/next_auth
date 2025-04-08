export const validateCredentials = (email: string, password: string): boolean => {
  return (
    email === 'test@visionexdigital.com.au' && password === 'password123'
  );
};