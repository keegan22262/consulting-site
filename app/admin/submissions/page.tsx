"use client";

import { useEffect, useState } from "react";

type Submission = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
  status: string | null;
};

type ApiResponse = {
  data?: unknown;
  error?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isSubmission(value: unknown): value is Submission {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "number" &&
    typeof value.name === "string" &&
    typeof value.email === "string" &&
    (value.phone === null || typeof value.phone === "string") &&
    typeof value.message === "string" &&
    typeof value.created_at === "string" &&
    (value.status === null || typeof value.status === "string")
  );
}

function parseSubmissions(payload: unknown): Submission[] | null {
  if (!isRecord(payload)) return null;

  const data = (payload as ApiResponse).data;
  if (!Array.isArray(data)) return null;

  return data.filter(isSubmission);
}

function parseError(payload: unknown): string | null {
  if (!isRecord(payload)) return null;

  const error = (payload as ApiResponse).error;
  return typeof error === "string" ? error : null;
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    async function loadSubmissions() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const response = await fetch("/api/submissions");
        const payload = (await response.json().catch(() => null)) as unknown;

        if (!response.ok) {
          if (!isActive) return;
          setLoadError(
            parseError(payload) || "Unable to load submissions right now."
          );
          return;
        }

        const parsed = parseSubmissions(payload);
        if (!parsed) {
          if (!isActive) return;
          setLoadError("Unexpected response from the server.");
          return;
        }

        if (isActive) {
          setSubmissions(parsed);
        }
      } catch {
        if (isActive) {
          setLoadError("Unable to load submissions right now.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadSubmissions();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Admin
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">
            Contact submissions
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Recent form submissions stored in PostgreSQL.
          </p>
        </div>

        {isLoading ? (
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
            Loading submissions...
          </div>
        ) : loadError ? (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            {loadError}
          </div>
        ) : submissions.length === 0 ? (
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
            No submissions found yet.
          </div>
        ) : (
          <>
            <div className="mt-6 grid gap-4 md:hidden">
              {submissions.map((submission) => (
                <article
                  key={submission.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {submission.name}
                      </p>
                      <p className="text-sm text-slate-600">
                        {submission.email}
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                      {submission.status || "new"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    {submission.phone || "No phone provided"}
                  </p>
                  <p className="mt-3 whitespace-pre-wrap text-sm text-slate-700">
                    {submission.message}
                  </p>
                  <p className="mt-3 text-xs text-slate-500">
                    {formatDate(submission.created_at)}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-6 hidden overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm md:block">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Phone</th>
                    <th className="px-4 py-3 font-semibold">Message</th>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {submissions.map((submission) => (
                    <tr key={submission.id} className="align-top">
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {submission.name}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {submission.email}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {submission.phone || "No phone"}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        <div className="max-w-xs whitespace-pre-wrap">
                          {submission.message}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {formatDate(submission.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                          {submission.status || "new"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
