import { useState, useEffect } from "react";

interface CountdownBoxProps {
  value: number;
  label: string;
}

interface MemoryCardProps {
  title: string;
  description: string;
  imageUrl: string;
  onClick: () => void;
}

interface Note {
  id: string;
  title: string;
  content: string;
}

interface DateIdea {
  category: string;
  description: string;
}

interface Game {
  name: string;
  description: string;
  emoji: string;
}

interface Memory {
  title: string;
  description: string;
  imageUrl: string;
}

const KenjiWebsite = () => {
  const [activeTab, setActiveTab] = useState("countdown");

  const tabs = [
    { id: "countdown", label: "Countdown", icon: "⏰" },
    { id: "memories", label: "Memories", icon: "📸" },
    { id: "notes", label: "Love Notes", icon: "💌" },
    { id: "reasons", label: "Reasons", icon: "💝" },
    { id: "date", label: "Date Night", icon: "🎬" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "countdown":
        return <CountdownSection />;
      case "memories":
        return <MemoryBookSection />;
      case "notes":
        return <LoveNotesSection />;
      case "reasons":
        return <ReasonsSection />;
      case "date":
        return <DateIdeasSection />;
      default:
        return <CountdownSection />;
    }
  };

  return (
    <div className="bg-pink-50 min-h-screen font-sans flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col items-center">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-[#A95C68] text-white shadow-lg transform scale-105"
                  : "bg-white text-[#A95C68] hover:bg-[#A95C68] hover:text-white shadow-md"
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="w-full max-w-6xl animate-fadeIn">
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Header = () => {
  return (
    <header className="bg-[#A95C68] text-white text-center py-10 shadow-md">
      <h1 className="font-serif text-4xl mb-2 flex items-center justify-center gap-3">
        <img
          src="/icons/cat.png"
          alt="Smiling cat"
          className="w-12 h-12 object-contain"
        />
        AwaWa
        <img
          src="/icons/cat.png"
          alt="Smiling cat"
          className="w-12 h-12 object-contain"
        />
      </h1>
      <p className="text-lg">I miss you and I'm hungry</p>
    </header>
  );
};

const CountdownSection = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const target = new Date("April 4, 2025 00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setMinutes(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((difference % (1000 * 60)) / 1000));
    };

    // Run once immediately
    updateCountdown();

    // Then set interval
    const interval = setInterval(updateCountdown, 1000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white rounded-lg p-8 shadow-lg border-2 border-[#A95C68] transition-transform duration-300">
      <h2 className="text-[#FFFFFF] text-3xl font-serif text-center mb-6"></h2>
      <div className="text-center text-xl mb-6">
        <p className="text-2xl font-medium mb-6">We will meet in:</p>
        <div className="flex flex-wrap justify-center gap-6">
          <CountdownBox value={days} label="Days" />
          <CountdownBox value={hours} label="Hours" />
          <CountdownBox value={minutes} label="Minutes" />
          <CountdownBox value={seconds} label="Seconds" />
        </div>
      </div>
      <p className="text-center mt-8 text-[#A95C68] font-medium italic text-xl">
        April 4, 2025 ♥
      </p>
    </section>
  );
};

const CountdownBox = ({ value, label }: CountdownBoxProps) => {
  return (
    <div className="bg-[#A95C68] text-white p-4 rounded-lg w-28 h-28 flex flex-col items-center justify-center shadow-lg">
      <div className="text-4xl font-bold">{value}</div>
      <div className="text-sm uppercase font-semibold mt-1">{label}</div>
    </div>
  );
};

const MemoryBookSection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const memories: Memory[] = [
    {
      title: "Our First Date",
      description: "Do you remember what happened on our first date?",
      imageUrl: "/images/IMG_4229.JPG",
    },
    {
      title: "That Perfect Sunset",
      description: "Every sunset with you is always perfect actually...",
      imageUrl: "/images/IMG_4230.JPG",
    },
    {
      title: "Our first trip together",
      description: "Going places with you makes me the happiest girl.",
      imageUrl: "/images/IMG_2819_Original.jpg",
    },
    {
      title: "Late Night Calls",
      description: "Falling asleep knowing you're there is the best.",
      imageUrl: "/images/IMG_1490_Original.jpg",
    },
  ];

  return (
    <section className="bg-white rounded-lg p-8 shadow-md border-t-4 border-[#A95C68] transition-transform duration-300">
      <h2 className="text-[#A95C68] text-3xl font-serif text-center mb-4">
        Our Memory
      </h2>
      <p className="text-center mb-6"></p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {memories.map((memory, index) => (
          <MemoryCard
            key={index}
            title={memory.title}
            description={memory.description}
            imageUrl={memory.imageUrl}
            onClick={() => setSelectedImage(memory.imageUrl)}
          />
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300"
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Full size memory"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};

const MemoryCard = ({
  title,
  description,
  imageUrl,
  onClick,
}: MemoryCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="bg-pink-100 rounded-lg overflow-hidden transition-transform hover:scale-105 transform duration-300 shadow-md cursor-pointer"
      onClick={onClick}
    >
      <div className="relative bg-gray-200 h-40">
        {!imageError ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-600">
            <p>Image not found</p>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-[#A95C68] font-serif mb-2">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

const LoveNotesSection = () => {
  const [openNoteId, setOpenNoteId] = useState<string | null>(null);

  const notes: Note[] = [
    {
      id: "note1",
      title: "Open When You Miss Me",
      content: "Wow, thought you'd never open this one. lol JK",
    },
    {
      id: "note2",
      title: "Open When You Need Motivation",
      content:
        "You are stronger than you know. I believe in you and all that you can accomplish. Keep going, my love. I'm cheering for you and ofc I will give you the best head! ♥",
    },
    {
      id: "note3",
      title: "Open When You Feel Alone",
      content:
        "I'm with you always, no matter the distance between us. I'll always be here supporting you. I can also send you nudes. ♥",
    },
  ];

  const toggleNote = (id: string) => {
    if (openNoteId === id) {
      setOpenNoteId(null);
    } else {
      setOpenNoteId(id);
    }
  };

  return (
    <section className="bg-white rounded-lg p-8 shadow-md border-t-4 border-[#A95C68] transition-transform duration-300">
      <h2 className="text-[#A95C68] text-3xl font-serif text-center mb-4">
        Love Notes For You
      </h2>
      <p className="text-center mb-6">Click to open</p>
      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="text-center">
            <div
              className={`bg-pink-100 rounded-lg p-6 cursor-pointer transition-all duration-300 ${
                openNoteId === note.id
                  ? "bg-[#A95C68] text-black"
                  : "hover:bg-[#A95C68] hover:text-black"
              }`}
              onClick={() => toggleNote(note.id)}
            >
              <h3 className="font-serif text-xl">{note.title}</h3>
            </div>
            {openNoteId === note.id && (
              <div className="bg-white rounded-lg p-6 mt-4 shadow-md font-serif text-[#7a3f4a] border border-[#A95C68]">
                {note.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const ReasonsSection = () => {
  const [activeReason, setActiveReason] = useState<number | null>(null);

  const reasons: string[] = [
    "Your kindness knows no bounds",
    "The way you talk about things you love",
    "How you always know exactly what to say to make me feel better",
    "Your determination and passion for everything you do",
    "The sound of your voice that feels like home",
    "Your patience",
    "The way you make even ordinary moments feel magical",
  ];

  const handleClick = (index: number) => {
    setActiveReason(index);
    setTimeout(() => setActiveReason(null), 1000);
  };

  return (
    <section className="bg-white rounded-lg p-8 shadow-md border-t-4 border-[#A95C68] transition-transform duration-300">
      <h2 className="text-[#A95C68] text-3xl font-serif text-center mb-4">
        Reasons Why I Love You
      </h2>
      <p className="text-center mb-6">In case you don't know</p>
      <div className="space-y-4">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className={`bg-pink-100 rounded-lg p-6 text-center cursor-pointer transition-all duration-300 shadow-sm ${
              activeReason === index
                ? "bg-[#A95C68] text-black transform -translate-y-1 shadow-md"
                : "hover:bg-[#A95C68] hover:text-black hover:-translate-y-1"
            }`}
            onClick={() => handleClick(index)}
          >
            {reason}
          </div>
        ))}
      </div>
    </section>
  );
};

const DateIdeasSection = () => {
  const [showGamePopup, setShowGamePopup] = useState(false);

  const games: Game[] = [
    {
      name: "Lipreading",
      description: "Can you read my lips? 👄",
      emoji: "👄",
    },
    {
      name: "Would You Rather?",
      description: "Make some tough choices! 🤔",
      emoji: "🤔",
    },
    {
      name: "Story Builder",
      description: "Let's create a story together! 📖",
      emoji: "📖",
    },
    { name: "Charades", description: "Time to act it out! 🎭", emoji: "🎭" },
    {
      name: "Draw & Guess",
      description: "Can you guess what I'm drawing? 🎨",
      emoji: "🎨",
    },
    {
      name: "Truth or Dare",
      description: "Let's spice things up! 🌶️",
      emoji: "🌶️",
    },
  ];

  const dateIdeas: DateIdea[] = [
    {
      category: "Movie Night",
      description: "Let's watch a movie together! ",
    },
    {
      category: "Game Night",
      description:
        "Choose from our collection of fun games to play together! 🎮",
    },
    {
      category: "Quiz Night",
      description:
        "Let's create a quiz all about us! Let's see how well you know our relationship 💝",
    },
  ];

  return (
    <section className="bg-white rounded-lg p-8 shadow-md border-t-4 border-[#A95C68] transition-transform duration-300">
      <h2 className="text-[#A95C68] text-3xl font-serif text-center mb-4">
        Date Night
      </h2>
      <p className="text-center mb-6">
        Let's spend quality time together, even when we're apart.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dateIdeas.map((idea, index) => {
          if (idea.category === "Movie Night") {
            return (
              <a
                key={index}
                href="https://rave.io/?openRaveId=9082957e-1171-4716-9aa3-4748e82147ac"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-100 rounded-lg p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:bg-[#A95C68] group shadow-sm cursor-pointer"
              >
                <div className="font-bold text-[#A95C68] mb-2 group-hover:text-white">
                  {idea.category}
                </div>
                <p className="group-hover:text-white">{idea.description}</p>
              </a>
            );
          } else if (idea.category === "Game Night") {
            return (
              <div
                key={index}
                onClick={() => setShowGamePopup(true)}
                className="bg-pink-100 rounded-lg p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:bg-[#A95C68] group shadow-sm cursor-pointer"
              >
                <div className="font-bold text-[#A95C68] mb-2 group-hover:text-white">
                  {idea.category}
                </div>
                <p className="group-hover:text-white">{idea.description}</p>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className="bg-pink-100 rounded-lg p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:bg-[#A95C68] group shadow-sm"
              >
                <div className="font-bold text-[#A95C68] mb-2 group-hover:text-white">
                  {idea.category}
                </div>
                <p className="group-hover:text-white">{idea.description}</p>
              </div>
            );
          }
        })}
      </div>

      {/* Game Selection Popup */}
      {showGamePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-serif text-[#A95C68]">
                Choose a Game
              </h3>
              <button
                onClick={() => setShowGamePopup(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {games.map((game, index) => (
                <button
                  key={index}
                  onClick={() => {
                    // Add game-specific logic here
                    setShowGamePopup(false);
                  }}
                  className="bg-pink-50 p-6 rounded-lg text-left transition-all duration-300 hover:bg-[#A95C68] hover:text-white group"
                >
                  <div className="text-4xl mb-2">{game.emoji}</div>
                  <h4 className="font-bold text-[#A95C68] group-hover:text-white mb-1">
                    {game.name}
                  </h4>
                  <p className="text-sm">{game.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#A95C68] text-white text-center py-8 mt-8">
      <p className="mb-2">Made just for you, Kenji</p>
      <p>Can't wait to see you laew!</p>
    </footer>
  );
};

export default KenjiWebsite;
