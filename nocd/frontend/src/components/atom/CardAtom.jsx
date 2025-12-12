export default function CardAtom({ title, content, className }) {

  return (
    <>
      {
        // Kalo ada className maka custom sendiri
        className ? (
          <div className={className}>
            <div className="card-body">
              <h2 className="font-monserrat text-lg ">{title}</h2>
              <h2 className="font-poppins text-xl font-semibold">{content}</h2>
            </div>
          </div>
        ) : (
          <div className={`card bg-base-200 card-md shadow-sm`}>
            <div className="card-body">
              <h2 className="font-monserrat text-lg ">{title}</h2>
              <h2 className="font-poppins text-xl font-semibold">{content}</h2>
            </div>
          </div >
        )}
    </>
  )
}