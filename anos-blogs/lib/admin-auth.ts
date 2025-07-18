// Simple admin authentication
export const ADMIN_CREDENTIALS = {
  email: "admin@example.com",
  password: "admin123"
}

export function validateAdminCredentials(email: string, password: string): boolean {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password
}

export function createAdminSession() {
  return {
    id: "1",
    email: ADMIN_CREDENTIALS.email,
    name: "Admin",
    role: "admin"
  }
} 