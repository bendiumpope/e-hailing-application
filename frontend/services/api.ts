const API_URL = 'http://localhost:3001'; // Adjust the URL to your backend

export const api = {
  post: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  get: async (endpoint: string, token: string) => {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
};
