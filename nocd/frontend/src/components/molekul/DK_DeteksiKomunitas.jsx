import { Fragment } from "react"
import CardAtom from "../atom/CardAtom"
import NetworkGraphComponent from "../atom/NetworkGraphComponent"

export default function DK_DeteksiKomunitas(
  { deteksiKomunitas, loadingDeteksiKomunitas, errorDeteksiKomunitas }
) {

  const { data, evaluasi } = deteksiKomunitas || { data: [], evaluasi: {} }

  return (
    <>
      {
        errorDeteksiKomunitas && (
          <div role="alert" className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{errorDeteksiKomunitas}</span>
          </div>
        )
      }

      {
        loadingDeteksiKomunitas && (
          <div className="skeleton h-[500px] w-full">
          </div>
        )
      }

      {!loadingDeteksiKomunitas && !errorDeteksiKomunitas && deteksiKomunitas && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold font-poppins mb-3">
            4. Hasil Deteksi Komunitas
          </h2>

          {/* Info Score - Evaluasi */}
          <div className="flex gap-3 mb-3 flex-col">
            {/* Header Section - Highlight Angka Utama */}
            <div
              className="flex justify-center items-center gap-4 tooltip tooltip-bottom" data-tip="Jumlah Komunitas yang terbentuk">
              <CardAtom
                title={"Jumlah Komunitas"}
                content={evaluasi.jumlah_komunitas}
                className="flex-1 bg-base-200 rounded-xl shadow-sm text-center"
              />
            </div>

            {/* Metrics Section - Grid yang Teratur */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                className="tooltip tooltip-bottom"
                data-tip="Mengukur kualitas pengelompokan di mana satu node bisa masuk ke beberapa komunitas sekaligus.">
                <CardAtom
                  title={"Modularity Overlapping"}
                  content={parseFloat(evaluasi.modularity_overlaping).toFixed(3)}
                  className="bg-base-200 rounded-xl hover:shadow-md transition-shadow"
                />
              </div>
              <div
                className="tooltip tooltip-bottom"
                data-tip="Perbandingan jumlah hubungan nyata dengan total kemungkinan hubungan di dalam satu kelompok.
                (Bandingkan dengan Dataset jika lebih unggul deteksi semakin bagus)">
                <CardAtom
                  title={"Density Komunitas"}
                  content={parseFloat(evaluasi.density_deteksi).toFixed(3)}
                  className="bg-base-200 rounded-xl"
                />
              </div>
              <div
                className="tooltip tooltip-bottom"
                data-tip="Ukuran kecenderungan antar node untuk saling terhubung membentuk segitiga (clique). 
                (Bandingkan dengan Dataset jika lebih unggul deteksi semakin bagus)">
                <CardAtom
                  title={"Koefisien Kluster"}
                  content={parseFloat(evaluasi.clust_coef_deteksi).toFixed(3)}
                  className="bg-base-200 rounded-xl"
                />
              </div>
              <div
                className="tooltip tooltip-bottom"
                data-tip="Persentase total hubungan dalam jaringan yang berada di dalam kelompok-kelompok komunitas.">
                <CardAtom
                  title={"Coverage"}
                  content={parseFloat(evaluasi.coverage).toFixed(3)}
                  className="bg-base-200 rounded-xl"
                />
              </div>
              <div
                className="tooltip tooltip-bottom"
                data-tip="Rasio hubungan yang keluar meninggalkan kelompok dibandingkan dengan hubungan di dalam kelompok tersebut.">
                <CardAtom
                  title={"Conductance"}
                  content={parseFloat(evaluasi.conductance).toFixed(3)}
                  className="bg-base-200 rounded-xl"
                />
              </div>
              <div
                className="tooltip tooltip-bottom"
                data-tip="Selisih antara kepadatan hubungan internal komunitas dengan kepadatan yang terjadi secara acak.">
                <CardAtom
                  title={"Newman-Firvan Modularity"}
                  content={parseFloat(evaluasi.newman_firvan_modularity).toFixed(3)}
                  className="bg-base-200 rounded-xl"
                />
              </div>
              <div
                className="tooltip tooltip-bottom"
                data-tip="Metrik modularitas yang berbasis pada pengelompokan garis hubungan (edges) daripada titik (nodes).">
                <CardAtom
                  title={"Link Modularity"}
                  content={parseFloat(evaluasi.link_modularity).toFixed(3)}
                  className="bg-base-200 rounded-xl"
                />
              </div>
              <div
                className="tooltip tooltip-bottom"
                data-tip="Nilai statistik untuk menguji signifikansi kekuatan struktur komunitas dibandingkan model jaringan acak.">
                <CardAtom
                  title={"Z Modularity"}
                  content={parseFloat(evaluasi.z_modularity).toFixed(3)}
                  className="bg-base-200 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Graf Komunitas Terbentuk */}
          <div className="w-full bg-base-200 p-6 rounded-lg mb-5">
            <h2 className="w-fit font-poppins text-lg font-semibold mb-2 ">
              Graf Hasil Deteksi Komunitas
            </h2>
            {/* <img src="https://placehold.co/2000x500/?text=GrafHasilDeteksiKomunitas" alt="Deteksi Komunitas" /> */}
            <NetworkGraphComponent
              data={data}
            />
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
                    <th className="whitespace-nowrap text-center">#</th>
                    <th className="whitespace-nowrap">Komunitas</th>
                    <th className="whitespace-nowrap">Jml Node</th>
                    <th className="min-w-38">Tipe</th>
                    <th className="min-w-[350px] text-left">Node Terdaftar</th>
                    <th className="whitespace-nowrap">Node Overlap</th>
                    <th className="whitespace-nowrap">Irisan Dengan</th>
                    <th className="whitespace-nowrap">Rasio Overlap (%)</th>
                  </tr>
                </thead>
                <tbody>

                  {data.length > 0 ? (
                    data.map((item, index) => (
                      // align-top membuat teks tetap di atas meskipun kolom sebelahnya panjang ke bawah
                      <tr key={index} className="align-top hover">
                        <th className="text-center font-semibold">{index + 1}</th>
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
                            </Fragment>
                          ))}
                        </td>
                        {/* Kolom NodeOverlap */}
                        <td className="text-sm leading-relaxed">
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
                        <td className="text-sm leading-relaxed">
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
                    ))
                  ) : (
                    <tr className="text-center font-semibold">
                      <td colSpan="7">Tidak ada data</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div>

          </div>
        </section >
      )}
    </>
  )
}