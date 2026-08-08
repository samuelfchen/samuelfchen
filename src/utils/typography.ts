import Typography from 'typography';

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.5,
  headerFontFamily: ['Montserrat', 'sans-serif'],
  bodyFontFamily: ['Montserrat', 'sans-serif'],
  googleFonts: [
    {
      name: 'Montserrat',
      styles: ['300', '400', '700', '800'],
    },
  ],
});

export default typography;
