import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue, query, orderByKey, limitToLast } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB8VOrOMxLeojFOXQe-0AzyJYdxLn3k7C8",
  authDomain: "deteccion-picudo-cauca.firebaseapp.com",
  databaseURL: "https://deteccion-picudo-cauca-default-rtdb.firebaseio.com",
  projectId: "deteccion-picudo-cauca",
  storageBucket: "deteccion-picudo-cauca.firebasestorage.app",
  messagingSenderId: "534583178595",
  appId: "1:534583178595:web:aa31c39dc637f6dd15cf56",
  measurementId: "G-SBBF2KLSP0"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// =========================================================
// 1. GRÁFICA: la instanciamos una sola vez y luego la
//    actualizamos con .data y .update() cada vez que llegan datos
// =========================================================
const ctx = document.getElementById('chart-temp-hum').getContext('2d');

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Temperatura (°C)',
                data: [],
                borderColor: '#e53935',
                backgroundColor: 'rgba(229, 57, 53, 0.1)',
                tension: 0.3,
                yAxisID: 'yTemp',
                pointRadius: 3
            },
            {
                label: 'Humedad (%)',
                data: [],
                borderColor: '#1e88e5',
                backgroundColor: 'rgba(30, 136, 229, 0.1)',
                tension: 0.3,
                yAxisID: 'yHum',
                pointRadius: 3
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
            legend: { position: 'top' },
            tooltip: { backgroundColor: 'rgba(0,0,0,0.8)' }
        },
        scales: {
            yTemp: {
                type: 'linear',
                position: 'left',
                title: { display: true, text: 'Temperatura (°C)', color: '#e53935' },
                ticks: { color: '#e53935' }
            },
            yHum: {
                type: 'linear',
                position: 'right',
                title: { display: true, text: 'Humedad (%)', color: '#1e88e5' },
                ticks: { color: '#1e88e5' },
                grid: { drawOnChartArea: false }
            }
        }
    }
});

// =========================================================
// 2. ÚLTIMA LECTURA (tarjetas)
// =========================================================
const datosRef = ref(database, 'sistema_picudo/nodos/ambiental1/datos');
const ultimaLecturaQuery = query(datosRef, orderByKey(), limitToLast(1));

onValue(ultimaLecturaQuery, (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    const last = Object.values(data)[0];

    document.getElementById('temp-value').textContent  = `${last.temperature} °C`;
    document.getElementById('hum-value').textContent   = `${last.humidity} %`;
    document.getElementById('press-value').textContent = `${last.pressure.toFixed(1)} hPa`;
    document.getElementById('uv-value').textContent    = last.uv;
    document.getElementById('rssi-value').textContent  = `${last.rssi} dBm`;
    document.getElementById('snr-value').textContent   = `${last.snr} dB`;
    document.getElementById('count-value').textContent = last.count;
    document.getElementById('ts-value').textContent    = last.timestamp;
});

// =========================================================
// 3. HISTÓRICO PARA LA GRÁFICA
//    Traemos los últimos 20 paquetes y los ordenamos por clave
// =========================================================
const historicoQuery = query(datosRef, orderByKey(), limitToLast(20));

onValue(historicoQuery, (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    // Convertimos a array, ordenado por timestamp numérico ascendente
    const lecturas = Object.entries(data)
        .map(([k, v]) => ({ key: Number(k), ...v }))
        .sort((a, b) => a.key - b.key);

    // Etiquetas: usamos el timestamp del paquete (formato corto)
    const labels = lecturas.map(l => {
        const ts = l.timestamp;
        // Si el timestamp es muy grande lo acortamos, si no lo dejamos tal cual
        return String(ts);
    });

    chart.data.labels              = labels;
    chart.data.datasets[0].data    = lecturas.map(l => l.temperature);
    chart.data.datasets[1].data    = lecturas.map(l => l.humidity);
    chart.update();
});

// =========================================================
// 4. METADATA
// =========================================================
const metaRef = ref(database, 'sistema_picudo/nodos/ambiental1/metadata');
onValue(metaRef, (snapshot) => {
    const meta = snapshot.val();
    if (!meta) return;

    document.getElementById('meta-tipo').textContent      = meta.tipo;
    document.getElementById('meta-ubicacion').textContent = meta.ubicacion;
    document.getElementById('meta-estado').textContent    = meta.estado;
    document.getElementById('meta-bateria').textContent   = `${meta.bateria}%`;
    document.getElementById('meta-firmware').textContent  = meta.version_firmware;
    document.getElementById('meta-rssi').textContent      = `${meta.rssi_promedio} dBm`;
    document.getElementById('meta-snr').textContent       = `${meta.snr_promedio} dB`;
    document.getElementById('meta-ultima').textContent    = meta.ultima_comunicacion;
});