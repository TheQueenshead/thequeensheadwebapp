import { site } from "@/data/site";

export default function WhatsAppButton() {
  if (!site.whatsapp) return null;
  const text = encodeURIComponent(
    "Hello, I'd like to make an enquiry at The Queen's Head.",
  );
  return (
    <a
      href={`https://wa.me/${site.whatsapp}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="float-soft fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full border-[3px] border-white bg-whatsapp text-white shadow-lift transition-transform hover:scale-105 focus-visible:scale-105"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.3.7 4.6 1.9 6.6L4 29l7.7-1.9c1.4.7 2.9 1 4.3 1 6.6 0 12-5.3 12-11.9S22.6 3 16 3zm0 21.8c-1.3 0-2.6-.3-3.8-1l-.3-.2-4.4 1.1 1.2-4.2-.2-.3a9.7 9.7 0 0 1-1.7-5.3c0-5.4 4.1-9.7 9.2-9.7s9.2 4.3 9.2 9.7-4.1 9.9-9.2 9.9zm5.3-7.3c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.1-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.3-.3-.4-.6-.5z" />
      </svg>
    </a>
  );
}
