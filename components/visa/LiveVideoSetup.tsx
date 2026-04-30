"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
    liveInterviewerPersonas,
    liveInterviewFocusAreas,
    liveSessionDurations,
    visaCountries,
    type LiveInterviewerPersona,
    type VisaCountry,
} from "@/lib/visa-data";
import {
    ArrowDown01Icon,
    CameraVideoIcon,
    CheckmarkCircle01Icon,
    HeadphonesIcon,
    InformationCircleIcon,
    Mic01Icon,
    Settings01Icon,
} from "hugeicons-react";

const MIC_BARS = 7;

function playTestBeep() {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 523.25;
    gain.gain.value = 0.06;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    window.setTimeout(() => {
        osc.stop();
        ctx.close();
    }, 220);
}

export function LiveVideoSetup() {
    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const rafRef = useRef<number>(0);

    const [country, setCountry] = useState<VisaCountry>("usa");
    const [focusIds, setFocusIds] = useState<Set<string>>(() => new Set(["academic"]));
    const [persona, setPersona] = useState<LiveInterviewerPersona>("strict");
    const [duration, setDuration] = useState(liveSessionDurations[0].value);
    const [recordSession, setRecordSession] = useState(true);
    const [deviceError, setDeviceError] = useState("");
    const [camLabel, setCamLabel] = useState("Camera");
    const [micLabel, setMicLabel] = useState("Microphone");
    const [micLevel, setMicLevel] = useState(0);
    const [booked, setBooked] = useState(false);
    const [previewKey, setPreviewKey] = useState(0);

    const countryLabel = visaCountries.find((c) => c.value === country)?.label ?? "your destination";

    const toggleFocus = (id: string) => {
        setFocusIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                if (next.size > 1) next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const stopStream = useCallback(() => {
        streamRef.current?.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        if (audioCtxRef.current) {
            audioCtxRef.current.close().catch(() => {});
            audioCtxRef.current = null;
        }
        analyserRef.current = null;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }, []);

    useEffect(() => {
        let cancelled = false;

        async function startDevices() {
            if (!navigator.mediaDevices?.getUserMedia) {
                setDeviceError("Camera access is not available in this browser.");
                return;
            }
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "user" },
                    audio: true,
                });
                if (cancelled) {
                    stream.getTracks().forEach((t) => t.stop());
                    return;
                }
                streamRef.current = stream;
                setDeviceError("");
                const videoTrack = stream.getVideoTracks()[0];
                const audioTrack = stream.getAudioTracks()[0];
                if (videoTrack) setCamLabel(videoTrack.label || "Camera");
                if (audioTrack) setMicLabel(audioTrack.label || "Microphone");

                const el = videoRef.current;
                if (el) {
                    el.srcObject = stream;
                    await el.play().catch(() => {});
                }

                const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
                if (AC) {
                    const ctx = new AC();
                    audioCtxRef.current = ctx;
                    const source = ctx.createMediaStreamSource(stream);
                    const analyser = ctx.createAnalyser();
                    analyser.fftSize = 128;
                    analyser.smoothingTimeConstant = 0.65;
                    source.connect(analyser);
                    analyserRef.current = analyser;
                    const data = new Uint8Array(analyser.frequencyBinCount);

                    const tick = () => {
                        analyser.getByteFrequencyData(data);
                        let sum = 0;
                        for (let i = 0; i < data.length; i++) sum += data[i];
                        const avg = sum / data.length / 255;
                        setMicLevel(avg);
                        rafRef.current = requestAnimationFrame(tick);
                    };
                    tick();
                }
            } catch {
                setDeviceError("Allow camera and microphone access to preview your setup.");
            }
        }

        startDevices();
        return () => {
            cancelled = true;
            stopStream();
        };
    }, [stopStream, previewKey]);

    function handleBook() {
        stopStream();
        setBooked(true);
    }

    if (booked) {
        return (
            <div className="pb-12">
                <div className="mx-auto max-w-lg rounded-xl border border-border bg-white p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-light">
                        <CheckmarkCircle01Icon size={28} className="text-accent-dark" strokeWidth={2} />
                    </div>
                    <h2 className="mt-4 text-lg font-semibold text-text-primary">Video session requested</h2>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        A consultant will reach out with available times for your{" "}
                        <span className="font-medium text-text-primary">{countryLabel}</span> mock interview
                        {focusIds.size > 0 && (
                            <>
                                {" "}
                                with emphasis on{" "}
                                {Array.from(focusIds)
                                    .map((id) => liveInterviewFocusAreas.find((a) => a.id === id)?.label.toLowerCase())
                                    .filter(Boolean)
                                    .join(", ")}
                                .
                            </>
                        )}
                    </p>
                    <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                        <Button
                            size="sm"
                            variant="outline"
                            type="button"
                            onClick={() => {
                                setBooked(false);
                                setPreviewKey((k) => k + 1);
                            }}
                        >
                            Edit details
                        </Button>
                        <Button
                            size="sm"
                            variant="accent"
                            type="button"
                            onClick={() => router.push("/consultation")}
                        >
                            View consultation options
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pb-12">
            <div className="mb-6">
                <p className="text-[13px] text-text-muted">Configure devices and preferences before you join a human interviewer.</p>
                <h2 className="mt-1 text-xl font-semibold text-text-primary">Setup live mock interview</h2>
                <p className="mt-1 max-w-2xl text-sm text-text-secondary">
                    Configure your environment for a realistic visa-style conversation with a trained consultant (not AI).
                </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
                <div className="space-y-5">
                    {/* Device check */}
                    <section className="rounded-xl border border-border bg-white p-5 sm:p-6">
                        <h2 className="text-[15px] font-semibold text-text-primary">Device check</h2>
                        <p className="mt-1 text-[13px] text-text-secondary">
                            We use your camera preview locally so you can fix lighting and framing before the call.
                        </p>

                        <div className="relative mt-4 overflow-hidden rounded-xl border border-border bg-slate-900/5 aspect-video">
                            <video
                                ref={videoRef}
                                className="h-full w-full object-cover"
                                playsInline
                                muted
                                autoPlay
                            />
                            {!deviceError && (
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/25 to-transparent" />
                            )}
                            {deviceError && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-surface px-4 text-center">
                                    <CameraVideoIcon size={28} className="text-text-muted" />
                                    <p className="text-[13px] text-text-secondary">{deviceError}</p>
                                </div>
                            )}
                            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 rounded-lg border border-white/40 bg-white/92 px-3 py-2">
                                <div className="flex min-w-0 items-center gap-2">
                                    <CameraVideoIcon size={16} className="shrink-0 text-primary" />
                                    <div className="min-w-0">
                                        <p className="truncate text-[12px] font-medium text-text-primary">{camLabel}</p>
                                        <p className="text-[11px] text-text-muted">
                                            {deviceError ? "Unavailable" : "Working normally"}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="shrink-0 rounded-md p-1.5 text-text-muted transition-colors hover:bg-slate-100 hover:text-text-primary"
                                    aria-label="Device settings"
                                    onClick={() => {
                                        /* Placeholder: OS handles devices; keeps parity with sample UI */
                                    }}
                                >
                                    <Settings01Icon size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <div className="rounded-lg border border-border bg-surface/80 px-3 py-3">
                                <div className="flex items-start gap-2">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent-light text-accent-dark">
                                        <Mic01Icon size={16} strokeWidth={2} />
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[12px] font-semibold text-text-primary">Microphone</p>
                                        <div className="mt-2 flex h-6 items-end gap-0.5">
                                            {Array.from({ length: MIC_BARS }, (_, i) => {
                                                const threshold = (i + 1) / MIC_BARS;
                                                const active = micLevel > threshold * 0.35;
                                                return (
                                                    <span
                                                        key={i}
                                                        className={cn(
                                                            "w-1.5 rounded-sm transition-all duration-75",
                                                            active ? "bg-accent" : "bg-slate-200"
                                                        )}
                                                        style={{ height: `${8 + i * 4}px` }}
                                                    />
                                                );
                                            })}
                                        </div>
                                        <p className="mt-2 truncate text-[11px] text-text-muted">{micLabel}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg border border-border bg-surface/80 px-3 py-3">
                                <div className="flex items-start gap-2">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary-50 text-primary">
                                        <HeadphonesIcon size={16} strokeWidth={2} />
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[12px] font-semibold text-text-primary">Speaker</p>
                                        <button
                                            type="button"
                                            onClick={playTestBeep}
                                            className="mt-2 text-[12px] font-medium text-primary hover:text-primary-dark"
                                        >
                                            Play test sound
                                        </button>
                                        <p className="mt-1 truncate text-[11px] text-text-muted">System default output</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Interview focus */}
                    <section className="rounded-xl border border-border bg-white p-5 sm:p-6">
                        <h2 className="text-[15px] font-semibold text-text-primary">Interview focus</h2>
                        <p className="mt-1 text-[13px] text-text-secondary">
                            Select where you want the interviewer to press hardest this session.
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {liveInterviewFocusAreas.map((area) => {
                                const selected = focusIds.has(area.id);
                                return (
                                    <button
                                        key={area.id}
                                        type="button"
                                        onClick={() => toggleFocus(area.id)}
                                        className={cn(
                                            "rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors",
                                            selected
                                                ? "border-primary bg-primary-50 text-primary ring-1 ring-primary/15"
                                                : "border-border bg-white text-text-secondary hover:border-primary/25 hover:text-text-primary"
                                        )}
                                    >
                                        {area.label}
                                    </button>
                                );
                            })}
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
                    <section className="rounded-xl border border-border bg-white p-5">
                        <h2 className="text-[15px] font-semibold text-text-primary">Session settings</h2>
                        <div className="mt-4 space-y-4">
                            <div>
                                <label htmlFor="live-destination" className="text-[12px] font-medium text-text-secondary">
                                    Destination
                                </label>
                                <select
                                    id="live-destination"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value as VisaCountry)}
                                    className="mt-1.5 w-full rounded-lg border border-border bg-white px-3 py-2 text-[13px] text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                                >
                                    {visaCountries.map((c) => (
                                        <option key={c.value} value={c.value}>
                                            {c.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="live-persona" className="text-[12px] font-medium text-text-secondary">
                                    Interviewer style
                                </label>
                                <select
                                    id="live-persona"
                                    value={persona}
                                    onChange={(e) => setPersona(e.target.value as LiveInterviewerPersona)}
                                    className="mt-1.5 w-full rounded-lg border border-border bg-white px-3 py-2 text-[13px] text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                                >
                                    {liveInterviewerPersonas.map((p) => (
                                        <option key={p.value} value={p.value}>
                                            {p.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="live-duration" className="text-[12px] font-medium text-text-secondary">
                                    Duration
                                </label>
                                <select
                                    id="live-duration"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    className="mt-1.5 w-full rounded-lg border border-border bg-white px-3 py-2 text-[13px] text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                                >
                                    {liveSessionDurations.map((d) => (
                                        <option key={d.value} value={d.value}>
                                            {d.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="rounded-lg border border-border bg-surface/60 px-3 py-3">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-[13px] font-medium text-text-primary">Record session</span>
                                    <button
                                        type="button"
                                        role="switch"
                                        aria-checked={recordSession}
                                        onClick={() => setRecordSession((v) => !v)}
                                        className={cn(
                                            "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2",
                                            recordSession ? "bg-primary" : "bg-slate-200"
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "pointer-events-none inline-block h-5 w-5 translate-y-0.5 rounded-full bg-white shadow transition",
                                                recordSession ? "translate-x-5" : "translate-x-0.5"
                                            )}
                                        />
                                    </button>
                                </div>
                                <p className="mt-2 text-[11px] leading-relaxed text-text-muted">
                                    {recordSession
                                        ? "Video can be saved for your review after the session, subject to consultant policy."
                                        : "No recording. Take your own notes during the call."}
                                </p>
                            </div>
                        </div>
                    </section>

                    <div className="rounded-xl border border-primary/15 bg-primary-50/60 p-5">
                        <div className="flex gap-2.5">
                            <InformationCircleIcon size={18} className="mt-0.5 shrink-0 text-primary" />
                            <p className="text-[13px] leading-relaxed text-text-secondary">
                                You will connect with a real consultant. Join from a quiet space with ID and admission documents nearby.
                                The interviewer may begin questions as soon as you enter the room.
                            </p>
                        </div>
                        <Button size="sm" className="mt-4 w-full" onClick={handleBook}>
                            <ArrowDown01Icon size={16} />
                            Book video session
                        </Button>
                    </div>
                </aside>
            </div>
        </div>
    );
}
