import React, { useMemo } from 'react';
import Plot from 'react-plotly.js';

// Fungsi untuk generate warna dinamis (handle > 100 warna)
// Menggunakan HSL dengan "Golden Angle" agar warna berbeda satu sama lain
const generateColor = (index) => {
  const hue = (index * 137.508) % 360; // Golden angle approximation
  return `hsl(${hue}, 70%, 50%)`;
};

const NetworkGraphComponent = ({ data }) => {
  // Data Sample dari Anda
  const rawData = data;

  // Step 1: Memproses Data untuk Visualisasi
  const graphData = useMemo(() => {
    const communities = [];
    const genesMap = {}; // Key: Nama Gen, Value: { communities: [], info: ... }

    // 1.a. Mapping Data Komunitas & Gen
    rawData.forEach((item, index) => {
      // Simpan info komunitas
      communities.push({
        id: item.komunitas,
        color: generateColor(index), // Assign warna unik
        genList: item.gen_terdaftar,
        irisan: item.irisan,
        rasio: item.rasio_overlap
      });

      // Mapping setiap gen ke komunitasnya
      item.gen_terdaftar.forEach(gen => {
        if (!genesMap[gen]) {
          genesMap[gen] = {
            id: gen,
            communityIndices: [], // Menyimpan index komunitas (0, 1, 2...)
            communityNames: [],   // Menyimpan nama komunitas (1, 2, 3...)
            isOverlap: false
          };
        }
        genesMap[gen].communityIndices.push(index);
        genesMap[gen].communityNames.push(item.komunitas);

        // Tandai jika gen ada di lebih dari 1 komunitas (Overlap)
        if (genesMap[gen].communityIndices.length > 1) {
          genesMap[gen].isOverlap = true;
        }
      });
    });

    // 1.b. Menghitung Koordinat (Layout Algoritma Sederhana)
    const radius = 10; // Jari-jari lingkaran komunitas
    const communityCoords = communities.map((com, i) => {
      const angle = (i / communities.length) * 2 * Math.PI;
      return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        ...com
      };
    });

    // Menghitung koordinat Gen
    const geneNodes = Object.values(genesMap).map(gen => {
      // Ambil rata-rata posisi komunitas tempat gen berada
      let sumX = 0, sumY = 0;
      gen.communityIndices.forEach(idx => {
        sumX += communityCoords[idx].x;
        sumY += communityCoords[idx].y;
      });

      const avgX = sumX / gen.communityIndices.length;
      const avgY = sumY / gen.communityIndices.length;

      // Tambahkan sedikit "noise/jitter" agar node tidak bertumpuk persis di satu titik
      const jitter = 0.5;
      const randomX = (Math.random() - 0.5) * jitter;
      const randomY = (Math.random() - 0.5) * jitter;

      return {
        ...gen,
        x: avgX + randomX,
        y: avgY + randomY,
        // Jika overlap, warnanya abu-abu gelap/hitam, jika tidak ikut warna komunitasnya
        color: gen.isOverlap ? '#333333' : communityCoords[gen.communityIndices[0]].color,
        size: gen.isOverlap ? 12 : 8 // Node overlap lebih besar
      };
    });

    return { communityCoords, geneNodes };
  }, [rawData]);

  // Step 2: Membuat Traces untuk Plotly

  // Trace untuk Garis (Edges) menghubungkan Gen ke Komunitas
  const edgeTrace = {
    x: [],
    y: [],
    mode: 'lines',
    line: { width: 0.5, color: '#ccc' },
    type: 'scatter',
    hoverinfo: 'none' // Garis tidak perlu hover
  };

  // Trace untuk Node Gen
  const nodeTrace = {
    x: [],
    y: [],
    text: [], // Info untuk hover
    mode: 'markers',
    marker: {
      size: [],
      color: [],
      line: { width: 1, color: '#fff' }
    },
    type: 'scatter',
    hoverinfo: 'text'
  };

  // Trace untuk Label Komunitas (Opsional, agar tahu posisi komunitas)
  const communityTrace = {
    x: [],
    y: [],
    text: [],
    mode: 'markers+text',
    marker: { size: 20, opacity: 0.3, color: [] },
    textposition: 'top center',
    type: 'scatter',
    hoverinfo: 'text'
  };

  // Isi data ke Traces
  graphData.geneNodes.forEach(gen => {
    // Isi Node Gen
    nodeTrace.x.push(gen.x);
    nodeTrace.y.push(gen.y);
    nodeTrace.marker.color.push(gen.color);
    nodeTrace.marker.size.push(gen.size);

    // Custom HTML untuk Tooltip/Hover
    const hoverText = `
      <b>Gen: ${gen.id}</b><br>
      Status: ${gen.isOverlap ? 'Overlap' : 'Single Community'}<br>
      Komunitas: [${gen.communityNames.join(', ')}]
    `;
    nodeTrace.text.push(hoverText);

    // Buat Garis (Edge) ke setiap komunitas pemiliknya
    gen.communityIndices.forEach(comIdx => {
      const com = graphData.communityCoords[comIdx];
      edgeTrace.x.push(gen.x, com.x, null); // null memutus garis agar tidak nyambung terus
      edgeTrace.y.push(gen.y, com.y, null);
    });
  });

  graphData.communityCoords.forEach(com => {
    communityTrace.x.push(com.x);
    communityTrace.y.push(com.y);
    communityTrace.text.push(`Kom ${com.id}`);
    communityTrace.marker.color.push(com.color);
  });

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <Plot
        data={[edgeTrace, communityTrace, nodeTrace]}
        layout={{
          title: 'Visualisasi Overlap Komunitas Gen',
          showlegend: false,
          hovermode: 'closest',
          margin: { l: 20, r: 20, t: 40, b: 20 },
          xaxis: { showgrid: false, zeroline: false, showticklabels: false },
          yaxis: { showgrid: false, zeroline: false, showticklabels: false },
          autosize: true
        }}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler={true}
      />
    </div>
  );
};

export default NetworkGraphComponent;