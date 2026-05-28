import { reactive, watch } from "vue"

export interface UserSettings {
    customCursor: boolean
}

const STORAGE_KEY = "moyingji:user-settings:v1"

const defaults: UserSettings = {
    customCursor: false,
}

export const userSettings = reactive<UserSettings>({ ...defaults })

let initialized = false

function sanitizeSettings(payload: unknown): Partial<UserSettings> {
    if (!payload || typeof payload !== "object") return {}
    const obj = payload as Record<string, unknown>
    const next: Partial<UserSettings> = {}
    if (typeof obj.customCursor === "boolean") next.customCursor = obj.customCursor
    return next
}

function readStoredSettings(): Partial<UserSettings> {
    if (typeof window === "undefined") return {}
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY)
        if (!raw) return {}
        return sanitizeSettings(JSON.parse(raw))
    }
    catch {
        return {}
    }
}

function saveSettings() {
    if (typeof window === "undefined") return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(userSettings))
}

function handleStorageChange(e: StorageEvent) {
    if (e.key !== STORAGE_KEY) return
    const next = e.newValue ? sanitizeSettings(JSON.parse(e.newValue)) : {}
    Object.assign(userSettings, defaults, next)
}

export function initUserSettings() {
    if (initialized || typeof window === "undefined") return
    initialized = true

    Object.assign(userSettings, defaults, readStoredSettings())
    watch(userSettings, saveSettings, { deep: true })
    window.addEventListener("storage", handleStorageChange)
}

export function setUserSetting<K extends keyof UserSettings>(key: K, value: UserSettings[K]) {
    userSettings[key] = value
}

export function resetUserSettings() {
    Object.assign(userSettings, defaults)
}
