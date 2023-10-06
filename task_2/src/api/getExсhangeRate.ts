const API_KEY = '565a0042df3637a56af4c8c5';

export async function fetchExchangeRate(from: string, to: string) {
  try {
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}`;
    const res = await fetch(url);
  
    if (!res.ok) {
      throw new Error(`Failed to fetch exchange rate: ${res.statusText}`);
    }
  
    const data = await res.json();
  
    if (data.result === 'success') {
      return data.conversion_rate;
    } else {
      throw new Error(data.error_type);
    }
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return null;
  }
}