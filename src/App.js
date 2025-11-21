import React, { useState, useRef, useEffect } from 'react';

// --- ВАЖНО: НАСТРОЙКА ФАЙЛОВ ---
// Переместите файлы видео в папку 'public' и назовите их video1.mp4, video2.mp4, video3.mp4
const assets = {
  // background: '/image_c54f41.png',
  ornament1: '/1.jpg', 
  ornament2: '/2.jpg', 
  ornament3: '/3.jpg', 
  girl: '/Gemini_Generated_Image_ccszxqccszxqccsz.jpg',
  // Видео файлы
  video1: '/1.mp4',
  video2: '/2.mp4',
  video3: '/3.mp4', 
};

// --- Компонент для картинки с защитой от ошибок ---
const SafeImage = ({ src, alt, style, ...props }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div style={{
        ...style, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#f8d7da', 
        color: '#721c24', 
        fontSize: '12px', 
        textAlign: 'center',
        border: '2px dashed #f5c6cb',
        padding: '5px'
      }}>
        Нет файла: <br/> {src}
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      style={style} 
      onError={() => setHasError(true)} 
      {...props} 
    />
  );
};

// --- Данные квиза ---
const quizData = {
  ornament1: {
    id: 'ornament1',
    title: 'Украшение №1',
    question: "Как называется это украшение и где его традиционно носят?",
    options: [
      "Сырға, носят в ушах",
      "Блезік (браслет), носят на запястье",
      "Шолпы, вплетают в косы"
    ],
    correctAnswer: "Блезік (браслет), носят на запястье",
    videoSrc: assets.video1, // Ссылка на видео для этого вопроса
  },
  ornament2: {
    id: 'ornament2',
    title: 'Украшение №2',
    question: "Каково основное значение нагрудных украшений (Алқа, Тұмар) у казахов?",
    options: [
      "Они служили только для красоты",
      "Их носили только мужчины",
      "Они часто служили оберегами и защитой"
    ],
    correctAnswer: "Они часто служили оберегами и защитой",
    videoSrc: assets.video2,
  },
  ornament3: {
    id: 'ornament3',
    title: 'Украшение №3',
    question: "Что это за парное украшение?",
    options: [
      "Сырға (серьги)",
      "Жүзік (кольца)",
      "Білезік (парные браслеты)"
    ],
    correctAnswer: "Сырға (серьги)",
    videoSrc: assets.video3,
  },
};

function App() {
  const [currentOrnamentId, setCurrentOrnamentId] = useState(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showGirlModal, setShowGirlModal] = useState(false);
  // Новое состояние: показываем ли сейчас видео
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  
  const [earnedOrnaments, setEarnedOrnaments] = useState([]);
  const videoRef = useRef(null);

  const handleOrnamentClick = (ornamentId) => {
    if (earnedOrnaments.includes(ornamentId)) {
        alert("Вы уже получили это украшение!");
        return;
    }
    setCurrentOrnamentId(ornamentId);
    setShowQuizModal(true);
  };

  const handleAnswerClick = (selectedOption) => {
    const currentQuiz = quizData[currentOrnamentId];
    
    if (selectedOption === currentQuiz.correctAnswer) {
      // 1. Сохраняем прогресс
      if (!earnedOrnaments.includes(currentOrnamentId)) {
        setEarnedOrnaments([...earnedOrnaments, currentOrnamentId]);
      }
      // 2. Закрываем квиз
      setShowQuizModal(false);
      // 3. Открываем видео (вместо девушки)
      setShowVideoPlayer(true);
    } else {
      alert("К сожалению, ответ неверный. Попробуйте еще раз!");
      setShowQuizModal(false);
    }
  };

  // Когда видео заканчивается
  const handleVideoEnd = () => {
      setShowVideoPlayer(false);
      setShowGirlModal(true); // Показываем девушку после видео
  };

  const closeGirlModal = () => {
    setShowGirlModal(false);
    setCurrentOrnamentId(null);
  };

  // --- Стили ---
  const styles = {
    container: {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#ccc', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    backgroundLayer: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        // backgroundImage: `url(${assets.background})`,
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        backgroundColor: 'rgba(122,112,121,0.4)',
        zIndex: 0,
    },
    contentLayer: {
        position: 'relative',
        zIndex: 1,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ornamentsContainer: {
        display: 'flex',
        gap: '50px',
        padding: '20px',
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: '20px',
        backdropFilter: 'blur(5px)',
    },
    ornamentItem: {
        width: '120px',
        height: '120px',
        objectFit: 'cover',
        borderRadius: '10px',
        cursor: 'pointer',
        border: '3px solid gold',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        backgroundColor: '#fff', 
    },
    ornamentItemEarned: {
        filter: 'grayscale(80%)',
        opacity: 0.7,
        cursor: 'default',
        borderColor: '#ccc',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
    quizBox: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '15px',
        maxWidth: '500px',
        textAlign: 'center',
        boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
    },
    videoBox: {
        width: '80%',
        maxWidth: '800px',
        backgroundColor: '#000',
        borderRadius: '10px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    questionText: {
        fontSize: '1.2rem',
        marginBottom: '20px',
        color: '#333',
    },
    optionButton: {
        display: 'block',
        width: '100%',
        padding: '12px 20px',
        margin: '10px 0',
        border: '2px solid #d4af37',
        borderRadius: '8px',
        backgroundColor: '#fffbe6',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    skipButton: {
        marginTop: '10px',
        padding: '8px 16px',
        backgroundColor: '#333',
        color: '#fff',
        border: '1px solid #555',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '10px'
    },
    girlContainer: {
        position: 'relative',
        width: 'auto',
        height: '90vh',
        backgroundColor: '#fff',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
        display: 'flex',
        justifyContent: 'center',
    },
    girlBaseImage: {
        height: '100%',
        width: 'auto',
        objectFit: 'contain',
    },
    closeButton: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        padding: '10px 20px',
        backgroundColor: '#d4af37',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        fontSize: '1rem',
        cursor: 'pointer',
        zIndex: 10,
    },
    // Позиции украшений на девушке
    wornOrnament1: { 
        position: 'absolute',
        top: '58%', 
        left: '35%',
        width: '10%',
        transform: 'rotate(-20deg)',
        zIndex: 2,
        filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))'
    },
    wornOrnament2: { 
        position: 'absolute',
        top: '28%', 
        left: '46%',
        width: '15%',
        zIndex: 3,
        filter: 'drop-shadow(2px 4px 4px rgba(0,0,0,0.5))'
    },
    wornOrnament3: { 
        position: 'absolute',
        top: '18%', 
        left: '42%',
        width: '16%',
        zIndex: 3,
        filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.5))'
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundLayer} />
      
      <div style={styles.contentLayer}>
        {/* --- Главный экран --- */}
        {!showGirlModal && !showQuizModal && !showVideoPlayer && (
            <div style={styles.ornamentsContainer}>
                {['ornament1', 'ornament2', 'ornament3'].map((id) => {
                    const isEarned = earnedOrnaments.includes(id);
                    const itemStyle = isEarned
                        ? { ...styles.ornamentItem, ...styles.ornamentItemEarned }
                        : styles.ornamentItem;

                    return (
                        <SafeImage
                            key={id}
                            src={assets[id]}
                            alt={`Казахское украшение ${id}`}
                            style={itemStyle}
                            onMouseOver={(e) => !isEarned && (e.currentTarget.style.transform = 'scale(1.1)')}
                            onMouseOut={(e) => !isEarned && (e.currentTarget.style.transform = 'scale(1)')}
                            onClick={() => handleOrnamentClick(id)}
                        />
                    );
                })}
            </div>
        )}

        {/* --- Модальное окно Квиза --- */}
        {showQuizModal && currentOrnamentId && (
            <div style={styles.modalOverlay}>
            <div style={styles.quizBox}>
                <h2 style={{color: '#d4af37'}}>{quizData[currentOrnamentId].title}</h2>
                <p style={styles.questionText}>{quizData[currentOrnamentId].question}</p>
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    {quizData[currentOrnamentId].options.map((option, index) => (
                    <button
                        key={index}
                        style={styles.optionButton}
                        onClick={() => handleAnswerClick(option)}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ffeba0'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fffbe6'}
                    >
                        {option}
                    </button>
                    ))}
                </div>
                <button
                    style={{marginTop: '20px', padding: '10px', border: 'none', background: 'transparent', color: '#888', cursor:'pointer'}}
                    onClick={() => setShowQuizModal(false)}
                >
                    Отмена
                </button>
            </div>
            </div>
        )}

        {/* --- ВИДЕО ПЛЕЕР (Новое!) --- */}
        {showVideoPlayer && currentOrnamentId && (
             <div style={styles.modalOverlay}>
                <div style={styles.videoBox}>
                    <video 
                        ref={videoRef}
                        src={quizData[currentOrnamentId].videoSrc}
                        style={{width: '100%', maxHeight: '80vh'}}
                        controls
                        autoPlay // Пытаемся запустить автоматически
                        onEnded={handleVideoEnd} // Когда видео кончится, вызовется функция
                    >
                        Ваш браузер не поддерживает видео.
                    </video>
                    <button style={styles.skipButton} onClick={handleVideoEnd}>
                        Пропустить видео
                    </button>
                </div>
             </div>
        )}

        {/* --- Экран с Девушкой --- */}
        {showGirlModal && (
            <div style={styles.modalOverlay}>
            <div style={styles.girlContainer}>
                <button style={styles.closeButton} onClick={closeGirlModal}>
                    {earnedOrnaments.length === 3 ? "Отличная работа!" : "Продолжить собирать"}
                </button>

                <SafeImage 
                    src={assets.girl} 
                    style={styles.girlBaseImage} 
                    alt="Девушка" 
                />

                {earnedOrnaments.includes('ornament1') && (
                    <SafeImage src={assets.ornament1} style={styles.wornOrnament1} alt="Браслет" />
                )}
                {earnedOrnaments.includes('ornament2') && (
                    <SafeImage src={assets.ornament2} style={styles.wornOrnament2} alt="Нагрудное" />
                )}
                {earnedOrnaments.includes('ornament3') && (
                    <SafeImage src={assets.ornament3} style={styles.wornOrnament3} alt="Серьги" />
                )}
            </div>
            </div>
        )}
      </div>
    </div>
  );
}

export default App;