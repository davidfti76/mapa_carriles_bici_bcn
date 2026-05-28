mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2aWRmdGkiLCJhIjoiY21wcHN6ZGs5MGZodzJyczYzbHFkYmI4YSJ9.CI_rggEQrybSXMhwHaVqpQ';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11', 
    center: [2.1734, 41.3851], 
    zoom: 12.5
});

// Definición global de las capas y sus propiedades estructurales
const capasTemporales = [
    { id: 'bici-2017', url: 'data/bici_2017.geojson', color: '#ff4d4d', peso: 2.5 },
    { id: 'bici-2024', url: 'data/bici_2024.geojson', color: '#3333cc', peso: 2.5 },
    { id: 'bici-2025', url: 'data/bici_2025.geojson', color: '#009933', peso: 4.0 }
];

map.on('load', () => {
    // 1. Cargar todas las fuentes y capas al iniciar el mapa
    capasTemporales.forEach(capa => {
        map.addSource(capa.id, {
            type: 'geojson',
            data: capa.url
        });

        map.addLayer({
            id: capa.id,
            type: 'line',
            source: capa.id,
            layout: {
                'line-join': 'round',
                'line-cap': 'round',
                'visibility': 'visible' // Inicialmente todas visibles
            },
            paint: {
                'line-color': capa.color,
                'line-width': capa.peso,
                'line-opacity': 0.8
            }
        });
    });

    // 2. Vincular el control deslizante (Slider)
    const slider = document.getElementById('slider');

    // Función que filtra las capas según el índice activo (0, 1 o 2)
    function actualizarFiltroTemporal(indiceActivo) {
        // Opción 0 = Solo 2017
        // Opción 1 = 2017 + 2024
        // Opción 2 = 2017 + 2024 + 2025 (Red completa)
        
        map.setLayoutProperty('bici-2017', 'visibility', 'visible');
        
        map.setLayoutProperty('bici-2024', 'visibility', indiceActivo >= 1 ? 'visible' : 'none');
        
        map.setLayoutProperty('bici-2025', 'visibility', indiceActivo >= 2 ? 'visible' : 'none');
    }

    // Escuchar el evento de arrastre del usuario en el slider
    slider.addEventListener('input', (e) => {
        const valorSeleccionado = parseInt(e.target.value, 10);
        actualizarFiltroTemporal(valorSeleccionado);
    });

    // Ejecutar una vez al cargar para asegurar que coincida con el valor por defecto del HTML
    actualizarFiltroTemporal(parseInt(slider.value, 10));
});