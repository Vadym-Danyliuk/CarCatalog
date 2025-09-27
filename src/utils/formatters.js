function parseAddress(address) {
  const parts = address.split(",").map((p) => p.trim());
  return {
    city: parts[1] ?? "",
    country: parts[2] ?? "",
  };
}

export function formatThousandsSeparator(value, separator = " ") {
  return value.toLocaleString("en-US").replace(/,/g, separator);
}

export function formatCarLocation(address) {
  const { city, country } = parseAddress(address);
  return `${city}, ${country}`;
}

export function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function formatMileage(mileage) {
  return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
