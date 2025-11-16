export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
  return phoneRegex.test(phone);
}


