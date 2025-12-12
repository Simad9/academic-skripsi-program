export default function ButtonAtom({ loading, onClick = null, text = '' }) {
  return (
    <button type="submit" className="btn bg-nocd text-white w-full mt-4" disabled={loading} onClick={onClick}>
      {loading ? 'Memproses...' : text}
    </button>
  )
}
