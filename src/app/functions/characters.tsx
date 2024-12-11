export function GetGenderChip(gender: string) {
  switch (gender) {
    case "male":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-600 capitalize">
          {gender}
        </span>
      );
    case "female":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-pink-100 px-2 py-1 text-xs font-semibold text-pink-600 capitalize">
          {gender}
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600 capitalize">
          other
        </span>
      );
  }
}
