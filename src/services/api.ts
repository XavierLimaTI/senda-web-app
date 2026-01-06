const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface ApiResponse<T> {
  data?: T;
  error?: string;
  details?: unknown;
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || "Erro na requisição");
  }
  
  return data;
}

export const api = {
  // GET request
  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    
    return handleResponse<T>(response);
  },

  // POST request
  async post<T>(endpoint: string, body: unknown): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    
    return handleResponse<T>(response);
  },

  // PUT request
  async put<T>(endpoint: string, body: unknown): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    
    return handleResponse<T>(response);
  },

  // DELETE request
  async delete<T>(endpoint: string, id: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}?id=${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    
    return handleResponse<T>(response);
  },
};

// Tipos
interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface Patient {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  document?: string;
  address?: string;
  notes?: string;
  active: boolean;
}

interface Professional {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  document?: string;
  specialty?: string;
  licenseNumber?: string;
  active: boolean;
}

interface Therapy {
  id: string;
  name: string;
  description?: string;
  duration?: number;
  price?: number;
  active: boolean;
}

interface Room {
  id: string;
  name: string;
  description?: string;
  capacity?: number;
  active: boolean;
}

type CreatePatientData = Omit<Patient, "id">;
type UpdatePatientData = Partial<CreatePatientData>;
type CreateProfessionalData = Omit<Professional, "id">;
type UpdateProfessionalData = Partial<CreateProfessionalData>;
type CreateTherapyData = Omit<Therapy, "id">;
type UpdateTherapyData = Partial<CreateTherapyData>;
type CreateRoomData = Omit<Room, "id">;
type UpdateRoomData = Partial<CreateRoomData>;