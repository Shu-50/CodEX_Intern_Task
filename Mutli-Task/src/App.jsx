
import { useState } from "react";
import { FaQrcode, FaCloud, FaLanguage, FaMusic, FaCalculator, FaGlobe, FaFileAlt, FaMicrophone, FaSmile, FaYoutube, FaGamepad, FaFileCode, FaHeadphones, FaLock, FaKeyboard, FaQuoteRight } from "react-icons/fa";

import QRCode from "./pages/QRCode";
import WeatherForecast from "./pages/WeatherForecaster";
import TextTranslator from "./pages/TextTranslator";
import SpotifyDownloader from "./pages/SpotifyDownloader";
import UnitConverter from "./pages/UnitConverter";
import CurrencyConverter from "./pages/CurrencyConverter";
import FileConverter from "./pages/FileConverter";
import SpeechToText from "./pages/SpeechToText";
import Jokes from "./pages/Jokes";
import Instagram from "./pages/Instagram";
import SudokuGame from "./pages/MiniGames/SudokuGame";
import ArticleSummarizer from "./pages/ArticleSummarizer";
import TextEncrypter from "./pages/TextEncrypter";
import TextToSpeech from "./pages/TextToSpeech";
import MemoryGame from "./pages/MiniGames/MemoryGamee";
// import Youtube from "./pages/youtube";

const apps = [
  { name: "QR Code", icon: <FaQrcode />, component: <QRCode /> },
  { name: "Weather", icon: <FaCloud />, component: <WeatherForecast /> },
  { name: "Translate", icon: <FaLanguage />, component: <TextTranslator /> },
  { name: "Music Downloader", icon: <FaMusic />, component: <SpotifyDownloader /> },
  { name: "Unit Converter", icon: <FaCalculator />, component: <UnitConverter /> },
  { name: "Currency Converter", icon: <FaGlobe />, component: <CurrencyConverter /> },
  { name: "File Converter", icon: <FaFileAlt />, component: <FileConverter /> },
  { name: "Speech to Text", icon: <FaMicrophone />, component: <SpeechToText /> },
  { name: "Jokes", icon: <FaSmile />, component: <Jokes /> },
  { name: "MemoryGame", icon: <FaYoutube />, component: <MemoryGame /> },
  { name: "Sudoku", icon: <FaGamepad />, component: <SudokuGame /> },
  { name: "Article Summarizer", icon: <FaFileCode />, component: <ArticleSummarizer /> },

  { name: "Text Encrypter", icon: <FaLock />, component: <TextEncrypter /> },
  { name: "Text to Speech", icon: <FaHeadphones />, component: <TextToSpeech /> },
  // { name: "YouTube", icon: <FaYoutube />, component: <Youtube /> },
];

export default function App() {
  const [activeApp, setActiveApp] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      {activeApp ? (
        <div className="w-full p-4 bg-white shadow-lg rounded-lg">
          <button onClick={() => setActiveApp(null)} className="mb-4 text-blue-500">Back</button>
          {activeApp}
        </div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {apps.map((app, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform"
              onClick={() => setActiveApp(app.component)}
            >
              <div className="text-4xl p-4 bg-white rounded-xl shadow-md">{app.icon}</div>
              <p className="mt-2 text-sm font-medium text-gray-700">{app.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}