// Wrapper for Emojis. Keeps ESlint from complaining too.
// ~ For Major
const Emoji = ({ symbol }) => {
  return (
    <span
      className='emoji'
      role='img'
      aria-label='emoji'
    >
      { symbol }
    </span>
  )
}

export default Emoji