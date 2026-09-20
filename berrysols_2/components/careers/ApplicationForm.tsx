"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

type ApplicationFormProps = {
  roleSlug: string;
  roleTitle: string;
};

export default function ApplicationForm({ roleSlug, roleTitle }: ApplicationFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("roleSlug", roleSlug);
    formData.set("roleTitle", roleTitle);

    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Your application could not be sent.");
      }

      form.reset();
      setStatus("sent");
      setMessage("Application sent. We will be in touch soon.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Your application could not be sent.");
    }
  }

  return (
    <form onSubmit={submitApplication} className="border-t border-black/15 pt-8">
      <div className="mb-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ce4111]">01 / Personal information</p>
        <div className="grid gap-6 md:grid-cols-2">
          <label className="text-sm font-semibold">
            Name
            <input name="name" required autoComplete="name" className="mt-2 w-full border-b border-black/25 bg-transparent px-0 py-3 text-base font-normal outline-none transition-colors focus:border-[#ce4111]" />
          </label>
          <label className="text-sm font-semibold">
            Email
            <input name="email" type="email" required autoComplete="email" className="mt-2 w-full border-b border-black/25 bg-transparent px-0 py-3 text-base font-normal outline-none transition-colors focus:border-[#ce4111]" />
          </label>
          <label className="text-sm font-semibold">
            Phone
            <input name="phone" type="tel" required autoComplete="tel" className="mt-2 w-full border-b border-black/25 bg-transparent px-0 py-3 text-base font-normal outline-none transition-colors focus:border-[#ce4111]" />
          </label>
          <label className="text-sm font-semibold">
            City
            <input name="city" required autoComplete="address-level2" className="mt-2 w-full border-b border-black/25 bg-transparent px-0 py-3 text-base font-normal outline-none transition-colors focus:border-[#ce4111]" />
          </label>
        </div>
      </div>

      <div className="mb-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ce4111]">02 / Profile</p>
        <div className="space-y-6">
          <label className="block text-sm font-semibold">
            Education <span className="font-normal text-[#756f65]">(Optional)</span>
            <textarea name="education" rows={3} className="mt-2 w-full resize-y border border-black/20 bg-transparent p-4 text-base font-normal outline-none transition-colors focus:border-[#ce4111]" />
          </label>
          <label className="block text-sm font-semibold">
            Experience <span className="font-normal text-[#756f65]">(Optional)</span>
            <textarea name="experience" rows={4} className="mt-2 w-full resize-y border border-black/20 bg-transparent p-4 text-base font-normal outline-none transition-colors focus:border-[#ce4111]" />
          </label>
          <label className="block text-sm font-semibold">
            Cover note <span className="font-normal text-[#756f65]">(Optional)</span>
            <textarea name="coverNote" rows={4} className="mt-2 w-full resize-y border border-black/20 bg-transparent p-4 text-base font-normal outline-none transition-colors focus:border-[#ce4111]" />
          </label>
        </div>
      </div>

      <div className="border-t border-black/15 pt-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ce4111]">03 / Attach CV</p>
        <label className="block border border-dashed border-black/25 p-5 text-sm font-semibold transition-colors hover:border-[#ce4111]">
          CV or resume
          <input name="cv" type="file" required accept=".pdf,.doc,.docx" className="mt-3 block w-full text-sm font-normal file:mr-4 file:border-0 file:bg-[#171410] file:px-4 file:py-2 file:text-white" />
          <span className="mt-3 block text-xs font-normal text-[#756f65]">PDF, DOC, or DOCX. Maximum 5 MB.</span>
        </label>
      </div>

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={status === "sending"} className="btn text-sm font-semibold uppercase tracking-[0.04em] disabled:cursor-wait disabled:opacity-60">
          {status === "sending" ? "Sending..." : "Submit application"}
          {status !== "sending" && <ArrowUpRight size={16} aria-hidden="true" />}
        </button>
        {status === "sent" ? (
          <p className="flex items-center gap-2 text-sm text-[#28734a]"><CheckCircle2 size={17} aria-hidden="true" /> {message}</p>
        ) : status === "error" ? (
          <p className="max-w-sm text-sm text-[#b42318]">{message}</p>
        ) : null}
      </div>
    </form>
  );
}
