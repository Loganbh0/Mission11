interface PaginationProps {
  currentPage: number
  totalPages: number
  pageSize: number
  onPageChange: (newPage: number) => void
  onPageSizeChange: (newSize: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange
}: PaginationProps) {
  return (
    <div className="d-flex flex-wrap align-items-center justify-content-center gap-2 mt-4 book-header">
      <button
        type="button"
        className="btn btn-book-accent btn-sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      {Array.from({ length: totalPages || 0 }, (_, index) => {
        const n = index + 1
        const isActive = currentPage === n
        return (
          <button
            key={index}
            type="button"
            className={
              isActive ? 'btn btn-sm btn-book-accent' : 'btn btn-sm btn-outline-secondary'
            }
            onClick={() => onPageChange(n)}
          >
            {n}
          </button>
        )
      })}

      <button
        type="button"
        className="btn btn-book-accent btn-sm"
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>

      <label className="d-flex align-items-center gap-2 ms-2 text-nowrap">
        <span className="small">Results per page</span>
        <select
          className="form-select form-select-sm w-auto"
          value={pageSize}
          onChange={(e) => {
            onPageSizeChange(Number(e.target.value))
            onPageChange(1)
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </label>
    </div>
  )
}
