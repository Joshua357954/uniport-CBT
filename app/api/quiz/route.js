import CSC280 from './csc280.json';

const quizData = { 'csc280': CSC280 };

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get('subject');
  const numberOfQuestions = parseInt(searchParams.get('numberOfQuestions'), 10);

  if (!quizData[subject]) {
    return new Response(JSON.stringify({ error: 'Subject not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  }

  const shuffledQuizData = shuffleArray(quizData[subject].questions);
  const selectedQuestions = shuffledQuizData.slice(0, numberOfQuestions);

  return new Response(JSON.stringify({ questions: selectedQuestions }), { headers: { 'Content-Type': 'application/json' } });
}

export async function POST(request) {
  const { subject, totalQuestions, answers: userAnswers } = await request.json();

  if (!quizData[subject]) {
    return new Response(JSON.stringify({ error: 'Subject not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  }

  const results = Object.keys(userAnswers).map((qid, index) => {
    const question = quizData[subject].questions.find(data => data.id == qid);

    if (!question) {
      return null;
    }

    return {
      question_no: index + 1,
      question: question.question,
      userAnswer: userAnswers[qid],
      correctAnswer: question.correct_answer,
      isCorrect: userAnswers[qid] == question.correct_answer,
    };
  }).filter(result => result !== null);

  const score = results.reduce((total, result) => total + (result.isCorrect ? 1 : 0), 0);

  return new Response(JSON.stringify({ results, score, answeredQuestions: Object.keys(userAnswers).length, totalQuestions }), { headers: { 'Content-Type': 'application/json' } });
}
