import { useState, type ReactNode, useEffect } from 'react'
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons'
import '../../style/explain/TopTopic.sass'

export const TopTopicPage = (): ReactNode => {
  const [mediaSizeBig, setMediaSizeBig] = useState(
    window.matchMedia('(min-width: 1040px)').matches
  )
  const [number, setNumber] = useState(0)

  const onClickLeft = (): void => {
    if (number <= 0) return
    setNumber(number - 1)
    console.log(number)
  }

  const onClickRight = (): void => {
    if (number >= 2) return
    setNumber(number + 1)
  }

  useEffect(() => {
    window.matchMedia('(min-width: 1080px)').addEventListener('change', (e) => {
      setMediaSizeBig(e.matches)
      console.log(number)
    })
  })
  if (!mediaSizeBig) {
    return (
      <div className="top-topic__section">
        <div className="main-title">Top Topics</div>
        <div className="window__container">
          {number > 0 ? (
            <button className="left-button" onClick={onClickLeft}>
              <LeftCircleOutlined />
            </button>
          ) : null}
          {number < 2 ? (
            <button className="right-button" onClick={onClickRight}>
              <RightCircleOutlined />
            </button>
          ) : null}
          <div
            className="card__container"
            style={{ transform: `translateX(${-312 * (number - 1)}px)` }}
          >
            <TopicCard
              imgSrc={`https://raw.githubusercontent.com/stnuc/seminar/main/public/imgs/ai-topic.jpg`}
              title="AI"
              content={`Topics related with AI
- Machine learning
- Computer vision
- Reinforcement learning`}
            ></TopicCard>
            <TopicCard
              imgSrc={`https://raw.githubusercontent.com/stnuc/seminar/main/public/imgs/programming-topic.png`}
              title="Programming"
              content={`Talking about programming methodology & paradigm
- OOP
- Funtional`}
            ></TopicCard>
            <TopicCard
              imgSrc={`https://raw.githubusercontent.com/stnuc/seminar/main/public/imgs/math-topic.png`}
              title="Math"
              content={`Learning basic math
- Set theory
- Measure theory
- Linear algebra`}
            ></TopicCard>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="top-topic__section">
      <div className="main-title">Top Topics</div>
      <div className="card__container">
        <TopicCard
          imgSrc={`https://raw.githubusercontent.com/stnuc/seminar/main/public/imgs/ai-topic.jpg`}
          title="AI"
          content={`Topics related with AI
- Machine learning
- Computer vision
- Reinforcement learning`}
        ></TopicCard>
        <TopicCard
          imgSrc={`https://raw.githubusercontent.com/stnuc/seminar/main/public/imgs/programming-topic.jpg`}
          title="Programming"
          content={`Talking about programming methodology & paradigm
- OOP
- Funtional`}
        ></TopicCard>
        <TopicCard
          imgSrc={`https://raw.githubusercontent.com/stnuc/seminar/main/public/imgs/math-topic.png`}
          // imgSrc={process.env.PUBLIC_URL + `/imgs/math-topic.png`}
          title="Math"
          content={`Learning basic math
- Set theory
- Measure theory
- Linear algebra`}
        ></TopicCard>
      </div>
    </div>
  )
}

interface TopicCardProps {
  title: string
  content: string
  imgSrc: string
}

const TopicCard = (props: TopicCardProps): ReactNode => {
  return (
    <div className="topic-card">
      <div className="image__container">
        <img src={props.imgSrc} alt="" />
      </div>
      <div className="title">
        {props.title}
        <div className="bar"></div>
      </div>
      <div className="content">{props.content}</div>
    </div>
  )
}
