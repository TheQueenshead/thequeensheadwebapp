import { site } from "@/data/site";

/**
 * Button to the pub's Booking.com listing (site.bookingComUrl).
 * Renders nothing until the link has been added.
 */
export default function BookingComLink({
  className = "btn btn-gold",
  label = "View our rooms on Booking.com",
}: {
  className?: string;
  label?: string;
}) {
  if (!site.bookingComUrl) return null;
  return (
    <a href={site.bookingComUrl} target="_blank" rel="noopener noreferrer" className={className}>
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}
