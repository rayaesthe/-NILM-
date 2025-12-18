const floors = [
  { floor: 'Floor 12', occupied: 45, capacity: 50, percentage: 90 },
  { floor: 'Floor 11', occupied: 38, capacity: 50, percentage: 76 },
  { floor: 'Floor 10', occupied: 42, capacity: 50, percentage: 84 },
  { floor: 'Floor 9', occupied: 31, capacity: 50, percentage: 62 },
  { floor: 'Floor 8', occupied: 47, capacity: 50, percentage: 94 },
  { floor: 'Floor 7', occupied: 29, capacity: 50, percentage: 58 },
  { floor: 'Floor 6', occupied: 35, capacity: 50, percentage: 70 },
  { floor: 'Floor 5', occupied: 41, capacity: 50, percentage: 82 },
];

export function OccupancyGrid() {
  return (
    <div className="space-y-4">
      {floors.map((floor) => (
        <div key={floor.floor}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">{floor.floor}</span>
            <span className="text-sm text-gray-600">
              {floor.occupied}/{floor.capacity}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                floor.percentage > 85
                  ? 'bg-red-500'
                  : floor.percentage > 70
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
              style={{ width: `${floor.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
