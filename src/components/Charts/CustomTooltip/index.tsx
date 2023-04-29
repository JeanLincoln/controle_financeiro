import { TooltipProps } from 'recharts'
import { formatMonetary } from '../../../utils/FormatMonetaryValues'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'

export const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].name} : ${formatMonetary(payload[0].value)}`}</p>
      </div>
    )
  }

  return null
}
