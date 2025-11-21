import React, { useState } from "react";

// --- Импорт изображений ---
// В реальном проекте вы бы импортировали их: import bgImage from './image_c54f41.png';
// Для этого примера я использую прямые имена файлов, предполагая, что они в папке public или рядом.
const assets = {
  background: "image_c54f41.png",
  ornament1: "1.jpg", // Браслет (Блезік)
  ornament2: "2.jpg", // Подвеска/Ожерелье (Алқа)
  ornament3: "3.jpg", // Серьги (Сырға)
  girl: "Gemini_Generated_Image_ccszxqccszxqccsz.jpg",
};

// --- Данные квиза ---
const quizData = {
  ornament1: {
    id: "ornament1",
    title: "Украшение №1",
    question: "Как называется это украшение и где его традиционно носят?",
    options: [
      "Сырға, носят в ушах",
      "Блезік (браслет), носят на запястье",
      "Шолпы, вплетают в косы",
    ],
    correctAnswer: "Блезік (браслет), носят на запястье",
  },
  ornament2: {
    id: "ornament2",
    title: "Украшение №2",
    question:
      "Каково основное значение нагрудных украшений (Алқа, Тұмар) у казахов?",
    options: [
      "Они служили только для красоты",
      "Их носили только мужчины",
      "Они часто служили оберегами и защитой",
    ],
    correctAnswer: "Они часто служили оберегами и защитой",
  },
  ornament3: {
    id: "ornament3",
    title: "Украшение №3",
    question: "Что это за парное украшение?",
    options: ["Сырға (серьги)", "Жүзік (кольца)", "Білезік (парные браслеты)"],
    correctAnswer: "Сырға (серьги)",
  },
};

function App() {
  // --- Состояния приложения ---
  // Какое украшение сейчас выбрано для квиза
  const [currentOrnamentId, setCurrentOrnamentId] = useState(null);
  // Показывать ли модальное окно с вопросом
  const [showQuizModal, setShowQuizModal] = useState(false);
  // Показывать ли финальный экран с девушкой
  const [showGirlModal, setShowGirlModal] = useState(false);
  // Список ID украшений, которые пользователь уже "выиграл"
  const [earnedOrnaments, setEarnedOrnaments] = useState([]);

  // --- Обработчики событий ---

  // Клик по украшению на главном экране
  const handleOrnamentClick = (ornamentId) => {
    // Если украшение уже заработано, не открываем квиз заново
    if (earnedOrnaments.includes(ornamentId)) {
      alert("Вы уже получили это украшение!");
      return;
    }
    setCurrentOrnamentId(ornamentId);
    setShowQuizModal(true);
  };

  // Клик по ответу в квизе
  const handleAnswerClick = (selectedOption) => {
    const currentQuiz = quizData[currentOrnamentId];
    if (selectedOption === currentQuiz.correctAnswer) {
      // Ответ верный!
      // Добавляем украшение в список заработанных, если его там еще нет
      if (!earnedOrnaments.includes(currentOrnamentId)) {
        setEarnedOrnaments([...earnedOrnaments, currentOrnamentId]);
      }
      // Закрываем квиз, открываем девушку
      setShowQuizModal(false);
      setShowGirlModal(true);
    } else {
      // Ответ неверный
      alert("К сожалению, ответ неверный. Попробуйте еще раз!");
      setShowQuizModal(false);
    }
  };

  // Закрыть экран с девушкой и вернуться к выбору
  const closeGirlModal = () => {
    setShowGirlModal(false);
    setCurrentOrnamentId(null);
  };

  // --- Стили ---
  const styles = {
    container: {
      position: "relative",
      width: "100vw",
      height: "100vh",
      backgroundImage: `url(${assets.background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    ornamentsContainer: {
      display: "flex",
      gap: "50px",
      padding: "20px",
      backgroundColor: "rgba(0,0,0,0.4)", // Немного затемнить фон под украшениями
      borderRadius: "20px",
      backdropFilter: "blur(5px)",
    },
    ornamentItem: {
      width: "120px",
      height: "120px",
      objectFit: "cover",
      borderRadius: "10px",
      cursor: "pointer",
      border: "3px solid gold",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    ornamentItemEarned: {
      filter: "grayscale(80%)", // Визуально показать, что уже собрано
      opacity: 0.7,
      cursor: "default",
      borderColor: "#ccc",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.8)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 100,
    },
    quizBox: {
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "15px",
      maxWidth: "500px",
      textAlign: "center",
      boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
    },
    questionText: {
      fontSize: "1.2rem",
      marginBottom: "20px",
      color: "#333",
    },
    optionButton: {
      display: "block",
      width: "100%",
      padding: "12px 20px",
      margin: "10px 0",
      border: "2px solid #d4af37", // Золотистый цвет
      borderRadius: "8px",
      backgroundColor: "#fffbe6",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    girlContainer: {
      position: "relative",
      width: "auto",
      height: "90vh",
      backgroundColor: "#fff",
      borderRadius: "15px",
      overflow: "hidden",
      boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
      display: "flex",
      justifyContent: "center",
    },
    girlBaseImage: {
      height: "100%",
      width: "auto",
      objectFit: "contain",
    },
    closeButton: {
      position: "absolute",
      top: "20px",
      right: "20px",
      padding: "10px 20px",
      backgroundColor: "#d4af37",
      border: "none",
      borderRadius: "5px",
      color: "white",
      fontSize: "1rem",
      cursor: "pointer",
      zIndex: 10,
    },
    // --- Стили для позиционирования украшений на девушке ---
    // Эти значения нужно подкорректировать вручную для идеальной посадки
    wornOrnament1: {
      // Браслет
      position: "absolute",
      top: "58%",
      left: "35%",
      width: "10%",
      transform: "rotate(-20deg)",
      zIndex: 2,
      filter: "drop-shadow(2px 2px 2px rgba(0,0,0,0.5))",
    },
    wornOrnament2: {
      // Нагрудное/Шея
      position: "absolute",
      top: "28%",
      left: "46%",
      width: "15%",
      zIndex: 3,
      filter: "drop-shadow(2px 4px 4px rgba(0,0,0,0.5))",
    },
    wornOrnament3: {
      // Серьги
      position: "absolute",
      top: "18%",
      left: "42%",
      width: "16%",
      zIndex: 3,
      filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.5))",
    },
  };

  return (
    <div style={styles.container}>
      {/* --- Главный экран: Контейнер с тремя украшениями --- */}
      {!showGirlModal && !showQuizModal && (
        <div style={styles.ornamentsContainer}>
          {["ornament1", "ornament2", "ornament3"].map((id) => {
            const isEarned = earnedOrnaments.includes(id);
            // Комбинируем стили для обычного и заработанного состояния
            const itemStyle = isEarned
              ? { ...styles.ornamentItem, ...styles.ornamentItemEarned }
              : styles.ornamentItem;

            return (
              <img
                key={id}
                src={assets[id]}
                alt={`Казахское украшение ${id}`}
                style={itemStyle}
                // Добавляем эффект при наведении только если не заработано
                onMouseOver={(e) =>
                  !isEarned && (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseOut={(e) =>
                  !isEarned && (e.currentTarget.style.transform = "scale(1)")
                }
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
            <h2 style={{ color: "#d4af37" }}>
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
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* --- Экран с Девушкой (Результат) --- */}
      {showGirlModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.girlContainer}>
            <button style={styles.closeButton} onClick={closeGirlModal}>
              {earnedOrnaments.length === 3
                ? "Отличная работа!"
                : "Продолжить собирать"}
            </button>

            {/* Базовое изображение девушки */}
            <img
              src={assets.girl}
              style={styles.girlBaseImage}
              alt="Девушка в национальном костюме"
            />

            {/* Накладываем заработанные украшения поверх изображения девушки */}
            {earnedOrnaments.includes("ornament1") && (
              <img
                src={assets.ornament1}
                style={styles.wornOrnament1}
                alt="Браслет на руке"
              />
            )}
            {earnedOrnaments.includes("ornament2") && (
              <img
                src={assets.ornament2}
                style={styles.wornOrnament2}
                alt="Нагрудное украшение"
              />
            )}
            {earnedOrnaments.includes("ornament3") && (
              <img
                src={assets.ornament3}
                style={styles.wornOrnament3}
                alt="Серьги"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
