const API_URL = "https://www.swapi.tech/api";
// ESTA ES LA URL BASE ORIGINAL Y CORRECTA
const IMG_URL_BASE = "https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images";
const IMG_PLACEHOLDER = "https://starwars-visualguide.com/assets/img/placeholder.jpg"; // Usamos un placeholder que sí funciona

async function getDesdeApi(endpoint) {
  try {
    const res = await fetch(`${API_URL}/${endpoint}`);
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Fallo al obtener datos de ${endpoint}:`, error);
    return null;
  }
}

const mapearResultado = (item, categoria) => ({
  id: item.uid,
  titulo: item.name,
  categoria: categoria,
});

export async function fetchPeople() {
  const data = await getDesdeApi("people?limit=12");
  return data?.results?.map(p => mapearResultado(p, 'people')) || [];
}

export async function fetchPlanets() {
  const data = await getDesdeApi("planets?limit=12");
  return data?.results?.map(p => mapearResultado(p, 'planets')) || [];
}

export async function fetchVehicles() {
  const data = await getDesdeApi("vehicles?limit=12");
  return data?.results?.map(v => mapearResultado(v, 'vehicles')) || [];
}

export async function fetchDetails(category, id) {
  const data = await getDesdeApi(`${category}/${id}`);
  return data?.result ? { id: data.result.uid, properties: data.result.properties } : null;
}

// ESTA FUNCIÓN AHORA ES MÁS SIMPLE PORQUE LA URL ORIGINAL NO NECESITA TRADUCIR "people" a "characters"
export function getImageUrl(category, id) {
  if (!category || !id) return IMG_PLACEHOLDER;
  return `${IMG_URL_BASE}/${category}/${id}.jpg`;
}