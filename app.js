mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2aWRmdGkiLCJhIjoiY21wcHN6ZGs5MGZodzJyczYzbHFkYmI4YSJ9.CI_rggEQrybSXMhwHaVqpQ';

const map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [2.1734, 41.3851],
    zoom: 12
});

map.on('load', () => {

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
        data: './carriles_2025.geojson'
    });


        map.addLayer({
        id: 'capa-2017',
        type: 'line',
        source: 'bici-2017',
        paint: {
            'line-color': '#ff9100',
            'line-width': 2.5
        }
    });

        map.addLayer({
        id: 'capa-2024',
        type: 'line',
        source: 'bici-2024',
        paint: {
            'line-color': '#29b6f6',
            'line-width': 3,
            'line-opacity': 0 
        }
    });

    
    map.addLayer({
        id: 'capa-2025',
        type: 'line',
        source: 'bici-2025',
        paint: {
            'line-color': '#00e676',
            'line-width': 3.5,
            'line-opacity': 0 
        }
    });


       const slider = document.getElementById('slider');
    const label = document.getElementById('year-label');

    slider.addEventListener('input', (e) => {
                const posicion = Number(e.target.value); 

        if (posicion === 0) {
           
            map.setPaintProperty('capa-2024', 'line-opacity', 0);
            map.setPaintProperty('capa-2025', 'line-opacity', 0);
            label.innerText = 'Año 2017';
            label.style.color = '#ff9100';
        } 
        else if (posicion === 1) {
            
            map.setPaintProperty('capa-2024', 'line-opacity', 1);
            map.setPaintProperty('capa-2025', 'line-opacity', 0);
            label.innerText = 'Año 2024 (Nuevos en Azul)';
            label.style.color = '#29b6f6';
        } 
        else if (posicion === 2) {
            
            map.setPaintProperty('capa-2024', 'line-opacity', 1);
            map.setPaintProperty('capa-2025', 'line-opacity', 1);
            label.innerText = 'Año 2025 (Nuevos en Verde)';
            label.style.color = '#00e676';
        }
    });
});