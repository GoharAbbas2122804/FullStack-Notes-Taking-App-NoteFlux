export function formatDate(date) {
    return date.toLocaleDateString("en-US", {
        month: "long",   // Full month name (e.g., July)
        day: "numeric",  // Day of the month (e.g., 24)
        year: "numeric", // Full year (e.g., 2025)
    });
}