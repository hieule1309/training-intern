export default function toBytes(size, type) {
  const types = ["B", "KB", "MB", "GB", "TB"];

  const key = types.indexOf(type.toUpperCase());

  if (typeof key !== "boolean") {
    return size * 1024 ** key;
  }
  return "invalid type: type must be GB/KB/MB etc.";
}
