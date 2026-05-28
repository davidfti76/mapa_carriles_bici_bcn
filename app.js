// REPLAZA ESTO con tu token público real que obtienes en tu cuenta de Mapbox
// Recuerda mantener las comillas simples fijas a los lados del token.
mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2aWRmdGkiLCJhIjoiY2xmNWx0cDM1MWR2ZzNzbnpvcTdjNWV6ZiJ9.Z6yaM6_X2ajUPQh6uLukow';

const map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/dark-v11', // Estilo oscuro idóneo para resaltar colores neón
    center: [2.1734, 41.3851], // Coordenadas de Barcelona [Longitud, Latitud]
    zoom: 12
});

map.on('load', () => {

    // --- 1. CARGA DE LAS FUENTES GEOJSON DESDE TU PC ---
    map.addSource('bici-2017', {
        type: 'geojson',
        data: './carriles_2017.geojson'
    });

    map.addSource('bici-2024', {
        type: 'geojson',
        data: './carriles_2024.geojson'
    });

    map.addSource('bici-2025', {
        type: 'geojson',
        data: './carriles_2025.geojson' // Nombre corregido
    });


    // --- 2. CONFIGURACIÓN DE CAPAS Y COLORES ---
    
    // Red 2017: Visible desde el principio
    map.addLayer({
        id: 'capa-2017',
        type: 'line',
        source: 'bici-2017',
        paint: {
            'line-color': '#ff9100', // Color Naranja
            'line-width': 2.5
        }
    });

    // Red 2024: Empieza invisible (opacidad 0)
    map.addLayer({
        id: 'capa-2024',
        type: 'line',
        source: 'bici-2024',
        paint: {
            'line-color': '#29b6f6', // Color Azul
            'line-width': 3,
            'line-opacity': 0 
        }
    });

    // Red 2025: Empieza invisible (opacidad 0)
    map.addLayer({
        id: 'capa-2025',
        type: 'line',
        source: 'bici-2025',
        paint: {
            'line-color': '#00e676', // Color Verde
            'line-width': 3.5,
            'line-opacity': 0 
        }
    });


    // --- 3. INTERACTIVIDAD DEL SELECTOR SLIDER ---
    const slider = document.getElementById('slider');
    const label = document.getElementById('year-label');

    slider.addEventListener('input', (e) => {
        // Corrección: Forzamos la lectura del valor como número puro
        const posicion = Number(e.target.value); 

        if (posicion === 0) {
            // Año 2017: Ocultamos las capas del futuro
            map.setPaintProperty('capa-2024', 'line-opacity', 0);
            map.setPaintProperty('capa-2025', 'line-opacity', 0);
            label.innerText = 'Año 2017';
            label.style.color = '#ff9100';
        } 
        else if (posicion === 1) {
            // Año 2024: Mostramos la red de 2024 y ocultamos la de 2025
            map.setPaintProperty('capa-2024', 'line-opacity', 1);
            map.setPaintProperty('capa-2025', 'line-opacity', 0);
            label.innerText = 'Año 2024 (Nuevos en Azul)';
            label.style.color = '#29b6f6';
        } 
        else if (posicion === 2) {
            // Año 2025: Encendemos todas las capas acumuladas en el mapa
            map.setPaintProperty('capa-2024', 'line-opacity', 1);
            map.setPaintProperty('capa-2025', 'line-opacity', 1);
            label.innerText = 'Año 2025 (Nuevos en Verde)';
            label.style.color = '#00e676';
        }
    });
});