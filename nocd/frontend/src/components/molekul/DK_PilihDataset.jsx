import ButtonAtom from "../atom/ButtonAtom";

export default function DK_PilihDataset(
  {
    loadingDataset,
    handleClickDataset,
    // Untuk Data Child to Parrent
    handleAmbilDataFileDataset
  }
) {
  return (
    <>
      <section className="mb-8">
        <h2 className="text-xl font-semibold font-poppins mb-3">
          1. Input Dataset
        </h2>
        <main className="flex flex-col lg:flex-row gap-5  lg:gap-6 w-full justify-start align-items-center">
          {/* File | Dataset (.xlsx) */}
          <div className="w-full max-w-xs flex-1">
            <p className="text-base font-montserrat font-medium mb-2 w-fit">Input Dataset (.xlsx) : </p>
            <input
              type="file"
              name="file_dataset"
              className="file-input"
              accept=".xlsx"
              onChange={(e) => handleAmbilDataFileDataset(e.target.files[0])}
              required // File wajib diunggah
            />
          </div>
          {/* Input | Require Score Fixed */}
          <div className="w-full max-w-xs flex-1">
            <p className="text-base font-montserrat mb-2 font-medium w-fit">Required Score : </p>
            <input type="text" className="input" defaultValue="0.400" />
          </div>
          {/* Input | Species */}
          <div className="w-full max-w-xs flex-1">
            <p className="text-base font-montserrat mb-2 font-medium w-fit">Species : </p>
            <input type="text" className="input" defaultValue="Homo sapiens (9606)" />
          </div>
          {/* Input | Network Type */}
          <div className="w-full max-w-xs flex-1">
            <p className="text-base font-montserrat mb-2 font-medium w-fit">Network Type : </p>
            <input type="text" className="input" defaultValue="Full STRING network (functional)" />
          </div>
        </main>
        {/* Button Submit */}
        <div className="max-w-xl">
          <ButtonAtom loading={loadingDataset} text="Ambil Dataset" onClick={handleClickDataset} />
        </div>
      </section>
    </>
  )
}