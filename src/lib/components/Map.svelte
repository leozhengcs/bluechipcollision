<script lang="ts">
  import { onMount } from 'svelte';
  import type { Map as LeafletMap, Marker, TileLayer } from 'leaflet';
  import 'leaflet/dist/leaflet.css';

  let { lat, lng, zoom } = $props();
  
  let mapElement: HTMLDivElement;
  let map: LeafletMap;
  let marker: Marker;
  let tileLayer: TileLayer;
  
  onMount(async () => {
    // Dynamically import Leaflet to avoid SSR issues
    const L = await import('leaflet');
    
    // Initialize the map
    map = L.map(mapElement).setView([lat, lng], zoom);
    
    // Add the OpenStreetMap tiles
    tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 25,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    L.marker([lat, lng]).addTo(map);
  });
</script>
  
<div bind:this={mapElement} class='h-96 w-full my-5'></div>

<style>
    /* Import Leaflet's default marker icon styles */
    :global(.leaflet-default-icon-path) {
        background-image: url('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png');
    }
</style>