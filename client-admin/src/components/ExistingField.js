import * as React from 'react'
import PropTypes from 'prop-types'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel'
import { makeStyles } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'
const useStyles = makeStyles({
  root: {
    color: (props) => (props.exists ? green[400] : red[400]),
    display: 'flex'
  }
})

const ExistingField = ({ source, record = {}, field, ...rest }) => {
  const exists = !!record[field]
  const classes = useStyles({ exists })
  const Icon = exists ? CheckCircleIcon : CancelIcon
  return (
    <span className={classes.root}>
      <Icon /> {record[source]}
    </span>
  )
}

ExistingField.propTypes = {
  field: PropTypes.string,
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string.isRequired
}

export default ExistingField
