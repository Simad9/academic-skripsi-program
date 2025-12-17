import { titikTiga } from "../../utils/formartData";
import ButtonAtom from "../atom/ButtonAtom";

export default function DK_MasukanModel(
  {
    // onSubmit Config Model
    configModel,
    loadingConfigModel,
    errorConfigModel,
    handleConfigModel,

    // Slider Threshold
    sliderThres,
    handleThreshold,

    // Tombol Deteksi Komunitas
    loadingDeteksiKomunitas,
    handleDeteksiKomunitas
  }
) {

  return (
    <>
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
                <input type="file" className="file-input" name="file_model"
                  accept=".pth"
                  disabled={loadingConfigModel}
                  onChange={handleConfigModel} />
                {/* <label className="label">Format file (.pth)</label> */}
              </fieldset>


              {/* Loading */}
              {loadingConfigModel && (
                <div className="skeleton h-10 w-full">Membaca Model</div>
              )}

              {/* error */}
              {errorConfigModel && (
                <div role="alert" className="alert alert-error">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>{errorConfigModel}</span>
                </div>
              )}

              {!loadingConfigModel && !errorConfigModel && configModel && (
                <div className="flex flex-wrap gap-2 max-w-md mt-1">
                  <div className="badge badge-soft badge-secondary text-sm">input_dim = {titikTiga(configModel.input_dim)}</div>
                  <div className="badge badge-soft badge-secondary">hidden_dims = {JSON.stringify(configModel.hidden_dims)}</div>
                  <div className="badge badge-soft badge-secondary">output_dim = {configModel.output_dim}</div>
                  <div className="badge badge-soft badge-secondary">batch_norm = {configModel.batch_norm ? "True" : "False"}</div>
                  <div className="badge badge-soft badge-secondary">dropout = {configModel.dropout}</div>
                </div>
              )}

            </div>
          </div>

          {/* Threshold GNN */}
          <div className="w-fit">
            <p className="text-base font-montserrat font-medium mb-2 w-fit">Threshold GNN : </p>
            <div className="w-full max-w-md">
              <input type="range" min="0.1" max="0.9" value={sliderThres} className="range w-full" step="0.1" onChange={handleThreshold} />
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
          <ButtonAtom loading={loadingDeteksiKomunitas} text="Proses Model" onClick={() => handleDeteksiKomunitas()} />
        </div>
      </section >
    </>
  )
}