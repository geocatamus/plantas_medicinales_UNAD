# 🌿 Sistema de Monitoreo — Finca El Oasis

Interfaz web para visualizar en tiempo real los datos de los nodos LoRa
desplegados en la Finca El Oasis (Mondomo, Cauca).

## 🎯 Nodos soportados

| Nodo | Tipo | Parámetros |
|------|------|------------|
| `ambiental1` | Ambiental | Temperatura, humedad, presión, UV |
| `suelo1` | Suelo 7-en-1 | Humedad, temperatura, pH, EC, N, P, K |

## 🚀 Despliegue en GitHub Pages

1. Sube los archivos `index.html`, `app.js` y `styles.css` a un repositorio.
2. Ve a **Settings → Pages**.
3. Selecciona la rama `main` y la carpeta `/root`.
4. Guarda y espera ~1 minuto.
5. Accede a `https://<usuario>.github.io/<repo>/`.

## ✨ Características

- 📊 **Dos paneles independientes** (ambiental1 y suelo1) con selector
- 📈 **Gráficas en tiempo real** con Chart.js
- 📥 **Descarga CSV y JSON** por nodo (últimos 50 registros)
- 🔄 **Actualización automática** vía Firebase Realtime Database
- 📱 **Diseño responsive** (móvil, tablet, escritorio)

## 🔥 Estructura en Firebase
