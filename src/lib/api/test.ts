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
}

// export async function getInnovations() {
//   const res = await fetch('http://127.0.0.1:8000/api/innovations'); // full URL!
//   if (!res.ok) throw new Error('Gagal ambil data');
//   return await res.json();
// }

export async function getInnovations() {
  const res = await fetch('http://127.0.0.1:8000/api/innovations');
  if (!res.ok) throw new Error('Gagal mengambil data');

  const json = await res.json();
  return json.data.data; // 🔥 hanya array inovasi-nya
}
