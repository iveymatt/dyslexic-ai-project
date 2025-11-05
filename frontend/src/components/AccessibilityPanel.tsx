import { Type, LineChart, Palette, Volume2, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function AccessibilityPanel() {
  const { accessibilitySettings, updateAccessibilitySettings, accessibilityPanelOpen } = useApp();

  if (!accessibilityPanelOpen) return null;

  const fonts = [
    { value: 'inter', label: 'Inter (Default)' },
    { value: 'poppins', label: 'Poppins' },
    { value: 'opendyslexic', label: 'OpenDyslexic' },
    { value: 'verdana', label: 'Verdana' },
    { value: 'comic-sans', label: 'Comic Sans' },
  ];

  const colorSchemes = [
    { value: 'dark', label: 'Dark Mode' },
    { value: 'light', label: 'Light Mode' },
    { value: 'high-contrast', label: 'High Contrast' },
  ];

  return (
    <aside className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col h-full overflow-y-auto p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Eye size={20} />
        Accessibility
      </h2>

      {/* Font Size */}
      <div className="control-group">
        <label className="control-label flex items-center gap-2">
          <Type size={16} />
          Text Size: {accessibilitySettings.fontSize}px
        </label>
        <input
          type="range"
          min="16"
          max="24"
          step="1"
          value={accessibilitySettings.fontSize}
          onChange={(e) => updateAccessibilitySettings({ fontSize: Number(e.target.value) })}
          className="slider"
          aria-label="Font size"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>16px</span>
          <span>24px</span>
        </div>
      </div>

      {/* Line Spacing */}
      <div className="control-group">
        <label className="control-label flex items-center gap-2">
          <LineChart size={16} />
          Line Spacing: {accessibilitySettings.lineSpacing.toFixed(1)}x
        </label>
        <input
          type="range"
          min="1.5"
          max="2.0"
          step="0.1"
          value={accessibilitySettings.lineSpacing}
          onChange={(e) => updateAccessibilitySettings({ lineSpacing: Number(e.target.value) })}
          className="slider"
          aria-label="Line spacing"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1.5x</span>
          <span>2.0x</span>
        </div>
      </div>

      {/* Font Family */}
      <div className="control-group">
        <label className="control-label flex items-center gap-2">
          <Type size={16} />
          Font Family
        </label>
        <select
          value={accessibilitySettings.fontFamily}
          onChange={(e) => updateAccessibilitySettings({ fontFamily: e.target.value as any })}
          className="input"
          aria-label="Font family"
        >
          {fonts.map(font => (
            <option key={font.value} value={font.value}>
              {font.label}
            </option>
          ))}
        </select>
      </div>

      {/* Color Scheme */}
      <div className="control-group">
        <label className="control-label flex items-center gap-2">
          <Palette size={16} />
          Color Scheme
        </label>
        <div className="space-y-2">
          {colorSchemes.map(scheme => (
            <button
              key={scheme.value}
              onClick={() => updateAccessibilitySettings({ colorScheme: scheme.value as any })}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                accessibilitySettings.colorScheme === scheme.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {scheme.label}
            </button>
          ))}
        </div>
      </div>

      {/* TTS Speed */}
      <div className="control-group">
        <label className="control-label flex items-center gap-2">
          <Volume2 size={16} />
          Speech Speed: {accessibilitySettings.ttsSpeed.toFixed(1)}x
        </label>
        <input
          type="range"
          min="0.5"
          max="2.0"
          step="0.1"
          value={accessibilitySettings.ttsSpeed}
          onChange={(e) => updateAccessibilitySettings({ ttsSpeed: Number(e.target.value) })}
          className="slider"
          aria-label="Text-to-speech speed"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0.5x</span>
          <span>2.0x</span>
        </div>
      </div>

      {/* Reading Guide Toggle */}
      <div className="control-group">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="control-label mb-0">Reading Guide</span>
          <input
            type="checkbox"
            checked={accessibilitySettings.readingGuideEnabled}
            onChange={(e) => updateAccessibilitySettings({ readingGuideEnabled: e.target.checked })}
            className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-primary-600 focus:ring-2 focus:ring-primary-500"
          />
        </label>
        <p className="text-xs text-gray-400 mt-1">
          Highlights text as AI reads it aloud
        </p>
      </div>

      {/* Info Section */}
      <div className="mt-8 p-4 bg-gray-700/50 rounded-lg">
        <h3 className="font-medium mb-2 text-sm">About Accessibility</h3>
        <p className="text-xs text-gray-400 leading-relaxed">
          These controls help make the interface more comfortable for dyslexic and neurodivergent users.
          All settings are saved automatically.
        </p>
      </div>
    </aside>
  );
}
