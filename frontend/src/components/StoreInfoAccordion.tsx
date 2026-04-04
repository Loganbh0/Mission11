/**
 * Footer on BrowsePage: static marketing / FAQ / privacy copy.
 * Uses Bootstrap accordion (`data-bs-toggle`); third panel mentions sessionStorage for cart + browse state.
 */
export default function StoreInfoAccordion() {
  return (
    <section className="mt-5 pt-4 border-top" aria-labelledby="store-info-heading">
      <h2
        id="store-info-heading"
        className="h5 mb-3 d-flex align-items-center gap-2 text-book-accent"
      >
        <i className="bi bi-info-circle" aria-hidden="true" />
        About Marginalia
      </h2>

      <div className="accordion accordion-flush book-card border rounded overflow-hidden" id="margStoreAccordion">
        <div className="accordion-item">
          <h3 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#margCollapseOrigin"
              aria-expanded="true"
              aria-controls="margCollapseOrigin"
            >
              The origin of Marginalia
            </button>
          </h3>
          <div
            id="margCollapseOrigin"
            className="accordion-collapse collapse show"
            data-bs-parent="#margStoreAccordion"
          >
            <div className="accordion-body text-start small">
              <p className="mb-0">
                The word <em>marginalia</em> comes from the tradition of scholars and
                readers jotting thoughts in the margins of manuscripts and printed
                books. Marginalia Bookstore takes its name from that habit of engaged
                reading. Our mission is simple: help you find books you will want to
                underline, dog-ear, and annotate—because the best stories are the ones
                you make your own.
              </p>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h3 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#margCollapseFaq"
              aria-expanded="false"
              aria-controls="margCollapseFaq"
            >
              Commonly asked questions
            </button>
          </h3>
          <div
            id="margCollapseFaq"
            className="accordion-collapse collapse"
            data-bs-parent="#margStoreAccordion"
          >
            <div className="accordion-body text-start small">
              <p className="fw-semibold mb-1">Do you ship orders?</p>
              <p className="mb-3">
                This catalog is a class demonstration. Shipping is not processed here;
                in a production store we would show carriers, rates, and delivery
                windows at checkout.
              </p>
              <p className="fw-semibold mb-1">What is your return policy?</p>
              <p className="mb-3">
                Placeholder: unopened items within 30 days, receipt required. For this
                demo, no purchases are finalized.
              </p>
              <p className="fw-semibold mb-1">How can I contact you?</p>
              <p className="mb-0">
                Placeholder: email{' '}
                <span className="text-muted">hello@example-marginalia.edu</span> or
                visit our campus pop-up during posted hours.
              </p>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h3 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#margCollapsePrivacy"
              aria-expanded="false"
              aria-controls="margCollapsePrivacy"
            >
              Privacy policy
            </button>
          </h3>
          <div
            id="margCollapsePrivacy"
            className="accordion-collapse collapse"
            data-bs-parent="#margStoreAccordion"
          >
            <div className="accordion-body text-start small">
              <p className="mb-2">
                This is a sample privacy notice for an educational bookstore demo. It
                is not legal advice.
              </p>
              <p className="mb-2">
                <strong>What we store in your browser:</strong> your shopping cart and
                catalog browse settings (such as page, sort, and category filter) may
                be kept in <code>sessionStorage</code> for the current browser tab only.
                Closing the tab clears that data.
              </p>
              <p className="mb-2">
                <strong>Payments:</strong> checkout is disabled in this project; no
                card or payment data is collected.
              </p>
              <p className="mb-0">
                <strong>Contact:</strong> for questions about this demo, reach out to
                your course instructor or TA.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
