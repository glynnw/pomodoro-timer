import {connect} from 'react-redux'
import Settings from '../components/Settings'
import actions from '../actions/Actions'

/* Container Component: BreakDurationSetting */
const mapStateToSettings = ({breakLength, pomoLength}) =>
  ({
    breakLength,
    pomoLength,
  })

const mapDispatchToSettings = (dispatch) =>
  ({
    handleBreakLength(e) {
      dispatch(actions.changeBreakLength(e.target.value))
    },
    handlePomoLength(e) {
      dispatch(actions.changePomoLength(e.target.value))
    },
  })

export default connect(mapStateToSettings,
              mapDispatchToSettings)(Settings)
