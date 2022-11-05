import { Share } from 'react-native'

import { IconButton, useTheme } from 'native-base'
import { Export } from 'phosphor-react-native'

export function CustomShareButton({ message = '' }) {
  const { colors } = useTheme()
  const onShare = async () => {
    await Share.share({ message })
  }

  return (
    <IconButton icon={<Export size={24} color={colors.$gray['300']} />} onPress={onShare} />
  )
}
