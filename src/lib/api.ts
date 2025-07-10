import axios from 'axios';

export async function fetchData() {
  try {
    const response = await axios.get('https://api.example.com/data', {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
        'Accept': 'application/json'
      }
    });
    return response.data;
  } catch (error: unknown) {
    // Asumsikan error adalah tipe Error
    const err = error as Error;
    throw new Error(err.message || 'Failed to fetch data');
  }
}