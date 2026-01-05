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

// Serviços específicos
export const patientsService = {
  getAll: (params?: Record<string, string>) => 
    api.get<{ data: Patient[]; pagination: Pagination }>("/api/patients", params),
  create: (data: CreatePatientData) => 
    api.post<Patient>("/api/patients", data),
  update: (id: string, data: UpdatePatientData) => 
    api.put<Patient>("/api/patients", { id, ...data }),
  delete: (id: string) => 
    api.delete<{ success: boolean }>("/api/patients", id),
};

export const professionalsService = {
  getAll: (params?: Record<string, string>) => 
    api.get<{ data: Professional[]; pagination: Pagination }>("/api/professionals", params),
  create: (data: CreateProfessionalData) => 
    api.post<Professional>("/api/professionals", data),
  update: (id: string, data: UpdateProfessionalData) => 
    api.put<Professional>("/api/professionals", { id, ...data }),
  delete: (id: string) => 
    api.delete<{ success: boolean }>("/api/professionals", id),
};

export const therapiesService = {
  getAll: (params?: Record<string, string>) => 
    api.get<Therapy[]>("/api/therapies", params),
  create: (data: CreateTherapyData) => 
    api.post<Therapy>("/api/therapies", data),
  update: (id: string, data: UpdateTherapyData) => 
    api.put<Therapy>("/api/therapies", { id, ...data }),
  delete: (id: string) => 
    api.delete<{ success: boolean }>("/api/therapies", id),
};

export const roomsService = {
  getAll: (params?: Record<string, string>) => 
    api.get<Room[]>("/api/rooms", params),
  create: (data: CreateRoomData) => 
    api.post<Room>("/api/rooms", data),
  update: (id: string, data: UpdateRoomData) => 
    api.put<Room>("/api/rooms", { id, ...data }),
  delete: (id: string) => 
    api.delete<{ success: boolean }>("/api/rooms", id),
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