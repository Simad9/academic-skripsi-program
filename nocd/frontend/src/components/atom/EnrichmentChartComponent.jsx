import { useMemo, useState } from 'react';
import Plot from 'react-plotly.js';

const EnrichmentChartComponent = ({ data, label, selectedKomunitas }) => {
  const [displayLimit, setDisplayLimit] = useState(10); // Default Top 10

  // 1. Pre-process & Slice Data
  const processedData = useMemo(() => {
    // a. Sort data berdasarkan signifikansi (log10p terbesar/p-value terkecil)
    const sorted = [...data].sort((a, b) => parseFloat(b.log10p) - parseFloat(a.log10p));

    // b. Ambil sebagian data saja sesuai limit
    // Jika limit '0' atau 'All', ambil semua.
    if (displayLimit === 'All') return sorted;
    return sorted.slice(0, displayLimit);
  }, [data, displayLimit]);

  // Extract array dari data yang SUDAH DIPOTONG (processedData)
  const xValues = processedData.map(d => parseFloat(d.log10p));
  const yValues = processedData.map(d => d.term_name);
  // const pValues = processedData.map(d => d.p_value);
  const geneCounts = processedData.map(d => parseInt(d.gene_count));

  const customData = processedData.map(d => ({
    term: d.term_name,
    pVal: d.p_value,
    count: d.gene_count
  }));

  // 2. Skala Ukuran Bubble
  // Agar bubble tidak kekecilan, kita kalikan dengan faktor tertentu.
  // Math.sqrt digunakan agar perbandingan area bubble lebih proporsional secara visual.
  const markerSizes = geneCounts.map(count => Math.sqrt(count) * 15);

  // 3. Dynamic Height (Solusi Data Banyak)
  // Jika data ada 50, tinggi grafik jadi 50 * 30px = 1500px.
  // Minimal tinggi 450px agar tetap bagus jika data sedikit.
  // const dynamicHeight = Math.max(450, data.length * 35 + 100);

  return (
    <div className='w-full'>
      <div className="flex justify-between items-center mb-4 px-2">
        <label className="text-sm font-semibold text-gray-700">
          Jumlah Data Ditampilkan:
        </label>
        <select
          value={displayLimit}
          onChange={(e) => setDisplayLimit(e.target.value === 'All' ? 'All' : parseInt(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
        >
          <option value={5}>Top 5</option>
          <option value={10}>Top 10</option>
          <option value={20}>Top 20</option>
          <option value={50}>Top 50</option>
          <option value="All">Tampilkan Semua (Berat)</option>
        </select>
      </div>

      <div className="w-full overflow-x-auto flex justify-center">
        <Plot
          data={[
            {
              x: xValues,
              y: yValues,
              mode: 'markers',
              // OPTIONAL: Ganti type ke 'scattergl' jika data > 500
              // type: 'scattergl', 
              marker: {
                size: markerSizes,
                color: xValues,
                colorscale: 'Viridis',
                reversescale: true,
                showscale: true,
                colorbar: { title: '-log10(p)', thickness: 15 },
                line: { color: 'white', width: 1 }
              },
              text: customData.map(d => d.term),
              customdata: customData,
              hovertemplate:
                '<b>%{customdata.term}</b><br><br>' +
                '-log10(p): <b>%{x:.2f}</b><br>' +
                'P-value: %{customdata.pVal}<br>' +
                'Gene Count: %{customdata.count}' +
                '<extra></extra>',
            }
          ]}
          layout={{
            title: { text: `Top ${displayLimit === 'All' ? processedData.length : displayLimit} Enrichment Terms`, font: { size: 16 } },
            xaxis: { title: '-log10(p)', zeroline: false, gridcolor: '#eee' },
            yaxis: {
              automargin: true,
              gridcolor: '#eee',
              // Pakai categoryorder agar yang paling signifikan ada di ATAS graf
              categoryorder: 'total ascending'
            },
            margin: { l: 250, r: 50, t: 50, b: 50 },
            // height: dynamicHeight,
            height: 400,
            hovermode: 'closest',
          }}
          // Agar responsif mengikuti lebar container induk
          style={{ width: '100%', height: '100%' }}
          useResizeHandler={true}
          config={{ displayModeBar: false }} // Menyembunyikan toolbar plotly (zoom, pan, dll) agar bersih
        />
      </div>
    </div>
  );
};

export default EnrichmentChartComponent;