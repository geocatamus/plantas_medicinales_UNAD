# 🌿 Dashboard Ambiental — Nodo 1 | Finca El Oasis

Dashboard web en tiempo real para el monitoreo de variables ambientales en el cultivo de plantas medicinales tradicionales de la **Finca El Oasis**, ubicada en el caserío El Turco, municipio de Mondomo, Cauca.

**Proyecto académico — UNAD**

## 📋 Descripción

Este dashboard consume datos desde **Firebase Realtime Database** y muestra en tiempo real las lecturas del nodo ambiental 1: temperatura, humedad, presión, índice UV, RSSI, SNR y contador de paquetes.

Incluye:
- Tarjetas con la última lectura recibida.
- Gráfica de evolución temporal (temperatura y humedad).
- Descarga de datos en formato CSV y JSON.
- Información de metadata del nodo (batería, ubicación, firmware, etc.).

## 🛠️ Tecnologías

- HTML5, CSS3, JavaScript (ES Modules)
- [Firebase Realtime Database](https://firebase.google.com/docs/database)
- [Chart.js](https://www.chartjs.org/) para las gráficas
- GitHub Pages para el alojamiento

## 🚀 Cómo ejecutarlo localmente

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo
