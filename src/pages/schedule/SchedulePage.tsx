import { useState, type ReactNode, useEffect } from 'react'
import Select from 'react-select'
import {
  GlobalOutlined,
  LockOutlined,
  LeftOutlined,
  RightOutlined,
  LinkOutlined,
  BranchesOutlined,
} from '@ant-design/icons'

import '../../style/schedule/SchedulePage.sass'
import 'react-calendar/dist/Calendar.css'

export const SchedulePage = (): ReactNode => {
  return (
    <div className="schedule__section">
      <div className="title">Checkout Schedule</div>
      <div className="scheduler">
        <Scheduler></Scheduler>
      </div>
    </div>
  )
}

const Scheduler = (): ReactNode => {
  const seminarOnChange = (info: SeminarItem | null): void => {
    setSeminarState(info)
  }
  const [seminarState, setSeminarState] = useState<SeminarItem | null>(null)

  return (
    <div className="scheduler__container">
      <SessionController seminarOnChange={seminarOnChange}></SessionController>
      <SeminarComponent data={seminarState}></SeminarComponent>
    </div>
  )
}

enum FetchState {
  WAIT,
  OK,
  FAIL,
}

interface SessionInfo {
  name: string
  code: string
  datalink: string
  link: string
}

interface SeminarInfo {
  start: string
  end: string
  name: string
  description: string
  items: SeminarItem[]
}

interface SeminarItem {
  type: number
  link: string
  name: string
  organizers: Organizer[]
  date: string[]
  description: string
  keyword: string[]
}

interface Organizer {
  name: string
  link: string
}

interface SessionControllerProps {
  seminarOnChange: (info: SeminarItem | null) => void
}

const QuaterFetchURL =
  'https://raw.githubusercontent.com/stnuc/seminar/data/data/seminar.json'

const SessionController = (props: SessionControllerProps): ReactNode => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sessionFetchState, setSessionFetchState] = useState(FetchState.WAIT)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [seminarFetchState, setSeminarFetchState] = useState(FetchState.WAIT)
  const [sessionOptions, setSessionOptions] = useState<SessionInfo[]>([])

  const [cachedSeminarData, setCachedSeminarData] = useState<
    Map<string, SeminarInfo>
  >(new Map())
  const [seminarData, setSeminarData] = useState<SeminarInfo | null>()

  const [sessionValue, setSessionValue] = useState<SessionInfo | null>()
  const [seminarValue, setSeminarValue] = useState<SeminarItem | null>()

  useEffect(() => {
    fetch(QuaterFetchURL)
      .then(async (resp) => {
        return await resp.json()
      })
      .then((resp) => {
        const options: SessionInfo[] = []

        resp.items.forEach((el: { name: string; datalink: string }) => {
          options.push({
            name: el.name,
            datalink: el.datalink,
            code: el.name,
            link: el.name,
          })
        })

        setSessionOptions(options)
        setSessionFetchState(FetchState.OK)
      })
      .catch(() => {
        setSessionFetchState(FetchState.FAIL)
      })
  }, [])

  const fetchSeminar = (code: string): void => {
    setSeminarFetchState(FetchState.WAIT)
    fetch(
      `https://raw.githubusercontent.com/stnuc/seminar/data/data/seminars/${code}.json`
    )
      .then(async (resp) => {
        return await resp.json()
      })
      .then((resp) => {
        const options: SeminarInfo = {
          start: resp.start,
          end: resp.end,
          name: resp.name,
          description: resp.description,
          items: [],
        }

        const items: SeminarItem[] = []

        resp.items.forEach(
          (el: {
            type: number
            link: string
            name: string
            date: string[]
            organizers: Organizer[]
            description: string
            keyword: string[]
          }) => {
            const organizers: Organizer[] = []
            el.organizers.forEach((o: { name: string; link: string }) => {
              organizers.push({ name: o.name, link: o.link })
            })
            items.push({
              type: el.type,
              link: el.link,
              name: el.name,
              organizers,
              date: el.date,
              description: el.description,
              keyword: el.keyword,
            })
          }
        )
        options.items = items

        setSeminarData(options)
        setCachedSeminarData((prev) => new Map([...prev, [code, options]]))
        setSeminarFetchState(FetchState.OK)
      })
      .catch(() => {
        setSeminarFetchState(FetchState.FAIL)
      })
  }

  return (
    <div className="schedule-controller">
      <Select
        className="schedule-dropdown dropdown-session"
        classNamePrefix="schedule-dropdown"
        classNames={{
          control: (state) =>
            state.isFocused ? 'schedule-dropdown-focus' : '',
        }}
        placeholder="Select Session"
        value={sessionValue}
        onChange={(option: SessionInfo | null): void => {
          setSessionValue(option)
          if (option == null) {
            return
          }
          if (option?.code in cachedSeminarData) {
            setSeminarData(cachedSeminarData.get(option.code))
            return
          }
          fetchSeminar(option.code)
        }}
        getOptionLabel={(sessionInfo: SessionInfo) => sessionInfo.name}
        getOptionValue={(sessionInfo: SessionInfo) => sessionInfo.name}
        options={sessionOptions}
        isSearchable={false}
      ></Select>
      <Select
        className="schedule-dropdown dropdown-seminar"
        classNamePrefix="schedule-dropdown"
        placeholder="Select Seminar"
        value={seminarValue}
        onChange={(option: SeminarItem | null): void => {
          setSeminarValue(option)
          props.seminarOnChange(option)
        }}
        getOptionLabel={(seminarItem: SeminarItem) => seminarItem.name}
        getOptionValue={(seminarItem: SeminarItem) => seminarItem.name}
        options={seminarData?.items}
        isSearchable={false}
      ></Select>
    </div>
  )
}

interface SeminarComponentProps {
  data: SeminarItem | null
}

const SeminarComponent = (props: SeminarComponentProps): ReactNode => {
  if (props.data == null) {
    return (
      <div
        className="scheduler-seminar__container"
        style={{ overflow: 'hidden' }}
      >
        <div className="guide">
          <BranchesOutlined />
          <div className="text">Select seminar and see detail information</div>
        </div>
      </div>
    )
  }
  return (
    <div className="scheduler-seminar__container">
      <div className="seminar__main">
        <div className="title">{props.data?.name}</div>
        <div className="detail">{props.data?.description}</div>
      </div>
      <div className="seminar__side">
        <div className="seminar__type">
          {props.data?.type === 0 ? (
            <div>
              <LockOutlined />
              &nbsp;private
            </div>
          ) : (
            <div>
              <GlobalOutlined />
              &nbsp;public
            </div>
          )}
        </div>
        <CalendarComponent date={props.data?.date ?? []}></CalendarComponent>
        <OutLinkComponent link={props.data.link}></OutLinkComponent>
        <OrganizerComponent
          organizers={props.data?.organizers ?? []}
        ></OrganizerComponent>
        <div className="seminar__organizer"></div>
      </div>
    </div>
  )
}

interface CalendarProps {
  date: string[]
}

interface ShownPage {
  year: number
  month: number
}

const CalendarComponent = (props: CalendarProps): ReactNode => {
  if (props.date.length < 1) {
    return <div></div>
  }
  const date = props.date.map((v, i) => new Date(v))
  const minDate = new Date(date[0])
  const maxDate = new Date(date[props.date.length - 1])
  const [pageState, setPageState] = useState<ShownPage>({
    year: minDate.getFullYear(),
    month: minDate.getMonth(),
  })
  useEffect(() => {
    setPageState({
      year: minDate.getFullYear(),
      month: minDate.getMonth(),
    })
  }, [props])

  const prevMonth = (): void => {
    let y = pageState.year
    let m = pageState.month
    m -= 1
    if (m < 0) {
      m = 11
      y -= 1
    }
    setPageState({ year: y, month: m })
  }

  const nextMonth = (): void => {
    let y = pageState.year
    let m = pageState.month
    m += 1
    if (m >= 12) {
      m = 0
      y += 1
    }
    setPageState({ year: y, month: m })
  }

  let rightButton: ReactNode = (
    <div className="calendar-button right-button"></div>
  )
  let leftButton: ReactNode = (
    <div className="calendar-button left-button"></div>
  )
  if (
    pageState.year > minDate.getFullYear() ||
    pageState.month > minDate.getMonth()
  ) {
    leftButton = (
      <div className="calendar-button left-button" onClick={prevMonth}>
        <LeftOutlined></LeftOutlined>
      </div>
    )
  }

  if (
    pageState.year < maxDate.getFullYear() ||
    pageState.month < maxDate.getMonth()
  ) {
    rightButton = (
      <div className="calendar-button right-button" onClick={nextMonth}>
        <RightOutlined></RightOutlined>
      </div>
    )
  }

  const weekItems: ReactNode[] = [
    // eslint-disable-next-line react/jsx-key
    <div className="week">
      <div className="top-day" style={{ color: '#ff4d4d' }}>
        SUN
      </div>
      <div className="top-day">MON</div>
      <div className="top-day">TUE</div>
      <div className="top-day">WEN</div>
      <div className="top-day">THU</div>
      <div className="top-day">FRI</div>
      <div className="top-day" style={{ color: '#4d5eff' }}>
        SAT
      </div>
    </div>,
  ]
  const startDate = new Date(`${pageState.year}-${pageState.month + 1}-1`)
  startDate.setDate(startDate.getDate() - startDate.getDay() - 1)
  for (;;) {
    const row: ReactNode[] = []
    for (let i = 0; i < 7; i++) {
      row.push(
        <div
          className={`day ${
            props.date.includes(
              `${startDate.getFullYear()}-${
                startDate.getMonth() + 1
              }-${startDate.getDate()}`
            )
              ? 'focused'
              : 'outfocused'
          } ${
            startDate.getMonth() === pageState.month
              ? 'origin-month'
              : 'diff-month'
          }`}
        >
          {`${startDate.getDate()}`}
        </div>
      )
      startDate.setDate(startDate.getDate() + 1)
    }
    weekItems.push(<div className="week">{row}</div>)
    if (startDate.getMonth() > pageState.month) {
      break
    }
  }

  return (
    <div className="calendar__container">
      <div className="calendar-control">
        {leftButton}
        <div className="title">{`${pageState.year}-${
          pageState.month + 1
        }`}</div>
        {rightButton}
      </div>
      <div className="calendar">{weekItems}</div>
    </div>
  )
}

interface OutLinkComponentProps {
  link: string
}

const OutLinkComponent = (props: OutLinkComponentProps): ReactNode => {
  if (props.link === '') {
    return <div></div>
  }
  return (
    <div className="outlink__container">
      <a href={props.link} target="_blank" rel="noreferrer">
        Link<LinkOutlined></LinkOutlined>
      </a>
    </div>
  )
}

interface OrganizerProps {
  organizers: Organizer[]
}

const OrganizerComponent = (props: OrganizerProps): ReactNode => {
  const organizers: ReactNode[] = []

  props.organizers.forEach((orgainzer) => {
    organizers.push(
      <div className="organizer-item">
        {orgainzer.link === '' ? (
          <div className="item">{orgainzer.name}</div>
        ) : (
          <a
            className="item"
            href={orgainzer.link}
            target="_blank"
            rel="noreferrer"
          >
            {orgainzer.name}
            <LinkOutlined />
          </a>
        )}
      </div>
    )
  })

  return (
    <div className="organizer__container">
      <div className="title">Contributor</div>
      <div className="organizer-list">{organizers}</div>
    </div>
  )
}
