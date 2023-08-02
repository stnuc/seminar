import { type ReactNode } from 'react'
import '../../style/explain/ExplainPage.sass'
import { TopTopicPage } from './TopTopicPage'

export const ExplainPage = (): ReactNode => {
  return (
    <div className="explain__section">
      <div className="paragraph__section">
        <Paragraph
          textSide={TEXTSIDE.left}
          textData={{
            subTitle: 'How we start?',
            title: 'Motivation',
            content: `To start from scratch is very hard
So we thought about helping these things
Open a seminar to share knowledge and think about it together
Members interested in or majoring in the field may open seminars
The topic of the seminar is unlimited to specific areas`,
            closingRemarks: 'Since 2023.6.3',
          }}
          imgSrc={`https://raw.githubusercontent.com/stnuc/seminar/main/public/imgs/motivation.png`}
        ></Paragraph>
        <Paragraph
          textSide={TEXTSIDE.right}
          textData={{
            subTitle: 'We want to share our things',
            title: `Public-opened
Seminar`,
            content: `Some seminars are opened in public
With topics that more people can relate to, communicate with more peoples`,
            closingRemarks: 'Thanks to contributors!',
          }}
          imgSrc={`https://raw.githubusercontent.com/stnuc/seminar/main/public/imgs/publicopen.png`}
        ></Paragraph>
        <DataGraph
          textSide={TEXTSIDE.left}
          textData={{
            subTitle: 'We are now',
            title: `Seminar status`,
            content: `We thinking about making a better meeting
Create and manage seminars to have good on many people`,
            closingRemarks: '',
          }}
          graphData={{
            sub1: 'Seminars opened',
            data1: 7,
            sub2: 'Members contributed',
            data2: 3,
            sub3: 'Public-opened Seminars',
            data3: 1,
          }}
          imgSrc={`https://raw.githubusercontent.com/stnuc/seminar/main/public/imgs/status.png`}
        ></DataGraph>
      </div>
      <TopTopicPage></TopTopicPage>
    </div>
  )
}

interface TextData {
  subTitle: string
  title: string
  content: string
  closingRemarks: string
}

interface ParagraphProps {
  textSide: TextSide
  textData: TextData
  imgSrc: string
}

const TEXTSIDE = {
  left: 'left',
  right: 'right',
} as const

type TextSide = (typeof TEXTSIDE)[keyof typeof TEXTSIDE]

const Paragraph = (props: ParagraphProps): ReactNode => {
  const textSide = (
    <div className="text-side">
      <div className="subtitle">{props.textData.subTitle}</div>
      <div className="title">{props.textData.title}</div>
      <div className="content">{props.textData.content}</div>
      <div className="closing-remarks">{props.textData.closingRemarks}</div>
    </div>
  )
  const imageSide = (
    <div className="image-side">
      <img src={props.imgSrc} alt="" />
    </div>
  )
  return (
    <div className={`paragraph textside-${props.textSide}`}>
      <div className="left-side">
        {props.textSide === TEXTSIDE.left ? textSide : imageSide}
      </div>
      <div className="right-side">
        {props.textSide === TEXTSIDE.left ? imageSide : textSide}
      </div>
    </div>
  )
}

interface DataGraphData {
  sub1: string
  data1: number
  sub2: string
  data2: number
  sub3: string
  data3: number
}

interface DataGraphProps {
  textSide: TextSide
  textData: TextData
  graphData: DataGraphData
  imgSrc: string
}

const DataGraph = (props: DataGraphProps): ReactNode => {
  const textSide = (
    <div className="text-side">
      <div className="subtitle">{props.textData.subTitle}</div>
      <div className="title">{props.textData.title}</div>
      <div className="content">{props.textData.content}</div>
      <div className="status__container">
        <div className="status">
          <div className="data">{props.graphData.data1}</div>
          <div className="sub">{props.graphData.sub1}</div>
        </div>
        <div className="status">
          <div className="data">{props.graphData.data2}</div>
          <div className="sub">{props.graphData.sub2}</div>
        </div>
        <div className="status">
          <div className="data">{props.graphData.data3}</div>
          <div className="sub">{props.graphData.sub3}</div>
        </div>
      </div>
    </div>
  )
  const imageSide = (
    <div className="image-side">
      <img src={props.imgSrc} alt="" />
    </div>
  )
  return (
    <div className={`paragraph paragraph-last textside-${props.textSide}`}>
      <div className="left-side">
        {props.textSide === TEXTSIDE.left ? textSide : imageSide}
      </div>
      <div className="right-side">
        {props.textSide === TEXTSIDE.left ? imageSide : textSide}
      </div>
    </div>
  )
}
