"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2, Phone } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { contactSection } from "@/data/home";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-image border-0 bg-mint-field px-4 py-3.5 text-[16px] text-body " +
  "placeholder:text-muted/70 outline-none ring-1 ring-transparent transition-shadow " +
  "focus:ring-2 focus:ring-brand";

const labelClass = "block text-[14px] font-semibold text-ink";

/**
 * Errors are marked with an icon and bold ink text rather than red: §3.1 scopes
 * --color-accent-red to the logo mark alone. Never colour alone anyway —
 * aria-invalid and role="alert" carry the state for assistive tech.
 */
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-start gap-1.5 text-[13px] font-bold">
      <AlertCircle aria-hidden="true" className="mt-px size-3.5 shrink-0" />
      {message}
    </p>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>(contactSection.errorBody);
  const renderedAt = useRef(0);
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      website: "",
    },
  });

  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  // Move focus to the confirmation so screen reader users are told it worked.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const onSubmit = async (values: ContactInput) => {
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          renderedAt: renderedAt.current,
          page: window.location.pathname,
        }),
      });

      const body = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setErrorMessage(body?.error ?? contactSection.errorBody);
        setStatus("error");
        return;
      }

      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push({
        event: "generate_lead",
        form_name: "contact",
        form_location: window.location.pathname,
      });

      reset();
      setStatus("success");
    } catch {
      setErrorMessage(contactSection.errorBody);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="rounded-card bg-mint-field p-8 text-center md:p-12"
      >
        <CheckCircle2 aria-hidden="true" className="mx-auto size-12 text-brand" />
        <h3 className="mt-5 text-h3 text-ink">{contactSection.successHeading}</h3>
        <p className="mt-3 text-body">{contactSection.successBody}</p>
        <a
          href={site.phoneHref}
          className="btn-label mt-7 inline-flex items-center gap-2.5 rounded-button bg-brand-dark px-7 py-4 text-white transition-colors hover:bg-brand"
        >
          <Phone aria-hidden="true" className="size-4" />
          {site.phoneDisplay}
        </a>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            aria-invalid={errors.firstName ? "true" : undefined}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            className={cn(fieldClass, "mt-2", errors.firstName && "ring-2 ring-ink")}
            {...register("firstName")}
          />
          <FieldError id="firstName-error" message={errors.firstName?.message} />
        </div>

        <div>
          <label htmlFor="lastName" className={labelClass}>
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            autoComplete="family-name"
            aria-invalid={errors.lastName ? "true" : undefined}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            className={cn(fieldClass, "mt-2", errors.lastName && "ring-2 ring-ink")}
            {...register("lastName")}
          />
          <FieldError id="lastName-error" message={errors.lastName?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(fieldClass, "mt-2", errors.email && "ring-2 ring-ink")}
            {...register("email")}
          />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={errors.phone ? "true" : undefined}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={cn(fieldClass, "mt-2", errors.phone && "ring-2 ring-ink")}
            {...register("phone")}
          />
          <FieldError id="phone-error" message={errors.phone?.message} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(fieldClass, "mt-2 resize-y", errors.message && "ring-2 ring-ink")}
          {...register("message")}
        />
        <FieldError id="message-error" message={errors.message?.message} />
      </div>

      {/* Honeypot — hidden from users and assistive tech, irresistible to bots. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 size-px overflow-hidden opacity-0"
      >
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {status === "error" ? (
        <div role="alert" className="rounded-image bg-mint-field p-4 text-[15px] text-body">
          <p>{errorMessage}</p>
          <a
            href={site.phoneHref}
            className="mt-2 inline-flex items-center gap-2 font-semibold text-brand-dark underline underline-offset-4"
          >
            <Phone aria-hidden="true" className="size-4" />
            {site.phoneDisplay}
          </a>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="btn-label flex w-full items-center justify-center gap-2.5 rounded-button bg-brand-dark px-7 py-4 text-white transition-colors hover:bg-brand disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            Sending
          </>
        ) : (
          "Send"
        )}
      </button>

      <p aria-live="polite" className="sr-only">
        {submitting ? "Sending your message" : ""}
      </p>
    </form>
  );
}
