import { Thermometer, Wind, Droplets, Sun, Moon, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

export function ClimatePanel() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1>Climate Control</h1>
        <p className="text-gray-600">Manage temperature and air quality across all zones</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Thermometer className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-gray-600 text-sm mb-1">Average Temp</div>
          <div className="text-2xl mb-1">22°C</div>
          <div className="text-sm text-gray-600">Target: 21°C</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-cyan-50 rounded-lg flex items-center justify-center">
              <Droplets className="w-6 h-6 text-cyan-600" />
            </div>
          </div>
          <div className="text-gray-600 text-sm mb-1">Humidity</div>
          <div className="text-2xl mb-1">45%</div>
          <div className="text-sm text-green-600">Optimal</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Wind className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-gray-600 text-sm mb-1">Air Quality</div>
          <div className="text-2xl mb-1">Good</div>
          <div className="text-sm text-gray-600">AQI: 42</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Sun className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="text-gray-600 text-sm mb-1">Mode</div>
          <div className="text-2xl mb-1">Cooling</div>
          <div className="text-sm text-gray-600">Auto schedule</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <h2>Quick Controls</h2>
          </div>
          <div className="space-y-6">
            <QuickControlSlider label="Target Temperature" value={21} unit="°C" min={18} max={26} />
            <QuickControlSlider label="Fan Speed" value={60} unit="%" min={0} max={100} />
            <QuickControlSlider label="Target Humidity" value={45} unit="%" min={30} max={70} />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <Sun className="w-5 h-5" />
              Day Mode
            </button>
            <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <Moon className="w-5 h-5" />
              Night Mode
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <h2>Zone Status</h2>
          </div>
          <div className="space-y-3">
            <ZoneCard zone="North Wing" temp={22} humidity={44} status="optimal" />
            <ZoneCard zone="South Wing" temp={23} humidity={46} status="warm" />
            <ZoneCard zone="East Wing" temp={21} humidity={43} status="optimal" />
            <ZoneCard zone="West Wing" temp={22} humidity={45} status="optimal" />
            <ZoneCard zone="Lobby" temp={24} humidity={48} status="warm" />
            <ZoneCard zone="Parking" temp={19} humidity={52} status="cool" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h2>Scheduled Events</h2>
        </div>
        <div className="space-y-3">
          <ScheduleRow time="06:00" action="Warm up to 21°C" zone="All zones" enabled={true} />
          <ScheduleRow time="08:00" action="Increase ventilation" zone="Office areas" enabled={true} />
          <ScheduleRow time="18:00" action="Reduce to 19°C" zone="All zones" enabled={true} />
          <ScheduleRow time="22:00" action="Night mode" zone="All zones" enabled={true} />
        </div>
      </div>
    </div>
  );
}

function QuickControlSlider({ label, value, unit, min, max }: { label: string; value: number; unit: string; min: number; max: number }) {
  const [sliderValue, setSliderValue] = useState(value);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm">{label}</span>
        <span className="text-sm">
          {sliderValue}
          {unit}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSliderValue(Math.max(min, sliderValue - 1))}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50"
        >
          <Minus className="w-4 h-4" />
        </button>
        <input
          type="range"
          min={min}
          max={max}
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="flex-1"
        />
        <button
          onClick={() => setSliderValue(Math.min(max, sliderValue + 1))}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function ZoneCard({ zone, temp, humidity, status }: { zone: string; temp: number; humidity: number; status: 'optimal' | 'warm' | 'cool' }) {
  const getStatusColor = () => {
    if (status === 'optimal') return 'bg-green-100 text-green-700';
    if (status === 'warm') return 'bg-orange-100 text-orange-700';
    return 'bg-blue-100 text-blue-700';
  };

  return (
    <div className="p-4 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <div className="mb-1">{zone}</div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{temp}°C</span>
            <span>{humidity}% humidity</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor()}`}>
          {status}
        </span>
      </div>
    </div>
  );
}

function ScheduleRow({ time, action, zone, enabled }: { time: string; action: string; zone: string; enabled: boolean }) {
  const [isEnabled, setIsEnabled] = useState(enabled);

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-600 w-16">{time}</div>
        <div>
          <div className="text-sm">{action}</div>
          <div className="text-xs text-gray-600">{zone}</div>
        </div>
      </div>
      <button
        onClick={() => setIsEnabled(!isEnabled)}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          isEnabled ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <div
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
            isEnabled ? 'translate-x-6' : ''
          }`}
        />
      </button>
    </div>
  );
}
