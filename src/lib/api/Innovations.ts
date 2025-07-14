import axios from 'axios';

const API_URL = 'http://localhost:8000/api/innovation5-elements';

// Tipe untuk data inovasi
export interface Innovation5Element {
  id?: number;
  organizations_id: number;
  nama_inovasi: string;
  tahun: number;
  rancang_bangun: string;
  link_video_youtube?: string;
  berkelanjutan: boolean;
  [key: string]: any; // Jika ada field tambahan dari backend
}

// GET all
export const getInnovation5Elements = async (): Promise<Innovation5Element[]> => {
  try {
    const response = await axios.get<{ data: Innovation5Element[] }>(API_URL);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching innovation 5 elements:', error);
    throw error;
  }
};

// CREATE
export const createInnovation5Elements = async (
  innovationData: Innovation5Element
): Promise<Innovation5Element> => {
  try {
    const response = await axios.post<{ data: Innovation5Element }>(API_URL, innovationData);
    return response.data.data;
  } catch (error) {
    console.error('Error creating innovation 5 elements:', error);
    throw error;
  }
};

// GET one
export const getInnovation5Element = async (id: number): Promise<Innovation5Element> => {
  try {
    const response = await axios.get<{ data: Innovation5Element }>(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching innovation 5 element:', error);
    throw error;
  }
};

// UPDATE
export const updateInnovation5Elements = async (
  id: number,
  innovationData: Innovation5Element
): Promise<Innovation5Element> => {
  try {
    const response = await axios.put<{ data: Innovation5Element }>(
      `${API_URL}/${id}`,
      innovationData
    );
    return response.data.data;
  } catch (error) {
    console.error('Error updating innovation 5 elements:', error);
    throw error;
  }
};

// DELETE
export const deleteInnovation5Elements = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting innovation 5 elements:', error);
    throw error;
  }
};
