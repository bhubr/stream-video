import PropTypes from 'prop-types'

export const userPropTypes = PropTypes.shape({
  id: PropTypes.number,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  avatar: PropTypes.string
})
