const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export const api = {
  get: async (endpoint: string) => {
    const url = `${BACKEND_URL}${endpoint}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    return response.json();
  },
  
  post: async (endpoint: string, data: any) => {
    const url = `${BACKEND_URL}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to post ${url}: ${response.statusText}`);
    }
    return response.json();
  },

  put: async (endpoint: string, data: any) => {
    const url = `${BACKEND_URL}${endpoint}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to put ${url}: ${response.statusText}`);
    }
    return response.json();
  },

  delete: async (endpoint: string) => {
    const url = `${BACKEND_URL}${endpoint}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete ${url}: ${response.statusText}`);
    }
    // Delete might not return JSON (e.g. 204 No Content)
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }
};
