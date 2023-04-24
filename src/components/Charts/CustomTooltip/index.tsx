import { formatMonetary } from '../../../utils/FormatMonetaryValues'

export const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].name} : ${formatMonetary(payload[0].value)}`}</p>
      </div>
    )
  }

  return null
}
