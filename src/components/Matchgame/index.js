import {Component} from 'react'
import './index.css'

class Matchgame extends Component {
  constructor(props) {
    super(props)
    const {initialState} = props
    this.state = initialState
  }

  changeShowImgFun = id => {
    const {imagesList} = this.props
    const {matchId} = this.state
    const newMatchItem =
      imagesList[Math.floor(Math.random() * imagesList.length)]
    if (matchId === id) {
      this.setState(prev => ({
        score: prev.score + 1,
        matchUrl: newMatchItem.imageUrl,
        matchId: newMatchItem.id,
      }))
    } else {
      this.stopCounter()
      this.setState({gameMode: false})
    }
  }

  ShowImageList = props => {
    const {details} = props
    const changeShowImg = () => {
      this.changeShowImgFun(details.id)
    }
    return (
      <li>
        <button onClick={changeShowImg} className="border-0 bg-transparent">
          <img
            alt="thumbnail"
            className="listItem"
            src={details.thumbnailUrl}
          />
        </button>
      </li>
    )
  }

  changeTabFun = tabId => {
    console.log('clicked')
    this.setState({activeTab: tabId})
  }

  ShowTabs = props => {
    const {details, activeTab} = props
    const changeTab = () => {
      this.changeTabFun(details.tabId)
    }
    return (
      <li className="mr-3">
        <button
          onClick={changeTab}
          className=" bg-transparent font-weight-bold tabButton"
        >
          {details.displayText}
        </button>
        {activeTab === details.tabId ? <hr className="bg-light" /> : ''}
      </li>
    )
  }

  navbarItem = () => {
    const {score, time} = this.state
    return (
      <ul className="ulList navbar navbarContainer d-flex align-items-center p-3">
        <li>
          <img
            className="logoImg"
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
          />
        </li>

        <li className="score-details d-flex pt-3">
          <div>
            <p>
              Score: <span className="text-warning">{score}</span>
            </p>
          </div>
          <div className="d-flex">
            <img
              className="timerIcon mr-1"
              src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
              alt="timer"
            />
            <p className="text-warning">{time} sec</p>
          </div>
        </li>
      </ul>
    )
  }

  gameMode = () => {
    const {tabsList, imagesList} = this.props
    const {activeTab, matchUrl} = this.state
    const showList = imagesList.filter(
      eachItem => eachItem.category === activeTab,
    )
    return (
      <div className="p-4 text-center">
        <img alt="match" className="showImage mb-3" src={matchUrl} />
        <ul className="ulList d-flex justify-content-center flex-wrap">
          {tabsList.map(eachItem => (
            <this.ShowTabs
              key={eachItem.tabId}
              details={eachItem}
              activeTab={activeTab}
            />
          ))}
        </ul>
        <ul className="ulList d-flex flex-wrap justify-content-center">
          {showList.map(eachItem => (
            <this.ShowImageList details={eachItem} key={eachItem.key} />
          ))}
        </ul>
      </div>
    )
  }

  restartGameFun = () => {
    const {initialState} = this.props
    this.setState(initialState)
    this.startCounter()
  }

  gameOverMode = () => {
    this.stopCounter()
    const {score} = this.state
    const restartGame = () => {
      this.restartGameFun()
    }
    return (
      <div className="d-flex flex-column align-items-center p-4">
        <div className="gameOverMode d-flex flex-column justify-content-center align-items-center ">
          <img
            className="trophyImg"
            alt="trophy"
            src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
          />
          <p>Your Score</p>
          <h1>{score}</h1>
          <button onClick={restartGame} className="btn-lg btn-danger">
            <img
              className="mr-2"
              alt="reset"
              src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
            />
            PLAY AGAIN
          </button>
        </div>
      </div>
    )
  }

  componentDidMount = () => {
    this.startCounter()
  }

  startCounter = () => {
    this.timeId = setInterval(this.updateTime, 1000)
  }

  updateTime = () => {
    const {time} = this.state
    if (time > 1) {
      this.setState(prev => ({time: prev.time - 1}))
    } else {
      this.stopCounter()
      this.setState(prev => ({time: prev.time - 1, gameMode: false}))
    }
  }

  stopCounter = () => {
    clearInterval(this.timeId)
  }

  render() {
    const {gameMode} = this.state

    return (
      <div className="bgContainer">
        {this.navbarItem()}
        {gameMode ? this.gameMode() : this.gameOverMode()}
      </div>
    )
  }
}

export default Matchgame
