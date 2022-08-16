export function confirmPasswordValidator(password, confirmPassword) {
  if (!confirmPassword) return "Confirm password can't be empty.";
  if (password !== confirmPassword) return "Passwords must match.";
  return "";
}
