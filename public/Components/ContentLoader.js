import { getRequest } from '../utils/api.js'
import { URL } from '../utils/constant.js'

export default function ContentLoader () {
  const getContent = async () => {
    const [questions, answers] = await fetchingData()
    return parsingContent({ questions, answers })
  }

  const fetchingData = () => {
    const requests = getRequest(URL)
    return Promise.all(requests)
      .then(response => Promise.all(response.map((r, num) => r.json())))
      .then((result) => result)
  }

  const getAnswersMap = (answers) => {
    return answers.reduce((acc, answer) => {
      if (!acc[answer.questionId]) {
        acc[answer.questionId] = []
      }
      acc[answer.questionId].push(answer)
      return acc
    }, {})
  }

  const parsingContent = ({ answers, questions }) => {
    const answersMap = getAnswersMap(answers)
    return questions.map((question) => {
      if (answersMap[question.id]) {
        question.matchedComments = answersMap[question.id]
      }
      return question
    })
  }

  return getContent()
}
