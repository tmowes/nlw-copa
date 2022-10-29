/* eslint-disable sonarjs/no-duplicate-string */
import { extendTheme } from 'native-base'

export const theme = extendTheme({
  colors: {
    $green: {
      500: '#047C3F',
    },
    $gray: {
      950: '#09090A',
      700: '#121214',
      600: '#202024',
      500: '#29292E',
      400: '#323238',
      300: '#7C7C8A',
      200: '#C4C4CC',
      100: '#E1E1E6',
    },
    $yellow: {
      500: '#F7DD43',
    },
    $white: '#FFFFFF',
    $red: {
      500: '#DB4437',
    },
  },
  fonts: {
    heading: 'Roboto_700Bold',
    body: 'Roboto_400Regular',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  sizes: {
    5.5: 22,
    14: 56,
    33: 148,
  },
  components: {
    Divider: {
      defaultProps: {
        my: 4,
        bg: '$gray.500',
        h: 'px',
      },
    },
    Button: {
      baseStyle: () => ({
        mb: 4,
        h: 14,
        w: 'full',
        variant: '$solid',
        _text: {
          color: '$white',
          fontFamily: 'heading',
          fontSize: 'sm',
          textTransform: 'uppercase',
        },
      }),
      defaultProps: () => ({
        variant: '$solid',
      }),
      variants: {
        $solid: (props: any) => ({
          rounded: 'sm',
          bg: '$yellow.500',
          _pressed: {
            opacity: 0.7,
          },
          _text: {
            color: '$gray.950',
            fontFamily: 'heading',
            fontSize: 'sm',
          },
          ...props,
        }),
        $outline: (props: any) => ({
          rounded: 'sm',
          bg: 'transparent',
          borderWidth: 1,
          borderColor: '$green.700',
          _pressed: {
            borderWidth: 1,
            borderColor: '$green.500',
            bg: '$gray.500',
          },
          _text: {
            color: '$green.500',
          },
          ...props,
        }),
        $link: (props: any) => ({
          p: 0,
          m: 0,
          h: 5.5,
          _text: {
            color: '$yellow.500',
            fontSize: 'sm',
            mt: 1,
            textTransform: 'none',
            textDecorationLine: 'underline',
            lineHeight: 22,
            borderBottomWidth: 1,
            borderBottomColor: '$yellow.500',
            fontWeight: 'normal',
            fontFamily: 'body',
          },
          _pressed: {
            opacity: 0.7,
          },
          ...props,
        }),
      },
    },
    Link: {
      defaultProps: {
        _text: {
          color: '$yellow.500',
          fontWeight: 'bold',
          fontSize: 'md',
          borderBottomWidth: 1,
          borderBottomColor: 'transparent',
        },
      },
    },
    Input: {
      baseStyle: {},
      defaultProps: {
        placeholderTextColor: '$gray.300',
        bg: '$gray.600',
        h: 14,
        px: 4,
        borderWidth: 1,
        borderColor: '$gray.400',
        fontFamily: 'body',
        color: 'white',
        fontSize: 'sm',
        w: 'full',
        _focus: {
          borderColor: 'transparent',
          borderBottomColor: '$yellow.500',
          bg: '$gray.600',
          borderWidth: 1,
        },
        _invalid: {
          borderColor: '$red.500',
          bg: '$gray.700',
          borderWidth: 1,
        },
      },
    },
    Avatar: {
      defaultProps: {
        borderWidth: 2,
        borderColor: '$gray.400',
      },
    },
    TextArea: {
      baseStyle: {},
      defaultProps: {
        placeholderTextColor: 'gray.400',
        bg: '_gray_950',
        borderColor: '_gray_950',
        w: 'full',
        _focus: {
          borderColor: 'orange.500',
          bg: '_gray_950',
        },
        _invalid: {
          borderColor: 'error.500',
          bg: '_gray_950',
        },
      },
    },
    IconButton: {
      defaultProps: {
        colorScheme: 'gray',
        bg: 'transparent',
        borderRadius: 'full',
      },
    },
    Heading: {
      defaultProps: {
        fontWeight: 'bold',
        fontFamily: 'heading',
      },
    },
    Text: {
      defaultProps: {
        fontWeight: 'normal',
        fontFamily: 'body',
      },
    },
    ScrollView: {
      defaultProps: {
        contentContainerStyle: {
          flexGrow: 1,
          paddingBottom: 32,
        },
        showsVerticalScrollIndicator: false,
      },
    },
    FlatList: {
      defaultProps: {
        showsVerticalScrollIndicator: false,
      },
      variants: {
        horizontal: {
          horizontal: true,
          showsHorizontalScrollIndicator: false,
          my: '8',
          _contentContainerStyle: {
            px: '8',
          },
        },
        vertical: {
          showsVerticalScrollIndicator: false,
          _contentContainerStyle: {
            pb: '12',
          },
        },
      },
    },
    SectionList: {
      defaultProps: {
        contentContainerStyle: {
          flexGrow: 1,
          paddingBottom: 32,
        },
        showsVerticalScrollIndicator: false,
      },
    },
  },
  config: {
    initialColorMode: 'dark',
  },
})

type CustomThemeType = typeof theme

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
