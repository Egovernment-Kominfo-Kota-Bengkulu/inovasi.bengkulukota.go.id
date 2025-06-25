const API_URL = 'https://inovasibackend.bengkulukota.go.id/api/innovations';

export interface Oraganization {
    id: number;
    organization_categories_id: number;
    nama_organisasi: string;
}

export interface Innovation {
    id: number;
    organizations_id: number;
    tahun: number;
    nama_inovasi: string;
    link_video_youtube?: string;
    latar_belakang: string;
    penjaringan_ide: string;
    pemilihan_ide: string;
    manfaat_inovasi: string;
    dampak_inovasi: string;
    create_at: string;
    update_at: string;
    organization: Oraganization;
}

export async function getInnovations(): Promise<Innovation[]> {
    const response = await fetch(API_URL);
    if(!response.ok) {
        throw new Error('Gagal mengambil data inovasi');
    }
    
    const json = await response.json();
    return json.data.data; 
}

export async function createInnovation(data: Omit<Innovation, 'id' | 'create_at' | 'update_at'>): Promise<Innovation> {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    console.log('Data to submit:', data);

    if (!response.ok) {
        throw new Error('Gagal membuat inovasi');
    }

    const json = await response.json();
    return json.data;
}

export async function getInnovation(id : number): Promise<Innovation> {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Gagal mengambil data inovasi');
    }

    const json = await response.json();
    return json.data.data;
}

export async function updateInnovation(id: number, data: Omit<Innovation, 'id' | 'create_at' | 'update_at'>): Promise<Innovation> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Gagal memperbarui inovasi');
    }

    const json = await response.json();
    return json.data;
}