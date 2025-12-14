import ButtonAtom from "../atom/ButtonAtom";

export default function DK_PilihDataset(
  {
    sliderRequireScore, handleSliderValue, loadingDataset, handleClickDataset
  }
) {
  return (
    <>
      <section className="mb-8">
        <h2 className="text-xl font-semibold font-poppins mb-3">
          1. Pilih Dataset (.tsv)
        </h2>
        <div className="flex gap-10 w-full justify-start align-items-center">
          {/* Slider | Required Score */}
          <div className="w-full max-w-xs flex-1">
            <p className="text-base font-montserrat font-medium mb-2 w-fit">Required Score : </p>
            <div className="w-full max-w-xs">
              <input type="range" min={0.400} max={0.900} defaultValue={sliderRequireScore} className="range" step="0.1" onChange={handleSliderValue} name="require_score" />
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
            <input type="text" className="input" defaultValue="Homo sapiens (9606)" />
          </div>
          {/* Input | Network Type */}
          <div className="w-full max-w-xs flex-1">
            <p className="text-base font-montserrat mb-2 font-medium w-fit">Network Type : </p>
            <input type="text" className="input" defaultValue="Full STRING network (functional)" />
          </div>
        </div>
        {/* Button Submit */}
        <div className="max-w-xl">
          <ButtonAtom loading={loadingDataset} text="Ambil Dataset" onClick={() => handleClickDataset(sliderRequireScore)} />
        </div>
      </section>
    </>
  )
}