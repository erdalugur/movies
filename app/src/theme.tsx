
import { DarkTheme } from '@react-navigation/native';

import { Theme } from '@react-navigation/native/lib/typescript/src/types';

const theme: Theme = {
    dark: true,
    colors: {
        primary: '#546ee5',
        background: '#161937',
        border: '#454a6b',
        card: '#21203f',
        text: DarkTheme.colors.text,
    }
};

export default theme