"use client";

import { useState, type FormEvent } from "react";
import type { EnquiryType } from "@/lib/enquiries";

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "date" | "time" | "number" | "select" | "textarea" | "url";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  min?: number | string;
  max?: number | string;
  half?: boolean; // sit two fields side by side
  help?: string;
};

type Props = {
  type: EnquiryType;
  fields: FieldDef[];
  submitLabel?: string;
  note?: React.ReactNode;
  successTitle?: string;
  successBody?: string;
};

const baseFields: FieldDef[] = [
  { name: "name", label: "Your name", required: true, half: true, placeholder: "Jane Smith" },
  { name: "email", label: "Email address", type: "email", required: true, half: true, placeholder: "jane@example.com" },
  { name: "phone", label: "Phone number", type: "tel", half: true, placeholder: "07…" },
];

export default function EnquiryForm({
  type,
  fields,
  submitLabel = "Send enquiry",
  note,
  successTitle = "Thank you — we've got your enquiry",
  successBody = "One of the team will be in touch shortly to confirm. Nothing is booked until we've replied.",
}: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const extra: Record<string, string> = {};
    for (const f of fields) {
      const v = data.get(f.name);
      if (typeof v === "string") extra[f.name] = v;
    }

    const payload = {
      type,
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      website: String(data.get("website") ?? ""),
      fields: extra,
    };

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong");
      setStatus("done");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "done") {
    return (
      <div
        role="status"
        className="rounded-[var(--radius-md)] border border-gold-dark bg-white p-8 text-center shadow-soft"
      >
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-gold text-2xl text-ink" aria-hidden="true">
          ✓
        </div>
        <h3 className="text-2xl">{successTitle}</h3>
        <p className="mx-auto mt-2 max-w-[46ch] text-muted">{successBody}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn btn-outline btn-sm mt-6"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const all = [...baseFields, ...fields];

  return (
    <form onSubmit={onSubmit} noValidate={false} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {all.map((f) => (
          <Field key={f.name} def={f} />
        ))}
      </div>

      {/* Honeypot — hidden from people, tempting to bots */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${type}-website`}>Leave this field empty</label>
        <input id={`${type}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {note && <div className="rounded-[var(--radius-sm)] border-l-4 border-wine bg-cream px-4 py-3 text-sm text-body">{note}</div>}

      {error && (
        <p role="alert" className="rounded-[var(--radius-sm)] bg-wine/10 px-4 py-3 text-sm font-medium text-wine-dark">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : submitLabel}
        </button>
        <p className="text-xs text-muted">
          We&rsquo;ll only use your details to respond to this enquiry.
        </p>
      </div>
    </form>
  );
}

function Field({ def }: { def: FieldDef }) {
  const id = `f-${def.name}`;
  const span = def.half ? "" : "sm:col-span-2";
  const common = {
    id,
    name: def.name,
    required: def.required,
    placeholder: def.placeholder,
    className: "field",
    "aria-describedby": def.help ? `${id}-help` : undefined,
  };

  return (
    <div className={span}>
      <label htmlFor={id} className="label">
        {def.label}
        {def.required && <span className="text-wine"> *</span>}
      </label>
      {def.type === "textarea" ? (
        <textarea {...common} rows={4} />
      ) : def.type === "select" ? (
        <select {...common} defaultValue="">
          <option value="" disabled>
            Please choose…
          </option>
          {def.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...common}
          type={def.type ?? "text"}
          min={def.min}
          max={def.max}
          autoComplete={
            def.name === "name" ? "name" : def.name === "email" ? "email" : def.name === "phone" ? "tel" : undefined
          }
        />
      )}
      {def.help && (
        <p id={`${id}-help`} className="mt-1 text-xs text-muted">
          {def.help}
        </p>
      )}
    </div>
  );
}
