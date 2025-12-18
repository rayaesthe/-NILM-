import { Shield, Camera, DoorOpen, AlertTriangle, CheckCircle, Users, Clock } from 'lucide-react';
import { useState } from 'react';

export function SecurityPanel() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1>Security Management</h1>
        <p className="text-gray-600">Monitor access control and surveillance systems</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-gray-600 text-sm mb-1">System Status</div>
          <div className="text-2xl mb-1">Armed</div>
          <div className="text-sm text-green-600">All systems operational</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Camera className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-gray-600 text-sm mb-1">Active Cameras</div>
          <div className="text-2xl mb-1">48/48</div>
          <div className="text-sm text-gray-600">Recording</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <DoorOpen className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-gray-600 text-sm mb-1">Access Points</div>
          <div className="text-2xl mb-1">12/24</div>
          <div className="text-sm text-gray-600">Currently unlocked</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="text-gray-600 text-sm mb-1">Alerts Today</div>
          <div className="text-2xl mb-1">2</div>
          <div className="text-sm text-gray-600">Minor incidents</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="mb-6">
              <h2>Camera Grid</h2>
              <p className="text-gray-600 text-sm">Live surveillance feeds</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <CameraFeed key={i} id={i + 1} location={getLocationName(i + 1)} status="active" />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="mb-6">
              <h2>Access Points</h2>
            </div>
            <div className="space-y-3">
              <AccessPointRow name="Main Entrance" status="unlocked" lastAccess="2 min ago" />
              <AccessPointRow name="Parking Gate A" status="unlocked" lastAccess="5 min ago" />
              <AccessPointRow name="Loading Bay" status="locked" lastAccess="45 min ago" />
              <AccessPointRow name="Executive Floor" status="locked" lastAccess="1 hour ago" />
              <AccessPointRow name="Roof Access" status="locked" lastAccess="3 hours ago" />
              <AccessPointRow name="Server Room" status="locked" lastAccess="12 hours ago" />
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2>Recent Activity</h2>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              <ActivityItem
                type="access"
                user="John Smith"
                action="Entered via Main Entrance"
                time="2 min ago"
              />
              <ActivityItem
                type="access"
                user="Sarah Johnson"
                action="Entered via Parking Gate A"
                time="5 min ago"
              />
              <ActivityItem
                type="alert"
                user="System"
                action="Motion detected Floor 8"
                time="12 min ago"
              />
              <ActivityItem
                type="access"
                user="Mike Wilson"
                action="Exited via Main Entrance"
                time="18 min ago"
              />
              <ActivityItem
                type="access"
                user="Emily Davis"
                action="Entered Server Room"
                time="32 min ago"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="mb-6">
              <h2>Quick Actions</h2>
            </div>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Emergency Lockdown
              </button>
              <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <DoorOpen className="w-5 h-5" />
                Unlock All Doors
              </button>
              <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                View Occupants
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CameraFeed({ id, location, status }: { id: number; location: string; status: 'active' | 'inactive' }) {
  return (
    <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden group cursor-pointer">
      <div className="absolute inset-0 flex items-center justify-center">
        <Camera className="w-8 h-8 text-gray-600" />
      </div>
      <div className="absolute top-2 left-2 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-gray-500'} animate-pulse`} />
        <span className="text-white text-xs">CAM {id}</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="text-white text-xs">{location}</div>
      </div>
    </div>
  );
}

function getLocationName(id: number): string {
  const locations = [
    'Main Entrance',
    'Lobby',
    'Parking Lot',
    'Floor 8 Corridor',
    'Loading Bay',
    'Elevator Bank',
    'Stairwell A',
    'Server Room',
    'Rooftop',
  ];
  return locations[id - 1] || `Location ${id}`;
}

function AccessPointRow({ name, status, lastAccess }: { name: string; status: 'locked' | 'unlocked'; lastAccess: string }) {
  const [isLocked, setIsLocked] = useState(status === 'locked');

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
      <div className="flex items-center gap-3">
        {isLocked ? (
          <Shield className="w-5 h-5 text-green-600" />
        ) : (
          <DoorOpen className="w-5 h-5 text-orange-600" />
        )}
        <div>
          <div className="text-sm">{name}</div>
          <div className="text-xs text-gray-600">Last access: {lastAccess}</div>
        </div>
      </div>
      <button
        onClick={() => setIsLocked(!isLocked)}
        className={`px-3 py-1 rounded-lg text-sm transition-colors ${
          isLocked
            ? 'bg-green-100 text-green-700 hover:bg-green-200'
            : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
        }`}
      >
        {isLocked ? 'Locked' : 'Unlocked'}
      </button>
    </div>
  );
}

function ActivityItem({ type, user, action, time }: { type: 'access' | 'alert'; user: string; action: string; time: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        type === 'access' ? 'bg-blue-100' : 'bg-yellow-100'
      }`}>
        {type === 'access' ? (
          <Users className="w-4 h-4 text-blue-600" />
        ) : (
          <AlertTriangle className="w-4 h-4 text-yellow-600" />
        )}
      </div>
      <div className="flex-1">
        <div className="text-sm">{user}</div>
        <p className="text-xs text-gray-600">{action}</p>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
    </div>
  );
}
