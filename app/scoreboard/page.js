"use client"
import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Import Chart.js
import { FaChevronLeft } from "react-icons/fa";
import { getScoreboard, getUser } from "../_utils/utils"; // Import the getScoreboard function
import { useRouter } from "next/navigation";

const ScoreboardPage = () => {
  const navigate = useRouter();
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [progressionMessage, setProgressionMessage] = useState("");

  const [selectedCourse, setSelectedCourse] = useState("csc280");

  useEffect(() => {
    if (chartInstance) {
      // Destroy the existing chart instance before rendering a new one
      chartInstance.destroy();
    }

    // Retrieve scoreboard data from localStorage
    const scoreboardData = getScoreboard()?.filter(
      (data) => data.course === selectedCourse
    );

    // Filter scoreboard data based on selected course
    const filteredScoreboardData = scoreboardData.filter(
      (entry) => entry.course === selectedCourse
    );

    // Extract time and score values from filtered scoreboard data
    const times = filteredScoreboardData.map((entry) => entry.time);
    const scores = filteredScoreboardData.map((entry) => entry.score);

    // Determine score progression message
    let message = "";
    if (scores.length === 0) {
      message =
        "No scores available for analysis. Keep practicing to generate data!";
    } else if (scores.length === 1) {
      message =
        "🎯 Your current score is " +
        scores[0] +
        ". Keep practicing to improve!";
    } else {
      const countIncreasingScores = scores.reduce((count, score, index) => {
        if (index > 0 && score > scores[index - 1]) {
          return count + 1;
        }
        return count;
      }, 0);

      if (countIncreasingScores === scores.length) {
        message =
          "🚀 Congratulations! All your scores are consistently improving. Keep up the great work! 🎉";
      } else {
        message =
          "📉 Some of your scores are not showing improvement. Keep practicing to see better results! 💪";
      }
    }

    setProgressionMessage(message);

    // Create a new chart instance
    const newChartInstance = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: times, // Use the extracted times as labels
        datasets: [
          {
            label: "Score Progression",
            data: scores, // Use the extracted scores as data points
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.6,
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              title: (tooltipItems) => {
                // Custom title text
                return "Score";
              },
              label: (context) => {
                // Custom label text for each tooltip item
                return `${context.parsed.y}`;
              },
            },
          },
        },
      },
    });

    // Save the new chart instance
    setChartInstance(newChartInstance);

    // Cleanup function
    return () => {
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, [selectedCourse]);

  const handleChange = (event) => {
    const data = event.target.value;
    setSelectedCourse(data);
  };

  return (
    <div className="sm:max-w-lg shadow-lg h-screen sm:mx-auto">
      <div className="flex items-center justify-between mb-10 py-7 gap-3 shadow-sm w-full px-3">
        <FaChevronLeft
          className="text-2xl text-gray-800"
          onClick={() => navigate.push("/")}
        />
        <h2 className="text-2xl font-bold flex items-center gap-x-1">
          <span className="text-xl hidden sm:flex">🏆</span> Scoreboard
        </h2>

        <select
          id="language"
          className="border-2 border-gray-600 rounded-xl py-1"
          value={selectedCourse}
          onChange={handleChange}
        >
          <option value="csc280">👨‍💻 Fortran</option>

          {getUser()
            ?.department.toLowerCase()
            .trim()
            .startsWith("computer") && (
            <option value="csc288">🦾 Pascal</option>
          )}
        </select>
      </div>

      <div>
        <canvas ref={chartRef} />
        <ScoreProgressionMessage statement={progressionMessage} />
      </div>
    </div>
  );
};

export default ScoreboardPage;

const ScoreProgressionMessage = ({ statement }) => {
  return (
    <>
      <div className="text-left px-2 text-md mt-7">{statement}</div>
    </>
  );
};
