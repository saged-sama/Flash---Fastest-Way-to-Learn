import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function getMonthName(month: number){
  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"
  ]
  return months[month];
}

function getTimeAMPM(hour: number, minute: number){
  return `${hour % 12}:${minute}${hour >= 12 ? `pm`: `am`}`;
}

export function getTimePassedSince(date: string){
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  if (years > 0) return `${years} year${years > 1 ? `s`: ``} ago`;
  if (months > 0) return `${months} month${months > 1 ? `s`: ``} ago`;
  if (days > 0) return `${days} day${days > 1 ? `s`: ``} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? `s`: ``} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? `s`: ``} ago`;
  if (seconds > 0) return `${seconds} second${seconds > 30 ? `s`: ``} ago`;
  return `just now`;
}

export function getDateTimeFromString(date: string){
  // 2024-10-17T23:34:44.986209
  const d = new Date(date)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  const hour = d.getHours()
  const minute = d.getMinutes()
  return `${day} ${getMonthName(month)}, ${year} at ${getTimeAMPM(hour, minute)}`;
}

export function getCurrentUser(){
    return "f236752b-e42b-4684-b688-7ed55727beb1"
//   return localStorage.getItem("userId") as string;
}

export function getRandomInteger(min: number, max: number){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const formatPrice = (price:number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(price);
}

export function objectToFormData(obj: any){
  const formData = new FormData();
  for (const key in obj){
    formData.append(key, obj[key]);
  }
  return formData;
}

export function toCamelCase(str: string){
  return str.charAt(0).toUpperCase() + str.slice(1);
}