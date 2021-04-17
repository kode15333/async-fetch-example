import { getRequest } from '../utils/api.js'
import { getQnATemplate } from '../utils/template.js'
import { URL } from '../utils/constant.js'
import { selector, allSelector } from '../utils/util.js'
import Question from './Question.js'
import Comment from './Comment.js'
import ContentLoader from './ContentLoader.js'

export default function QnA () {
  const init = async () => {
    await render()
  }

  const render = async () => {
    const questionsWithComments = await ContentLoader()
    selector('.qna-wrap').innerHTML = getQnATemplate(questionsWithComments)
    addDomEvent()
  }

  const addDomEvent = () => {
    new Question(selector('.new-question-wrap'), render)
    new Comment(allSelector('.qna'), render)
  }


  init()
}
