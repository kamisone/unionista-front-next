import localFont from 'next/font/local';

export const Roboto = localFont({
    src: [
        {
            path: './Roboto/Roboto-Regular.ttf',
            weight: '500',
        },
        {
            path: './Roboto/Roboto-Bold.ttf',
            weight: '900',
        },
        {
            path: './Roboto/Roboto-Italic.ttf',
            style: 'italic',
        },
    ],
});

export const Montserrat = localFont({
    src: [
        {
            path: './Montserrat/Montserrat-VariableFont_wght.ttf',
        },
        {
            path: './Montserrat/Montserrat-Italic-VariableFont_wght.ttf',
            style: 'italic',
        },
    ],
});

export const Graphik = localFont({
    src: [
        {
            path: './GraphikFont/GraphikBlack.otf',
        },
        {
            path: './GraphikFont/GraphikLight.otf',
            weight: '300',
        },
        {
            path: './GraphikFont/GraphikRegular.otf',
            weight: '350',
        },
        {
            path: './GraphikFont/GraphikMedium.otf',
            weight: '400',
        },
        {
            path: './GraphikFont/GraphikBold.otf',
            weight: '500',
        },
    ],
});
