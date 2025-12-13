import { useState, Fragment } from "react";

// Components
import TableComponent from "./molekul/TableComponent.jsx";
import ButtonAtom from "./atom/ButtonAtom.jsx";
import CardAtom from "./atom/CardAtom.jsx";

// Data
const dataDummy = [
  { Node1: 'GeneA', Node2: 'GeneB', Combine_Score: 0.876 },
  { Node1: 'GeneC', Node2: 'GeneD', Combine_Score: 0.765 },
  { Node1: 'GeneE', Node2: 'GeneF', Combine_Score: 0.654 },
  { Node1: 'GeneE', Node2: 'GeneF', Combine_Score: 0.654 },
  { Node1: 'GeneE', Node2: 'GeneF', Combine_Score: 0.654 },
  { Node1: 'GeneE', Node2: 'GeneF', Combine_Score: 0.654 },
  { Node1: 'GeneE', Node2: 'GeneF', Combine_Score: 0.654 },
  { Node1: 'GeneE', Node2: 'GeneF', Combine_Score: 0.654 },
  { Node1: 'GeneE', Node2: 'GeneF', Combine_Score: 0.654 },
  { Node1: 'GeneE', Node2: 'GeneF', Combine_Score: 0.654 },
  { Node1: 'GeneE', Node2: 'GeneF', Combine_Score: 0.654 },
  { Node1: 'GeneE', Node2: 'GeneF', Combine_Score: 0.654 },
];

const dataDummyKomunitas = [
  {
    komunitas: 1,
    jumlah_node: 150,
    tipe: "Overlaping",
    gen_terdaftar: ['GeneA', 'GeneB', 'GeneC', 'GeneA', 'GeneB', 'GeneC', 'GeneA', 'GeneB', 'GeneC', 'GeneA', 'GeneA', 'GeneA', 'GeneA', 'GeneA', 'GeneA'],
    node_overlap: ['TP53'],
    irisan: ['Kom 1', "Kom2"],
    rasio_overlap: "80%"
  },
  {
    komunitas: 2,
    jumlah_node: 80,
    tipe: "Non-Overlaping",
    gen_terdaftar: ['GeneA', 'GeneB', 'GeneC', 'GeneA', 'GeneB', 'GeneC', 'GeneA', 'GeneB', 'GeneC', 'GeneA'],
    node_overlap: ['Non'],
    irisan: ["Non"],
    rasio_overlap: "0%"
  },

]

export default function DeteksiKomunitas() {
  const [sliderValue, setSliderValue] = useState(0.500);
  const handleSliderValue = (e) => {
    setSliderValue(parseFloat(e.target.value));
  }

  const [loading, setLoading] = useState(false);
  const handleDatasetView = () => {
    setLoading(true);
    // Simulasi proses pengambilan dataset
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Ganti dengan durasi yang sesuai
  }

  const [sliderThres, setSliderThres] = useState(0.500);
  const handleSliderThres = (e) => {
    setSliderThres(parseFloat(e.target.value));
  }
  return (
    <div className="w-full mb-8">
      {/* Judul */}
      <h1 className="text-2xl font-bold font-poppins mb-5">
        Deteksi Komunitas
      </h1>
      {/* 1. Form Pilih Dataset */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold font-poppins mb-3">
          1. Pilih Dataset (.tsv)
        </h2>
        <div className="flex gap-10 w-full justify-start align-items-center">
          {/* Slider | Required Score */}
          <div className="w-full max-w-xs flex-1">
            <p className="text-base font-montserrat font-medium mb-2 w-fit">Required Score : </p>
            <div className="w-full max-w-xs">
              <input type="range" min={0.400} max={0.900} value={sliderValue} className="range" step="0.1" onChange={handleSliderValue} name="require_score" />
              <div className="flex justify-between px-2.5 mt-2 text-xs">
                <span>0.400</span>
                <span>0.500</span>
                <span>0.600</span>
                <span>0.700</span>
                <span>0.800</span>
                <span>0.900</span>
              </div>
            </div>
          </div>
          {/* Input | Species */}
          <div className="w-full max-w-xs flex-1">
            <p className="text-base font-montserrat mb-2 font-medium w-fit">Species : </p>
            <input type="text" className="input" value="Homo sapiens (9606)" />
          </div>
          {/* Input | Network Type */}
          <div className="w-full max-w-xs flex-1">
            <p className="text-base font-montserrat mb-2 font-medium w-fit">Network Type : </p>
            <input type="text" className="input" value="Full STRING network (functional)" />
          </div>
        </div>
        {/* Button Submit */}
        <div className="max-w-xl">
          <ButtonAtom loading={loading} text="Ambil Dataset" onClick={handleDatasetView} />
        </div>
      </section>
      {/* 2. Hasil Ambil Dataset */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold font-poppins mb-3">
          2. Hasil Dataset
        </h2>
        <div className="flex w-full gap-5">
          {/* Kiri */}
          <div className="w-full flex flex-col gap-5">
            <div className="flex gap-5">
              <CardAtom title={"Jumlah Simpul (Nodes)"} content={"11.983"}
                className={"flex-1 card bg-base-200 card-md shadow-sm"}
              />
              <CardAtom title={"Jumlah Tepi (Edges)"} content={"85.834"}
                className={"flex-1 card bg-base-200 card-md shadow-sm"}
              />
            </div>
            <CardAtom title={"Kepadatan (Density)"} content={"0.001196"}
              className={"card bg-base-200 card-md shadow-sm"}
            />
          </div>
          {/* Kanan */}
          <div className="w-full bg-base-200 p-6 rounded-lg">
            <h2 className="font-poppins text-lg font-semibold mb-2">
              Isi Dataset (.tsv)
            </h2>
            <TableComponent tableData={dataDummy} />
            <div className="join">
              <button className="join-item btn">«</button>
              <p className="join-item btn cursor-auto">Halaman 1</p>
              <button className="join-item btn">»</button>
            </div>
          </div>
        </div>
      </section>
      {/* 3. Masukan Model */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold font-poppins mb-3">
          3. Masukan Model GNN
        </h2>
        <div className="w-full flex gap-10">
          {/* Input Model GNN */}
          <div className="w-fit">
            <p className="text-base font-montserrat font-medium mb-2 w-fit">Input Model GNN : </p>
            <div className="flex flex-col w-full">
              <fieldset className="fieldset">
                <input type="file" className="file-input" />
                {/* <label className="label">Format file (.pth)</label> */}
              </fieldset>
              <div className="flex flex-wrap gap-2 max-w-md mt-1">
                <div class="badge badge-soft badge-secondary text-sm">input_dim = 11409</div>
                <div class="badge badge-soft badge-secondary">hidden_dims = [128]</div>
                <div class="badge badge-soft badge-secondary">output_dim = 64</div>
                <div class="badge badge-soft badge-secondary">batch_norm = True</div>
                <div class="badge badge-soft badge-secondary">dropout = 0.5</div>
              </div>
            </div>
          </div>

          {/* Threshold GNN */}
          <div className="w-fit">
            <p className="text-base font-montserrat font-medium mb-2 w-fit">Threshold GNN : </p>
            <div className="w-full max-w-md">
              <input type="range" min="0.1" max="0.9" value={sliderThres} className="range w-full" step="0.1" onChange={handleSliderThres} />
              <div className="flex justify-between px-2.5 mt-2 text-xs">
                <span>0.1</span>
                <span>0.2</span>
                <span>0.3</span>
                <span>0.4</span>
                <span>0.5</span>
                <span>0.6</span>
                <span>0.7</span>
                <span>0.8</span>
                <span>0.9</span>
              </div>
            </div>
            <p className="text-sm font-poppins font-normal mt-4 w-fit">Konektivitas internal minimum untuk komunitas yang valid</p>
            <p className="text-sm font-poppins font-normal w-fit">Rekomendasi:
              <span className="badge badge-soft badge-secondary text-sm"> 0.1</span>
              -
              <span className="badge badge-soft badge-secondary text-sm">0.4 </span>
              untuk jaringan protein
            </p>
          </div>
        </div>
        {/* Button Submit */}
        <div className="max-w-xl">
          <ButtonAtom loading={loading} text="Proses Model" onClick={handleDatasetView} />
        </div>
      </section >
      {/* 4. Hasil Deteksi Komunitas */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold font-poppins mb-3">
          4. Hasil Deteksi Komunitas
        </h2>

        {/* Info Score - Evaluasi */}
        <div className="mb-5 flex gap-5">
          <CardAtom title={"Jumlah Komunitas"} content="64"
            textTambahan="ini custom"
            className="flex-1 bg-base-200 rounded-lg"
          />
          <CardAtom title={"Modularity Overlaping (O_uv"} content="0.400"
            className="flex-1 bg-base-200 rounded-lg"
          />
          <CardAtom title={"Partition Density"} content="0.398"
            className="flex-1 bg-base-200 rounded-lg"
          />

          <CardAtom title={"Conductance"} content="0.398"
            className="flex-1 bg-base-200 rounded-lg"
          />
        </div>

        {/* Graf Komunitas Terbentuk */}
        <div className="w-full bg-base-200 p-6 rounded-lg mb-5">
          <h2 className="w-fit font-poppins text-lg font-semibold mb-2 ">
            Graf Hasil Deteksi Komunitas
          </h2>
          <img src="https://placehold.co/2000x500/?text=GrafHasilDeteksiKomunitas" alt="Deteksi Komunitas" />
        </div>

        {/* Tabel Komunitas Terbentuk */}
        <div className="w-full bg-base-200 p-6 rounded-lg">
          <h2 className="w-fit font-poppins text-lg font-semibold mb-2">
            Tabel Hasil Deteksi Komunitas
          </h2>
          <div className="overflow-x-auto max-h-[500px] w-full bg-base-200 border-2 border-nocd/50 rounded-lg">
            <table className="table table-sm table-pin-rows table-pin-cols border-collapse">
              <thead>
                <tr className="text-center font-bold bg-base-200">
                  {/* <th className="whitespace-nowrap text-center">#</th> */}
                  <th className="whitespace-nowrap">Komunitas</th>
                  <th className="whitespace-nowrap">Jml Node</th>
                  <th className="min-w-38">Tipe</th>
                  <th className="min-w-[350px] text-left">Node Terdaftar</th>
                  <th className="whitespace-nowrap">Node Overlap</th>
                  <th className="whitespace-nowrap">Irisan Dengan</th>
                  <th className="whitespace-nowrap">Rasio Overlapping (%)</th>
                </tr>
              </thead>
              <tbody>
                {dataDummyKomunitas.map((item, index) => (
                  // align-top membuat teks tetap di atas meskipun kolom sebelahnya panjang ke bawah
                  <tr key={index} className="align-top hover">
                    {/* <td className="text-center font-semibold">{index + 1}</td> */}
                    <td className="text-center">{item.komunitas}</td>
                    <td className="text-center">{item.jumlah_node}</td>
                    <td className="text-center">
                      {item.tipe == "Overlaping" ? (
                        <div class="badge badge-soft badge-primary">{item.tipe}</div>
                      ) : (
                        <div class="badge badge-soft badge-secondary">{item.tipe}</div>
                      )}
                    </td>
                    {/* Kolom Node Terdaftar */}
                    <td className="text-sm leading-relaxed">
                      {item.gen_terdaftar.map((el, idx, arr) => (
                        <Fragment key={idx}>
                          <span>{el}</span>
                          {/* Logic: Tampilkan koma jika BUKAN data terakhir */}
                          {idx < arr.length - 1 && <span>, </span>}

                          {/* Logic: Enter setiap 10 data, TAPI jangan enter jika itu data terakhir */}
                          {(idx + 1) % 10 === 0 && idx < arr.length - 1 && <br />}
                        </Fragment>
                      ))}
                    </td>
                    {/* Kolom Node Overlap */}
                    <td className="text-center">
                      {item.node_overlap.length > 0 ? (
                        item.node_overlap.map((el, idx, arr) => (
                          <span key={idx}>
                            {el}{idx < arr.length - 1 ? ', ' : ''}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    {/* Kolom Irisan */}
                    <td className="text-center">
                      {item.irisan.length > 0 ? (
                        item.irisan.map((el, idx, arr) => (
                          <span key={idx}>
                            {el}{idx < arr.length - 1 ? ', ' : ''}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="text-center font-medium">{item.rasio_overlap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>

        </div>
      </section >
    </div >
  )
}