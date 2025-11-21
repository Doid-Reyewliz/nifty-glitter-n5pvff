import React, { useState, useRef, useEffect } from "react";

// --- НАСТРОЙКА ФАЙЛОВ ---
const assets = {
  ornament1: "/1.jpg",
  ornament2: "/2.jpg",
  ornament3: "/3.jpg",
  video1: "/1.mp4",
  video2: "/2.mp4",
  video3: "/3.mp4",
  reward1: "/1.1.png",
  reward2: "/2.2.png",
  reward3: "/3.3.png",
  girlBase: "/Gemini_Generated_Image_ccszxqccszxqccsz.jpg",
};

// --- Данные квиза ---
const quizData = {
  ornament1: {
    id: "ornament1",
    title: "Сұрақ №1",
    question: "Протарголды қандай бөтелкеге құяды?",
    options: [
      "Мөлдір түссіз шыны ыдысқа",
      "Қоңыр түсті бөтелкеге",
      "Ақ фарфор ыдысқа",
    ],
    correctAnswer: "Қоңыр түсті бөтелкеге",
    videoSrc: assets.video1,
    rewardImage: assets.reward1,
  },
  ornament2: {
    id: "ornament2",
    title: "Сұрақ №2",
    question: "Протаргол неге қараяды?",
    options: [
      "Ауамен әрекеттесіп тотығады",
      "Жарық әсерінен металл күміске дейін тотықсызданады",
      "Бөлме температурасының жоғарылауынан",
    ],
    correctAnswer: "Жарық әсерінен металл күміске дейін тотықсызданады",
    videoSrc: assets.video2,
    rewardImage: assets.reward2,
  },
  ornament3: {
    id: "ornament3",
    title: "Сұрақ №3",
    question: "Колларгол деген не?",
    options: [
      "30% Ag2O + 70% ЖМҚ қоспасы",
      "2% күміс нитратының сулы ерітіндісі",
      "70% Ag2O + 30% ЖМҚ (изальбин, протальбин тұздары)",
    ],
    correctAnswer: "70% Ag2O + 30% ЖМҚ (изальбин, протальбин тұздары)",
    videoSrc: assets.video3,
    rewardImage: assets.reward3,
  },
};

function App() {
  // Состояния загрузки
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isVideoBuffering, setIsVideoBuffering] = useState(false);

  const [currentOrnamentId, setCurrentOrnamentId] = useState(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  const [earnedOrnaments, setEarnedOrnaments] = useState([]);
  const videoRef = useRef(null);

  // --- ЭФФЕКТ ПРЕДЗАГРУЗКИ ---
  useEffect(() => {
    const imageUrls = [
      assets.background,
      assets.ornament1,
      assets.ornament2,
      assets.ornament3,
      assets.reward1,
      assets.reward2,
      assets.reward3,
      assets.girlBase,
    ];

    let loadedCount = 0;
    const total = imageUrls.length;

    const checkDone = () => {
      loadedCount++;
      if (loadedCount === total) {
        setTimeout(() => setIsAppLoading(false), 500); // Небольшая задержка для плавности
      }
    };

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = checkDone;
      img.onerror = checkDone; // Даже если ошибка, продолжаем
    });
  }, []);

  const handleOrnamentClick = (ornamentId) => {
    if (earnedOrnaments.includes(ornamentId)) {
      setCurrentOrnamentId(ornamentId);
      setShowRewardModal(true);
      return;
    }
    setCurrentOrnamentId(ornamentId);
    setShowQuizModal(true);
  };

  const handleAnswerClick = (selectedOption) => {
    const currentQuiz = quizData[currentOrnamentId];

    if (selectedOption === currentQuiz.correctAnswer) {
      if (!earnedOrnaments.includes(currentOrnamentId)) {
        setEarnedOrnaments([...earnedOrnaments, currentOrnamentId]);
      }
      setShowQuizModal(false);
      setShowVideoPlayer(true);
      setIsVideoBuffering(true); // Ставим индикатор загрузки видео
    } else {
      alert("Қате жауап! Қайтадан көріңіз.");
      setShowQuizModal(false);
    }
  };

  const handleVideoEnd = () => {
    setShowVideoPlayer(false);
    setIsVideoBuffering(false);
    setShowRewardModal(true);
  };

  const closeRewardModal = () => {
    setShowRewardModal(false);
    setCurrentOrnamentId(null);
  };

  // --- Стили ---
  const styles = {
    container: {
      position: "relative",
      width: "100vw",
      height: "100vh",
      // backgroundImage: `url(${assets.background})`,
      // backgroundSize: 'cover',
      // backgroundPosition: 'center',
      backgroundColor: "#ccc",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    loadingScreen: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "#fff",
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "#d4af37",
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    spinner: {
      width: "50px",
      height: "50px",
      border: "5px solid #f3f3f3",
      borderTop: "5px solid #d4af37",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      marginBottom: "20px",
    },
    ornamentsContainer: {
      display: "flex",
      gap: "50px",
      padding: "30px",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: "30px",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    },
    ornamentItem: {
      width: "140px",
      height: "140px",
      objectFit: "contain",
      borderRadius: "50%",
      cursor: "pointer",
      border: "4px solid #d4af37",
      backgroundColor: "#fff",
      padding: "10px",
      transition: "all 0.3s ease",
    },
    ornamentItemEarned: {
      borderColor: "#4caf50",
      filter: "brightness(0.9)",
      transform: "scale(0.95)",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.9)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 100,
    },
    quizBox: {
      backgroundColor: "#fff",
      padding: "40px",
      borderRadius: "20px",
      maxWidth: "600px",
      textAlign: "center",
      boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
      border: "2px solid #d4af37",
    },
    videoBox: {
      width: "80%",
      maxWidth: "900px",
      backgroundColor: "#000",
      borderRadius: "20px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      border: "2px solid #d4af37",
      position: "relative", // Для лоадера внутри
    },
    videoLoader: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: "#fff",
      fontSize: "1.2rem",
    },
    questionText: {
      fontSize: "1.5rem",
      marginBottom: "30px",
      color: "#333",
      fontWeight: "bold",
    },
    optionButton: {
      display: "block",
      width: "100%",
      padding: "15px 25px",
      margin: "12px 0",
      border: "2px solid #d4af37",
      borderRadius: "12px",
      backgroundColor: "#fffbe6",
      fontSize: "1.1rem",
      cursor: "pointer",
      transition: "all 0.2s",
      fontWeight: "500",
    },
    skipButton: {
      marginTop: "15px",
      padding: "10px 20px",
      backgroundColor: "rgba(255,255,255,0.1)",
      color: "#fff",
      border: "1px solid #fff",
      borderRadius: "30px",
      cursor: "pointer",
      marginBottom: "15px",
      fontSize: "0.9rem",
      zIndex: 10,
    },
    rewardContainer: {
      position: "relative",
      height: "90vh",
      backgroundColor: "transparent",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    rewardImage: {
      maxHeight: "85vh",
      maxWidth: "90vw",
      borderRadius: "20px",
      border: "5px solid #d4af37",
      boxShadow: "0 0 50px rgba(212, 175, 55, 0.5)",
      objectFit: "contain",
      backgroundColor: "#fff",
    },
    closeButton: {
      position: "absolute",
      top: "20px",
      right: "-60px",
      width: "50px",
      height: "50px",
      backgroundColor: "#fff",
      border: "none",
      borderRadius: "50%",
      color: "#333",
      fontSize: "1.5rem",
      fontWeight: "bold",
      cursor: "pointer",
      boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  // --- Экран загрузки приложения ---
  if (isAppLoading) {
    return (
      <div style={styles.loadingScreen}>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        <div style={styles.spinner}></div>
        <p>Жүктелуде...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* --- Главный экран --- */}
      {!showRewardModal && !showQuizModal && !showVideoPlayer && (
        <div style={styles.ornamentsContainer}>
          {["ornament1", "ornament2", "ornament3"].map((id) => {
            const isEarned = earnedOrnaments.includes(id);
            const itemStyle = isEarned
              ? { ...styles.ornamentItem, ...styles.ornamentItemEarned }
              : styles.ornamentItem;

            return (
              <div
                key={id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={assets[id]}
                  alt={`Казахское украшение ${id}`}
                  style={itemStyle}
                  onMouseOver={(e) =>
                    !isEarned &&
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseOut={(e) =>
                    !isEarned && (e.currentTarget.style.transform = "scale(1)")
                  }
                  onClick={() => handleOrnamentClick(id)}
                />
                {isEarned && (
                  <span
                    style={{
                      marginTop: "10px",
                      color: "#fff",
                      fontWeight: "bold",
                      textShadow: "0 2px 4px #000",
                    }}
                  >
                    Жарайсың!
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* --- Модальное окно Квиза --- */}
      {showQuizModal && currentOrnamentId && (
        <div style={styles.modalOverlay}>
          <div style={styles.quizBox}>
            <h2 style={{ color: "#d4af37", marginBottom: "20px" }}>
              {quizData[currentOrnamentId].title}
            </h2>
            <p style={styles.questionText}>
              {quizData[currentOrnamentId].question}
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {quizData[currentOrnamentId].options.map((option, index) => (
                <button
                  key={index}
                  style={styles.optionButton}
                  onClick={() => handleAnswerClick(option)}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#ffeba0")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#fffbe6")
                  }
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              style={{
                marginTop: "20px",
                padding: "10px",
                border: "none",
                background: "transparent",
                color: "#888",
                cursor: "pointer",
              }}
              onClick={() => setShowQuizModal(false)}
            >
              Артқа қайту
            </button>
          </div>
        </div>
      )}

      {/* --- ВИДЕО ПЛЕЕР --- */}
      {showVideoPlayer && currentOrnamentId && (
        <div style={styles.modalOverlay}>
          <div style={styles.videoBox}>
            {isVideoBuffering && (
              <div style={styles.videoLoader}>Видео жүктелуде...</div>
            )}
            <video
              ref={videoRef}
              src={quizData[currentOrnamentId].videoSrc}
              style={{ width: "100%", maxHeight: "70vh" }}
              controls
              autoPlay
              onCanPlay={() => setIsVideoBuffering(false)} // Убираем лоадер, когда видео готово
              onWaiting={() => setIsVideoBuffering(true)} // Показываем, если зависло
              onEnded={handleVideoEnd}
            >
              Сіздің браузеріңіз видеоны қолдамайды.
            </video>
            <button style={styles.skipButton} onClick={handleVideoEnd}>
              Видеоны өткізіп жіберу
            </button>
          </div>
        </div>
      )}

      {/* --- ФИНАЛ --- */}
      {showRewardModal && currentOrnamentId && (
        <div style={styles.modalOverlay}>
          <div style={styles.rewardContainer}>
            <button style={styles.closeButton} onClick={closeRewardModal}>
              ✕
            </button>
            <img
              src={quizData[currentOrnamentId].rewardImage}
              style={styles.rewardImage}
              alt="Награда"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
