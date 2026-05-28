mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2aWRmdGkiLCJhIjoiY21wcHN6ZGs5MGZodzJyczYzbHFkYmI4YSJ9.CI_rggEQrybSXMhwHaVqpQ';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11', // Base cartográfica clara
    center: [2.1734, 41.3851], // Centro geográfico de Barcelona
    zoom: 12.5
});

// Configuración estructural de las capas temporales
const capasTemporales = [
    { id: 'bici-2017', url: 'data/bici_2017.geojson', color: '#ff4d4d', peso: 2.5 },
    { id: 'bici-2024', url: 'data/bici_2024.geojson', color: '#3333cc', peso: 2.5 },
    { id: 'bici-2025', url: 'data/bici_2025.geojson', color: '#009933', peso: 4.0 } // Resalta el año reciente
];

map.on('load', () => {
    // 1. Cargar las fuentes y las capas vectoriales en Mapbox
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
                'visibility': 'visible'
            },
            paint: {
                'line-color': capa.color,
                'line-width': capa.peso,
                'line-opacity': 0.8
            }
        });
    });

    // 2. Controlar la línea temporal mediante el Slider
    const slider = document.getElementById('slider');

    function actualizarFiltroTemporal(indiceActivo) {
        // Opción 0 = Solo 2017 visible
        // Opción 1 = 2017 y 2024 visibles
        // Opción 2 = Todas las capas visibles (Red completa)
        
        map.setLayoutProperty('bici-2017', 'visibility', 'visible');
        
        map.setLayoutProperty('bici-2024', 'visibility', indiceActivo >= 1 ? 'visible' : 'none');
        
        map.setLayoutProperty('bici-2025', 'visibility', indiceActivo >= 2 ? 'visible' : 'none');
    }

    // Escuchar la interacción del usuario
    slider.addEventListener('input', (e) => {
        const valorSeleccionado = parseInt(e.target.value, 10);
        actualizarFiltroTemporal(valorSeleccionado);
    });

    // Sincronizar el estado del mapa con el valor inicial del slider al cargar la web
    actualizarFiltroTemporal(parseInt(slider.value, 10));
});