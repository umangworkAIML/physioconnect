import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(priceInPaise: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(priceInPaise);
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":");
  const h = parseInt(hours);
  const ampm = h >= 12 ? "PM" : "AM";
  const displayHour = h % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function generateTimeSlots(start: string, end: string, durationMinutes: number = 60): string[] {
  const slots: string[] = [];
  const [startH, startM] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);

  let currentMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  while (currentMinutes + durationMinutes <= endMinutes) {
    const fromH = Math.floor(currentMinutes / 60);
    const fromM = currentMinutes % 60;
    const toMinutes = currentMinutes + durationMinutes;
    const toH = Math.floor(toMinutes / 60);
    const toM = toMinutes % 60;

    const from = `${String(fromH).padStart(2, "0")}:${String(fromM).padStart(2, "0")}`;
    const to = `${String(toH).padStart(2, "0")}:${String(toM).padStart(2, "0")}`;
    slots.push(`${from}-${to}`);

    currentMinutes += durationMinutes;
  }

  return slots;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export const SPECIALIZATIONS = [
  "Orthopedic",
  "Sports Injury",
  "Neurological",
  "Pediatric",
  "Geriatric",
  "Cardiopulmonary",
  "Post-Surgical",
  "Women's Health",
  "Chronic Pain",
  "Spine & Back",
];

export const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
