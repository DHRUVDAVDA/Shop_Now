export const fetchProducts = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Server error (${response.status}): Failed to fetch products`);
    }

    return await response.json();
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please check your internet connection.');
    } else {
      throw new Error(error.message || 'Unexpected error occurred.');
    }
  }
};


export const loginUser = async (username: string, password: string) => {
  try {
    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(`Login failed (${response.status}): Invalid credentials`);
    }

    return await response.json(); 
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please check your internet connection.');
    } else {
      throw new Error(error.message || 'Unexpected error during login.');
    }
  }
};
