"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Moon, Sun, Eye, Contrast, Type, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";

export function AccessibilitySettings() {
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme, theme } = useTheme();
  const [fontSize, setFontSize] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [colorBlindMode, setColorBlindMode] = useState(false);

  const toggleSettings = () => {
    setIsOpen(!isOpen);
  };

  const handleFontSizeChange = (value) => {
    setFontSize(value[0]);
    document.documentElement.style.fontSize = `${value[0]}%`;
  };

  const handleContrastChange = (value) => {
    setContrast(value[0]);
    document.documentElement.style.filter = `contrast(${value[0]}%)`;
  };

  const handleColorBlindModeChange = (checked) => {
    setColorBlindMode(checked);
    if (checked) {
      document.documentElement.style.filter = `grayscale(50%)`;
    } else {
      document.documentElement.style.filter = `contrast(${contrast}%)`;
    }
  };

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {/* Settings toggle button */}
      <motion.button
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800 text-white shadow-lg hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={toggleSettings}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={24} /> : <Settings size={24} />}
      </motion.button>

      {/* Settings panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 left-6 z-50 w-80 rounded-lg bg-zinc-900 border border-zinc-800 shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Settings header */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-4 text-white">
              <h3 className="font-medium">Accessibility Settings</h3>
              <p className="text-xs text-blue-100 mt-1">
                Customize your viewing experience
              </p>
            </div>

            {/* Settings content */}
            <div className="p-4 flex flex-col gap-6">
              {/* Dark mode toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                </div>
                <Switch
                  id="dark-mode"
                  checked={theme === "dark"}
                  onCheckedChange={toggleDarkMode}
                />
              </div>

              {/* Font size slider */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Type size={18} />
                  <Label>Font Size: {fontSize}%</Label>
                </div>
                <Slider
                  defaultValue={[100]}
                  min={80}
                  max={150}
                  step={5}
                  value={[fontSize]}
                  onValueChange={handleFontSizeChange}
                />
              </div>

              {/* Contrast slider */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Contrast size={18} />
                  <Label>Contrast: {contrast}%</Label>
                </div>
                <Slider
                  defaultValue={[100]}
                  min={80}
                  max={150}
                  step={5}
                  value={[contrast]}
                  onValueChange={handleContrastChange}
                />
              </div>

              {/* Color blind mode toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye size={18} />
                  <Label htmlFor="color-blind-mode">Color Blind Mode</Label>
                </div>
                <Switch
                  id="color-blind-mode"
                  checked={colorBlindMode}
                  onCheckedChange={handleColorBlindModeChange}
                />
              </div>

              <button className="w-full mt-2 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                Save Preferences
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
