export function logEntry(entry) {
  console.log("✅ Prepared entry:", entry);
}

export function logError(context, error) {
  console.error(`❌ ${context}:`, error);
}

